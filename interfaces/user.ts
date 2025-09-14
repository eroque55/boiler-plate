export type IUser = {
  id: number;
  name: string;
  email: string;
};

export type ILoginResponse = {
  jwt: string;
  user: IUser;
  refreshToken: string;
};
