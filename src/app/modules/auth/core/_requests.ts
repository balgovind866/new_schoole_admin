import axios from "axios";
import { AuthModel, OTPResponse, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users/verifylogin-otp`;
export const LOGIN_URL = `${API_URL}/auth/login/admin`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const SEND_LOGIN_OTP_URL = `${API_URL}/users/verifylogin-otp`

// Server should return AuthModel
export function login(email: string,password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
 
  "username": email,
  "password": password

  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function sendLoginOtp(email: string, otp: string) {
  return axios.post<OTPResponse>(SEND_LOGIN_OTP_URL, { email, otp })
}

// export function getUserByToken(  otp:string , email:string) {
//   return axios.post<UserModel>(`${API_URL}/users/verifylogin-otp`, {
//     otp,
//     email
//   });
// }
