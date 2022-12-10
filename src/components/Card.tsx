import { Link } from "react-router-dom";
import styled from "styled-components";
import { VideoModel } from "../interfaces/Video.types";
import { format } from "timeago.js";
import { useChannel } from "../hooks/useChannel";
import { useEffect, useState } from "react";
import { UserModel } from "../interfaces/User.types";
import { customAxios } from "../api/customAxios";

interface CardProps {
  video?: VideoModel;
  type: "sm" | "normal";
}
const Container = styled.div<CardProps>`
  width: ${(p) => p.type !== "sm" && "360px"};
  margin-bottom: ${(p) => (p.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(p) => p.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img<CardProps>`
  width: ${(p) => (p.type === "sm" ? "75px" : "100%")};
  height: ${(p) => (p.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  object-fit: cover;
`;

const Details = styled.div<CardProps>`
  display: flex;
  margin-top: ${(p) => (p.type === "sm" ? "0px" : "16px")};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(p) => p.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Card: React.FC<CardProps> = ({ type, video }) => {
  const [channelUser, setChannelUser] = useState<UserModel>();

  useEffect(() => {
    const getChannel = async (video: VideoModel) => {
      const { data } = await customAxios.get<UserModel>(`/users/find/${video?.userId}`);
      setChannelUser(data);
    };
    getChannel(video!);
  }, [video]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channelUser?.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channelUser?.name}</ChannelName>
            <Info>
              {video?.views} views • {format(video?.createdAt!)} day ago
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};
export default Card;
