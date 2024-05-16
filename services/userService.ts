import { RegisterFormData } from "@/lib/formSchemas";
import axiosInstance from "./axios";
import { registerUserResponse } from "./types/userService";
import { Response } from "./types/config";

export class UserService {
  private endpoint = "/users";

  registerUser = (
    data: RegisterFormData
  ): Promise<Response<registerUserResponse>> => {
    return axiosInstance().post(this.endpoint, data);
  };
}
