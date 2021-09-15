type TUser = {
  name: string;
  email: string;
  createdAt: TTime;
  updatedAt?: TTime;
  bio?: string;
  photo?: TPhoto;
};
