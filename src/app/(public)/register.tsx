import { useAuth } from "-/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Stack, router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { ControlledInput } from "~/ControlledInput";
import DynamicKeyboardAvoidingView from "~/DynamicKeyboardAvoidingView";
import { BaseButton } from "~/button/BaseButton";
import { BaseText } from "~/text/BaseText";
import { z } from "zod";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";

export default function RegisterScreen() {
  const { t, i18n } = useTranslation();
  const { register, isLoading } = useAuth();
  const schema = z.object({
    first_name: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    phone: z
      .string({ required_error: t("required") })
      .min(12, { message: t("required") })
      .regex(/^998\d{9}$/, { message: t("invalid_phone_number") }),
    password: z
      .string({ required_error: t("required") })
      .min(6, { message: t("invalid_password") }),
    type: z.string(),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      phone: "998",
      password: "",
      type: "driver",
    },
  });

  const onSubmit = handleSubmit(async (credentials: any) => {
    const result = await register(credentials);
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
    <DynamicKeyboardAvoidingView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="mx-4">
        <View className="flex justify-center items-center mt-12">
          <Image
            source={require("@/images/undraw_logistics.png")}
            width={286}
            height={163}
          />
        </View>
        <View className="mt-16">
          <BaseText className=" text-3xl font-semibold ">
            {t("auth_sign_up_title")}
          </BaseText>
          <BaseText variant="tertiary" className=" text-base font-normal mt-2">
            {t("auth_sign_up_description")}
          </BaseText>
        </View>
        <View className="pt-16 gap-6">
          <View>
            <ControlledInput
              control={control}
              name="first_name"
              label={t("name")}
              placeholder={t("name_placeholder_enter")}
              errors={errors}
            />
          </View>

          <View>
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

          <View>
            <ControlledInput
              control={control}
              name="password"
              label={t("password")}
              placeholder={t("password_enter")}
              secureTextEntry
              errors={errors}
            />
          </View>
          {i18n.language === "uz" ? (
            <BaseText variant="tertiary" className="text-base font-normal ">
              <Link href="/terms" className="text-blue-500">
                {t("auth_agree_offer_public")}
              </Link>
              &nbsp;{t("auth_agree_offer")}
            </BaseText>
          ) : (
            <BaseText variant="tertiary" className="text-base font-normal ">
              <Link href="/terms" className="text-blue-500">
                {t("auth_agree_offer")}
              </Link>
              &nbsp;{t("auth_agree_offer_public")}
            </BaseText>
          )}
        </View>
        <View className="mt-12">
          <BaseButton
            onPress={onSubmit}
            title={t("auth_sign_up_title")}
            isLoading={isLoading}
            hasLoader
          />
        </View>

        <BaseText
          variant="tertiary"
          className="text-center text-base font-normal my-6"
        >
          {t("auth_has_account")}
          <Link href="/login" className="text-lime-400">
            &nbsp;{t("auth_sign_in_title")}
          </Link>
        </BaseText>
      </View>
    </DynamicKeyboardAvoidingView>
  );
}
