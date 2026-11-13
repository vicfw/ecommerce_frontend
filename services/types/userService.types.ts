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

export type ChangePhoneRequestBody = {
  phoneNumber: string;
};

export type ChangePhoneVerifyBody = {
  phoneNumber: string;
  code: string;
};

export type ChangePhoneRequestResponse = {
  code?: string;
};
