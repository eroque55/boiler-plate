export type TLoginUser = {
  id: number;
  documentId: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
};

export type TLoginResponse = {
  jwt: string;
  user: TLoginUser;
  refreshToken: string;
};

export type TUser = {
  id: number;
  documentId: string;
  name: string;
};
