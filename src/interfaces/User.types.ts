export interface UserModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  img?: string;
  subscribers: number;
  subscribedUsers?: string[];
  createdAt: string;
  updatedAt: string;
}