import styled from "styled-components";
import Card from "../components/Card";
import { Loading } from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import { HomeType } from "../interfaces/Home.types";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;


interface HomeProps {
  type: HomeType;
}
const Home: React.FC<HomeProps> = ({type}) => {
  
  const { videosQuery } = useVideos(type);
  
  if (videosQuery.isFetching) return <Loading />;

  return (
    <Container>
      {videosQuery.data?.map((video) => (
        <Card type="normal" key={video._id} video={video} />
      ))}
    </Container>
  );
};
export default Home;
