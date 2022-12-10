import { useQuery } from "@tanstack/react-query";
import { customAxiosWithToken } from "../api/customAxios";
import { CommentModel } from "../interfaces/Comment.types";

const getVideos = async (videoId: string): Promise<CommentModel[]> => {
  const { data } = await customAxiosWithToken.get<CommentModel[]>(`/comments/${videoId}`);
  return data;
};
export const useComments = (videoId: string) => {
  const commentsQuery = useQuery(["comments",videoId], () => getVideos(videoId));
  return {
    commentsQuery,
  };
};
