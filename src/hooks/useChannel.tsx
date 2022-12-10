import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../api/customAxios";
import { sleep } from "../helpers/sleep";
import { UserModel } from "../interfaces/User.types";
import { VideoModel } from "../interfaces/Video.types";

const getChannel = async (userId: string): Promise<UserModel> => {
  await sleep(1);
  console.log(userId, "en el getchannel");
  // encuentra al usuario del video
  const { data } = await customAxios.get<UserModel>(`/users/find/${userId}`);
  return data;
};
export const useChannel = (userId: string) => {
  const channelUserQuery = useQuery(["channelUser"], () => getChannel(userId));
  return {
    channelUserQuery,
  };
};
