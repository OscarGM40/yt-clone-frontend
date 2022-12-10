import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { customAxiosWithToken } from "../api/customAxios";
import { CommentModel } from "../interfaces/Comment.types";
import { UserModel } from "../interfaces/User.types";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

interface CommentProps {
  comment: CommentModel;
}
const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [channel, setChannel] = useState<UserModel>();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const channelUser = await customAxiosWithToken.get<UserModel>(
          `/users/find/${comment.userId}`,
        );
        setChannel(channelUser.data);
      } catch (error) {}
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};
export default Comment;
