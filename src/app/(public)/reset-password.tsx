import { useAuth } from "-/auth.store";
import { BaseResetPasswordAuthSchema } from "@anysoftuz/carting-shared/dist/schemas/web";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { ControlledInput } from "~/ControlledInput";
import DynamicKeyboardAvoidingView from "~/DynamicKeyboardAvoidingView";
import { BaseButton } from "~/button/BaseButton";
import BaseIcon from "~/icon/BaseIcon";
import SafeAreaView from "~/safe-area/SafeAreaView";
import { BaseText } from "~/text/BaseText";
import { z } from "zod";

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const { resetPassword } = useAuth();

  const schema = z
    .object({
      id: z.number(),
      password: z
        .string({ required_error: t("required") })
        .min(6, { message: t("invalid_password") }),
      confirm_password: z
        .string({ required_error: t("required") })
        .min(6, { message: t("invalid_password") }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t("invalid_password_match"),
      path: ["confirm_password"],
    });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: +id,
    },
  });

  const onSubmit = handleSubmit(async (credentials: any) => {
    const result = await resetPassword({
      id: Number(id),
      password: credentials.password,
    });

    if (result) {
      await Promise.all([reset(), router.push("/search/")]);
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
            source={require("@/images/new_password.png")}
            width={286}
            height={163}
          />
        </View>
        <View className="mt-16 px-4">
          <BaseText className="text-3xl font-semibold ">
            {t("auth_reset_title")}
          </BaseText>
          <BaseText variant="tertiary" className="text-base font-normal mt-2">
            {t("auth_reset_description")}
          </BaseText>
        </View>
        <View className="pt-10 px-4">
          <View className="py-6">
            <ControlledInput
              control={control}
              name="password"
              label={t("password")}
              placeholder={t("password_enter")}
              secureTextEntry
              errors={errors}
            />
          </View>
          <ControlledInput
            control={control}
            name="confirm_password"
            label={t("confirm_password")}
            placeholder={t("confirm_password_placeholder")}
            secureTextEntry
            errors={errors}
          />
        </View>

        <View className="px-4 mt-12 flex-1">
          <BaseButton
            hasLoader
            isLoading={isSubmitting}
            title={t("send")}
            onPress={() => onSubmit()}
          />
          <View className="items-center">
            <Link href="/login" className="text-center mt-6">
              <View className="flex flex-row items-center justify-center">
                <BaseIcon name="arrowLeftBold" cn="text-gray-900 mr-2" />
                <BaseText className="text-sm font-semibold">
                  {t("auth_back_login")}
                </BaseText>
              </View>
            </Link>
          </View>
        </View>
      </DynamicKeyboardAvoidingView>
    </SafeAreaView>
  );
}
