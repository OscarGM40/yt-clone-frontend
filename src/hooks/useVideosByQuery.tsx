import { useQuery } from "@tanstack/react-query";
import { customAxiosWithToken } from "../api/customAxios";
import { VideoModel } from "../interfaces/Video.types";

const getVideosByQuery = async (query: string): Promise<VideoModel[]> => {
  const { data } = await customAxiosWithToken.get<VideoModel[]>(`/videos/search?q=${query}`);
  return data;
};
export const useVideosByQuery = (query: string) => {
  const videosByQuery = useQuery(["videos", query], () => getVideosByQuery(query));
  return {
    videosByQuery,
  };
};
