export type registerUserResponse = {
  id: number;
  phoneNumber: string;
};

export type LoginUserResponse = {
  id: number;
  phoneNumber: string;
  token: string;
};

export type UpdateUserBody = {
  name: string;
  lastName: string;
};
