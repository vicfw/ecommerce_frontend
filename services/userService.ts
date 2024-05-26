import { LoginFormBody, RegisterFormData } from "@/lib/formSchemas";
import axiosInstance from "./axios";
import { Response } from "./types/config";
import { LoginUserResponse, registerUserResponse } from "./types/userService";

export class UserService {
  private endpoint = "/users";
  private login = "/login";

  registerUser = (
    data: RegisterFormData
  ): Promise<Response<registerUserResponse>> => {
    return axiosInstance().post(this.endpoint, data);
  };

  loginUser = (data: LoginFormBody): Promise<Response<LoginUserResponse>> => {
    return axiosInstance().post(this.endpoint.concat(this.login), data);
  };
}
