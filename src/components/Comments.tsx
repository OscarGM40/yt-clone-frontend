import { useSelector } from "react-redux";
import styled from "styled-components";
import { useComments } from "../hooks/useComments";
import { RootState } from "../store/store";
import Comment from "./Comment";
import { Loading } from "./Loading";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

interface CommentsProps {
  videoId: string;
}
const Comments: React.FC<CommentsProps> = ({ videoId }) => {

  const { commentsQuery } = useComments(videoId);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // fijate que no puedo devolver un Element condicionalmente sin cubrir todos los casos posibles
  if (commentsQuery.isFetching) return <Loading></Loading>;
 
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        {/* TODO handle adding comment */}
        <Input placeholder="Add a comment..." />
      </NewComment>
      {commentsQuery.data?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};
export default Comments;
