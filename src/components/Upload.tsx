import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { customAxiosWithToken } from "../api/customAxios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  /* w+h es descendente,h+t es ascendente luego width y height */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.div`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

interface UploadProps {
  setOpen: Function;
}
export const Upload: React.FC<UploadProps> = ({ setOpen }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState<File>();
  const [video, setVideo] = useState<File>();
  const [imgPerc, setImgPerc] = useState<number>(0);
  const [videoPerc, setVideoPerc] = useState<number>(0);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
  });
  const [tags, setTags] = useState<string[]>([]);

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file: File, urlType: "imgUrl" | "videoUrl") => {
    const storage = getStorage(app); //nos enlazamos al Storage de la app,que previamente hemos habilitado
    const fileName = new Date().getTime() + file.name; //damos un nombre único a cada file agregando un timestamp
    const storageRef = ref(storage, fileName); //creamos una referencia a ese Storage,con la que trabajaremos realmente
    const uploadTask = uploadBytesResumable(storageRef, file); //usamos este tipo de subida(por algun motivo en concreto??,solo hay esta??)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(urlType,'urlType')
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      },
    );
  };

  useEffect(() => {
    if (video) {
      uploadFile(video, "videoUrl");
    }
  }, [video]);

  useEffect(() => {
    if (img) {
      uploadFile(img, "imgUrl");
    }
  }, [img]);

  const handleUpload = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!video && !img) return;
    e.preventDefault();
    const res = await customAxiosWithToken.post(`/videos`, { ...inputs, tags });
    setOpen(false);
    // console.log(res.data);
    res.status === 201 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>

        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <Input type="file" accept="video/*" onChange={handleVideo} />
        )}

        <Input type="text" placeholder="Title of the video" name="title" onChange={handleChange} />
        <Description
          placeholder="Enter a description...."
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={(e) => setTags(e.target.value.split(","))}
        />

        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc + "%"
        ) : (
          <Input type="file" accept="image/*" onChange={handleImage} />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};
