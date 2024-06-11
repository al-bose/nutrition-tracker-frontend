import axios, { AxiosError } from "axios";
import { LoginRequest, SignUpRequest } from "../types/requests.type";
import { ErrorResponse, SuccessResponse } from "../types/responses.type";
import IUser from "../types/user.type";
import api from "./api.service";
import * as TokenService from "./token.service";

export const register: (request: SignUpRequest) => Promise<SuccessResponse | ErrorResponse> = async (request) => {
    try{
      await api.post("/auth/signup", request);
      return {} as SuccessResponse;
    } catch (error : unknown) {
      if (axios.isAxiosError(error))
        {
          const serverError = error as AxiosError<ErrorResponse>;
          if (serverError && serverError.response && serverError.response.data)
          {
            console.error(serverError.response.data);
            return serverError.response.data;
          }
        }
        console.error(error);
        return {message : "Unhandled exception has occured. Check console for more information."} as ErrorResponse; 
    } 
};

export const login: (request: LoginRequest) => Promise<SuccessResponse | ErrorResponse> = async (request) => {
  
  try{
    const response = await api.post("/auth/signin", request);
    if (response.data.token) {
      TokenService.setUser(response.data);
    }
    return {} as SuccessResponse;
  } catch (error : unknown) {
    if (axios.isAxiosError(error))
      {
        const serverError = error as AxiosError<ErrorResponse>;
        if (serverError && serverError.response && serverError.response.data)
        {
          console.error(serverError.response.data);
          return serverError.response.data;
        }
      }
      console.error(error);
      return {message : "Unhandled exception has occured. Check console for more information."} as ErrorResponse; 
  }
};
  
export const logout: () => SuccessResponse | ErrorResponse = () => {
  try{
    TokenService.removeUser();
    return {} as SuccessResponse;
  } catch (error: unknown){
    console.error(error);
    return {message : "Unhandled exception has occured. Check console for more information."} as ErrorResponse; 
  }
};
  
  export const getCurrentUser: () => IUser | undefined = () => {
    return TokenService.getUser();
  };