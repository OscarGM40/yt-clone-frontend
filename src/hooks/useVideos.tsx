import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../api/customAxios";
import { sleep } from "../helpers/sleep";
import { HomeType } from "../interfaces/Home.types";
import { VideoModel } from "../interfaces/Video.types";

const getVideos = async (type: HomeType): Promise<VideoModel[]> => {
  await sleep(1);
  const { data } = await customAxios.get<VideoModel[]>(`/videos/get/${type}`);
  return data;
};
export const useVideos = (type: HomeType) => {
  const videosQuery = useQuery(["videos",type], () => getVideos(type));
  return {
    videosQuery,
  };
};
