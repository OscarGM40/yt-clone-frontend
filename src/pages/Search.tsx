import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { useVideosByQuery } from "../hooks/useVideosByQuery";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Search = () => {
  const query = useLocation().search.split("=")[1];
  
  const { videosByQuery } = useVideosByQuery(query);

  if (videosByQuery.isFetching) return <></>;

  return (
    <Container>
      {videosByQuery.data?.map((video) => (
        <Card key={video._id} video={video} type="normal" />
      ))}
    </Container>
  );
};
export default Search;
