import {
  DeleteAccountType,
  ForgotPasswordPayload,
  LoginPayload,
  RefreshTokenPayload,
  RegisterPayload,
  ResendVerificationPayload,
  ResetPasswordPayload,
  VerificationPayload,
} from "_/auth";

import axios from "_utils/fetch";

export function Login(payload: LoginPayload) {
  return axios.post<any>("/auth/sign-in", payload);
}
export function ForgotPassword(payload: ForgotPasswordPayload) {
  return axios.post<any>("/auth/password/forgot", payload);
}
export function ResetPassword(payload: ResetPasswordPayload) {
  return axios.post<any>("/auth/password/reset", payload);
}
export function Register(payload: RegisterPayload) {
  return axios.post<any>("/auth/sign-up", payload);
}
export function Verification(payload: VerificationPayload) {
  return axios.post<any>("/auth/verification", payload);
}
export function ResendVerification(payload: ResendVerificationPayload) {
  return axios.post<any>("/auth/verification/resend", payload);
}
export function RefreshToken(payload: RefreshTokenPayload) {
  return axios.post<any>("/auth/refresh-token", payload);
}

export function DeleteAccount() {
  return axios.delete<DeleteAccountType>("/drivers");
}
