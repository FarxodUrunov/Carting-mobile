import { Link, Stack, router } from "expo-router";
import { Dimensions, Image, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "-/auth.store";
import { BaseText } from "~/text/BaseText";
import DynamicKeyboardAvoidingView from "~/DynamicKeyboardAvoidingView";
import { ControlledInput } from "~/ControlledInput";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const { t } = useTranslation();
  const schema = z.object({
    phone: z
      .string({ required_error: t("required") })
      .min(12, { message: t("required") })
      .regex(/^998\d{9}$/, { message: t("invalid_phone_number") }),
    password: z
      .string({ required_error: t("required") })
      .min(6, { message: t("invalid_password") }),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "998",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (credentials: any) => {
    const result = await login(credentials);
    if (result) {
      reset();
      router.push({
        pathname: "/otp",
        params: {
          id: result,
          type: "login",
          phone: credentials.phone,
        },
      });
    }
  });

  return (
    <DynamicKeyboardAvoidingView
      contentContainerStyle={{
        flex: 0,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-4">
        <View className="flex justify-center items-center mt-20">
          <Image
            source={require("@/images/undraw_login.png")}
            style={{
              width: Dimensions.get("window").height > 700 ? 216 : 216 * 0.7,
              height: Dimensions.get("window").height > 700 ? 163 : 163 * 0.7,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: Dimensions.get("window").height > 700 ? 40 : 20,
          }}
        >
          <BaseText className="text-3xl font-semibold" variant="primary">
            {t("auth_sign_in_title")}
          </BaseText>
          <BaseText className="text-base font-normal mt-2" variant="tertiary">
            {t("auth_sign_up_description")}
          </BaseText>
        </View>

        <View className="flex-1">
          <ControllerInputMask
            mask="998999999999"
            control={control}
            name="phone"
            label={t("phone")}
            placeholder={t("phone_placeholder_enter")}
            errors={errors}
            keyboardType="phone-pad"
          />
          <View className="mt-4">
            <ControlledInput
              control={control}
              name="password"
              label={t("password")}
              placeholder={t("password_enter")}
              secureTextEntry
              errors={errors}
            />
          </View>

          <Link
            href="/forgot-password"
            className="text-base font-normal text-blue-500 mt-4"
          >
            {t("auth_forgot_password")}
          </Link>
        </View>

        <View className="items-center justify-around pt-6">
          <View className="w-full">
            <BaseButton
              onPress={onSubmit}
              title={t("auth_sign_in_title")}
              hasLoader
              isLoading={isLoading}
            />
          </View>

          <BaseText className="text-center my-4 text-base font-normal">
            {t("auth_has_not_account")}
            <Link href="/register" className="text-lime-400">
              &nbsp;{t("auth_sign_up_title")}
            </Link>
          </BaseText>
        </View>
      </View>
    </DynamicKeyboardAvoidingView>
  );
}
