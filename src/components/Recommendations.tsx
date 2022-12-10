import styled from "styled-components";
import { useVideosByTag } from "../hooks/useVideosByTag";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

interface RecommendationsProps {
  tags: string[];
}
export const Recommendations: React.FC<RecommendationsProps> = ({ tags }) => {
  const { videosByTagQuery } = useVideosByTag(tags);

  if (videosByTagQuery.isFetching) return <></>;

  return (
    <Container>
      {videosByTagQuery.data?.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};
