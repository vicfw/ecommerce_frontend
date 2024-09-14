import { LoginFormBody, RegisterFormData } from "@/lib/formSchemas";
import axiosInstance from "./axios";
import { Response } from "./types/config";
import {
  LoginUserResponse,
  registerUserResponse,
  UpdateUserBody,
} from "./types/userService.types";
import { User } from "@/types/globalTypes";

export class UserService {
  private endpoint = "/users";
  private login = "/login";
  private me = "/me";

  registerUser(
    data: RegisterFormData
  ): Promise<Response<registerUserResponse>> {
    return axiosInstance().post(this.endpoint, data);
  }

  loginUser(data: LoginFormBody): Promise<Response<LoginUserResponse>> {
    return axiosInstance().post(this.endpoint.concat(this.login), data);
  }

  getMe(): Promise<Response<User>> {
    return axiosInstance().get(this.endpoint.concat(this.me));
  }

  updateUser(body: UpdateUserBody): Promise<Response<User>> {
    return axiosInstance().patch(this.endpoint, body);
  }
}
