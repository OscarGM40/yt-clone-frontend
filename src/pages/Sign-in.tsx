import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { customAxios } from "../api/customAxios";
import { loginFailure, loginStart, loginSuccess } from "../store/user/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await customAxios.post(`/auth/signin`, { name, password });
      if ((res.status = 200)) {
        dispatch(loginSuccess(res.data));
        navigate('/')
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  };
  
  const signInWithGoogle = () => {
    dispatch(loginStart());
    
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);

        customAxios
          .post(`/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            dispatch(loginFailure());
          });;
      })
      .catch((error) => {
        console.log(error);
         dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to JunkTube</SubTitle>
        <Input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setName(e.target.value)}
          // value={name}
        ></Input>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          // value={password}
        ></Input>
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        <Input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setName(e.target.value)}
          // value={name}
        ></Input>
        <Input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          // value={email}
        ></Input>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          // value={password}
        ></Input>
        <Button>Sign Up</Button>
        <More>
          English(USA)
          <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
          </Links>
        </More>
      </Wrapper>
    </Container>
  );
};
export default SignIn;
