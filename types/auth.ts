import { BaseResponseType } from "@anysoftuz/carting-shared";
import { User } from "./user";

export type LoginPayload = {
  phone: string;
  password: string;
};
export type LoginResponse = {
  id: number;
  code: number;
};
export type ForgotPasswordPayload = {
  phone: string;
};

export type ResetPasswordPayload = {
  id: number;
  password: string;
};

export type RegisterPayload = {
  type: "driver" | "customer";
  phone: string;
  password: string;
  first_name: string;
};

export type VerificationPayload = {
  id: number;
  code: number;
};
export type VerificationResponse = {
  access_token: string;
  refresh_token: string;
} & User;
export type ResendVerificationPayload = Pick<VerificationPayload, "id">;
export type LogoutResponse = { id: number; status?: number };
export type RefreshTokenPayload = {
  refresh_token: string;
};

export interface AuthState {
  isLoading: boolean;
  access_token: string | null;
  refresh_token: string | null;
  user: any;
  login: (payload: LoginPayload) => Promise<any>;
  verify: (payload: VerificationPayload) => Promise<any>;
  resend: (payload: ResendVerificationPayload) => Promise<any>;
  register: (user: RegisterPayload) => Promise<any>;
  logout: () => Promise<any>;
  getProfile: () => Promise<any>;
  forgotPassword: (payload: ForgotPasswordPayload) => any;
  resetPassword: (payload: ResetPasswordPayload) => any;
  setLoginResult: (user: any) => void;
  editProfile: (payload: any) => Promise<void | Boolean>;
  editStatus: (value: boolean) => void;
}

export type DeleteAccountType = BaseResponseType & {
  id: number;
};
