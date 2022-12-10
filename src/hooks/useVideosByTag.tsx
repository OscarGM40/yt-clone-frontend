import { useQuery } from "@tanstack/react-query";
import { customAxiosWithToken } from "../api/customAxios";
import { VideoModel } from "../interfaces/Video.types";

const getVideosByTag = async (tags: string[]): Promise<VideoModel[]> => {
  const { data } = await customAxiosWithToken.get<VideoModel[]>(`/videos/get/tags?tags=${tags}`);
  return data;
};
export const useVideosByTag = (tags: string[]) => {
  const videosByTagQuery = useQuery(["videos", tags], () => getVideosByTag(tags));
  return {
    videosByTagQuery,
  };
};
