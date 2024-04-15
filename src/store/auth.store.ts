import { create } from "zustand";
import {
  DeleteAccount,
  ForgotPassword,
  Login,
  Register,
  ResendVerification,
  ResetPassword,
  Verification,
} from "_api/auth";
import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResendVerificationPayload,
  ResetPasswordPayload,
  VerificationPayload,
  VerificationResponse,
} from "_/auth";
import { User } from "_/user";
import { Company } from "_/company";

import { Alert } from "react-native";
import { setStorageItemAsync } from "_hooks/storage.hook";
import { router } from "expo-router";
import {
  GetProfile,
  EditProfile,
  Logout,
  UpdateSearchWorkStatus,
} from "_api/profile";
import { t } from "i18next";

interface AuthState {
  isLoading: boolean;
  isLoad: {
    userLoading: boolean;
  };
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
  deleteAccount: () => Promise<void | Boolean>;
}

export const useAuth = create<AuthState>((set, get) => ({
  isLoading: false,
  isLoad: {
    userLoading: false,
  },
  access_token: null,
  refresh_token: null,
  user: null,

  setLoginResult(payload) {
    const user = {
      id: payload.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      father_name: payload.father_name,
      photo: payload.photo,
      type: payload.type,
      company: payload.company,
    };
    return Promise.all([
      setStorageItemAsync("access_token", payload.access_token),
      setStorageItemAsync("refresh_token", payload.refresh_token),
      setStorageItemAsync(
        "user",
        JSON.stringify({
          id: payload.id,
          first_name: payload.first_name ?? undefined,
          last_name: payload.last_name ?? undefined,
          father_name: payload.father_name ?? undefined,
          photo: payload.photo ?? undefined,
          type: payload.type ?? undefined,
          company: payload.company ?? undefined,
        })
      ),
    ]).then(() => {
      set({
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
        user,
      });
      return payload.access_token;
    });
  },
  login(payload) {
    set({ isLoading: true });
    return Login(payload)
      .then(({ data }) => {
        if (data) {
          return data.id;
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => set({ isLoading: false }));
  },
  verify(payload) {
    set({ isLoading: true });
    return Verification(payload)
      .then(({ data }) => {
        get().setLoginResult(data);
        return data.access_token ?? data.id;
      })
      .catch((err) => {
        if (err?.response?.data) {
          Alert.alert(err.response.data.error, err.response.data.message);
        }
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  resend(payload) {
    return ResendVerification(payload)
      .then(({ data }) => {
        Alert.alert(t("verification_code_sent"), t("check_email"));
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  register(payload) {
    set({ isLoading: true });
    return Register(payload)
      .then(({ data }) => {
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  logout() {
    set({ isLoading: true });
    return Logout()
      .then(() => {
        get().setLoginResult({
          access_token: null,
          refresh_token: null,
          user: null,
        });
        return true;
      })
      .catch((err) => {
        // Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  forgotPassword(payload) {
    set({ isLoading: true });
    return ForgotPassword(payload)
      .then(({ data }) => {
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  resetPassword(payload) {
    set({ isLoading: true });
    return ResetPassword(payload)
      .then(async ({ data }) => {
        const token = await get().setLoginResult(data);
        return token;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getProfile() {
    set({ isLoad: { ...get().isLoad, userLoading: true } });

    return GetProfile()
      .then(async ({ data }) => {
        Object.keys(data).forEach((key) => {
          if (data[key] === null) {
            data[key] = undefined;
          }
        });
        await setStorageItemAsync(
          "user",
          JSON.stringify({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            father_name: data.father_name,
            photo: data.photo,
            type: data.type,
            company: data.company,
            address: data.address,
            birth_date: data.birth_date,
            country: data.country,
            driver_license_category: data.driver_license_category,
            email: data.email,
            experience: data.experience,
            identify_number: data.identify_number,
            phone: data.phone,
            region: data.region,
            search_work: data.search_work,
            status: data.status,
          })
        );
        set({ user: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, userLoading: false } });
      });
  },
  editProfile(payload) {
    set({ isLoading: true });
    const getProfile = get().getProfile;
    return EditProfile(payload)
      .then(() => {
        Alert.alert(t("successfully_updated"), t("profile_updated"));
        getProfile();
        return true;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  editStatus(value) {
    set({ isLoading: true });
    const getProfile = get().getProfile;
    const payload = { search_work: value };

    return UpdateSearchWorkStatus(payload)
      .then(({ data }) => {
        Alert.alert(
          t("status_updated"),
          value ? t("you_searching") : t("you_not_searching")
        );
        getProfile();
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  deleteAccount() {
    set({ isLoading: true });
    return DeleteAccount()
      .then(() => {
        get().setLoginResult({
          access_token: null,
          refresh_token: null,
          user: null,
        });
        Alert.alert(t("successfully_deleted"), t("account_deleted"));
        return true;
      })
      .catch((err) => {
        if (err.response.data.statusCode === 422) {
          Alert.alert(err.response.data.message);
        }
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
