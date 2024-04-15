import { Stack, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseText } from "~/text/BaseText";
import SafeAreaView from "~/safe-area/SafeAreaView";
import { useAuth } from "-/auth.store";
import DynamicKeyboardAvoidingView from "~/DynamicKeyboardAvoidingView";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth();
  const { t } = useTranslation();

  const schema = z.object({
    phone: z
      .string({ required_error: t("required") })
      .min(12, { message: t("required") })
      .regex(/^998\d{9}$/, { message: t("invalid_phone_number") }),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (credentials: any) => {
    const result = await forgotPassword(credentials);
    if (result) {
      reset();
      router.push({
        pathname: "/otp",
        params: {
          id: result,
          type: "forgot-password",
          phone: credentials.phone,
        },
      });
    }
  });

  return (
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      <DynamicKeyboardAvoidingView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View className="flex justify-center items-center mt-20">
          <Image
            source={require("@/images/forgot_password.png")}
            width={286}
            height={163}
          />
        </View>
        <View className="mt-16 px-4">
          <BaseText className="text-3xl font-semibold">
            {t("auth_forgot_password")}
          </BaseText>
          <BaseText variant="secondary" className="text-base font-normal mt-2">
            {t("auth_forgot_description")}
          </BaseText>
        </View>
        <View className="pt-10 px-4">
          <ControllerInputMask
            mask="998999999999"
            control={control}
            name="phone"
            label={t("phone")}
            placeholder={t("phone_placeholder_enter")}
            errors={errors}
            keyboardType="phone-pad"
          />
        </View>

        <View className="px-4 mt-8 justify-end flex-1">
          <BaseButton
            onPress={onSubmit}
            title={t("send")}
            hasLoader
            isLoading={isSubmitting}
          />
          <BaseButton
            onPress={() => router.push("/login")}
            title={t("auth_back_login")}
            variant="link"
            icon="arrowLeft"
            iconPosition="left"
          />
        </View>
      </DynamicKeyboardAvoidingView>
    </SafeAreaView>
  );
}
