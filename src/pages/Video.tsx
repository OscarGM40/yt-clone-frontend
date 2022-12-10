import { ThumbDown, ThumbUp } from "@mui/icons-material";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { customAxios, customAxiosWithToken } from "../api/customAxios";
import Comments from "../components/Comments";
import { Recommendations } from "../components/Recommendations";
import { UserModel } from "../interfaces/User.types";
import { VideoModel } from "../interfaces/Video.types";
import { RootState } from "../store/store";
import { subscriptions } from "../store/user/userSlice";
import { dislike, fetchVideoSuccess, like } from "../store/video/videoSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  /* interesante la height a max-content */
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const videoId = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentVideo } = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();

  const [channel, setChannel] = useState<UserModel>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await customAxios.get<VideoModel>(`/videos/find/${videoId}`);
        const channelResponse = await customAxios.get<UserModel>(
          `/users/find/${videoResponse.data.userId}`,
        );

        setChannel(channelResponse.data);
        dispatch(fetchVideoSuccess(videoResponse.data));
      } catch (error) {}
    };
    fetchData();
  }, [videoId]);

  const handleLike = async () => {
    await customAxiosWithToken.put(`/users/like/${currentVideo?._id}`);
    dispatch(like(currentUser!));
  };
  const handleDislike = async () => {
    await customAxiosWithToken.put(`/users/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser!));
  };

  const handleSubscription = async () => {
    currentUser?.subscribedUsers?.includes(channel?._id!)
      ? await customAxiosWithToken.put(`/users/unsub/${channel?._id}`)
      : await customAxiosWithToken.put(`/users/sub/${channel?._id}`);

    dispatch(subscriptions(channel!));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
          {/* <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt!)}
          </Info>
          <Buttons>
            <Button onClick={() => handleLike()}>
              {currentVideo?.likes.includes(currentUser?._id!) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              <span style={{ paddingLeft: 12 }}>{currentVideo?.likes?.length}</span>
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser?._id!) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>
            {currentUser?.subscribedUsers?.includes(channel?._id!) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id!} />
      </Content>
      {currentVideo?.tags && <Recommendations tags={currentVideo?.tags} />}
    </Container>
  );
};
export default Video;
