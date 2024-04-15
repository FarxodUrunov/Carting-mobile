import { Dimensions, Image, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { secondsToDhms } from "_utils/time";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BaseText } from "~/text/BaseText";
import { useAuth } from "-/auth.store";
import { FormatPhone } from "~/FormatPhone";
import DynamicKeyboardAvoidingView from "~/DynamicKeyboardAvoidingView";
import { BaseButton } from "~/button/BaseButton";
import { useSession } from "_hooks/session.hook";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { signIn } = useSession();
  const { colorScheme } = useColorScheme();
  const [resendId, setResendId] = useState(0);
  const { id, type, phone }: { id: string; phone: string; type: string } =
    useLocalSearchParams();
  const [time, setTime] = useState(119);
  const timerRef = useRef(time);
  const { getProfile } = useAuth();

  const { verify, resend, isLoading } = useAuth();
  let count = 0;
  const onCodeFilled = async (code: string) => {
    if (code.length === 4 && count === 0) {
      count++;
      const resendCodeId = resendId !== 0 ? resendId : id;
      const result = await verify({
        id: Number(resendCodeId),
        code: Number(code),
      });
      if (result) {
        count = 0;
        if (type === "forgot-password") {
          router.push({
            pathname: "/reset-password",
            params: {
              id: result,
              type: "forgot-password",
            },
          });
        } else if (type === "login") {
          signIn(result);
          getProfile();
          router.push("/search/");
        } else {
          router.push("/login/");
        }
      }
    }
  };

  async function resendCode() {
    const result = await resend({ id: Number(id) });
    if (result) {
      setResendId(result);
      setTime(119);
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [timerRef]);

  return (
    <DynamicKeyboardAvoidingView>
      <Stack.Screen
        options={{
          headerBackTitle: t("back"),
          headerBackVisible: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <View className="px-4">
        <View className="flex justify-center items-center pt-8">
          <Image
            source={require("@/images/check_message.png")}
            width={286}
            height={163}
          />
        </View>
        <View className="mt-16">
          <BaseText className="text-3xl font-semibold">
            {t("auth_verify_title")}
          </BaseText>
          <BaseText variant="tertiary" className="text-base font-normal mt-2">
            {t("auth_verify_description")}
          </BaseText>
          <BaseText variant="secondary" className="text-base font-medium">
            {FormatPhone(phone)}
          </BaseText>
        </View>
        <View className="items-center justify-center">
          <OtpInput
            autoFocus={true}
            focusColor="#66C61C"
            focusStickBlinkingDuration={500}
            onFilled={(text) => onCodeFilled(text)}
            numberOfDigits={4}
            theme={{
              containerStyle: {
                marginVertical: 30,
                alignItems: "center",
                justifyContent: "center",
                width: "85%",
                height: 150,
              },
              pinCodeContainerStyle: {
                width: Dimensions.get("window").width >= 380 ? 72 : 56,
                height: Dimensions.get("window").width >= 380 ? 72 : 56,
                borderColor: colorScheme === "dark" ? "#1D2939" : "#E4E7EC",
              },
              pinCodeTextStyle: {
                color: colorScheme === "dark" ? "#F9FAFB" : "#101828",
              },
            }}
          />
        </View>

        <BaseText
          variant="tertiary"
          className="text-base font-normal items-center self-center"
        >
          {time > 0 ? (
            secondsToDhms(time)
          ) : (
            <BaseButton
              isLoading={isLoading}
              hasLoader
              onPress={() => resendCode()}
              title={t("auth_otp_resend_code")}
              variant="link"
            />
          )}
        </BaseText>
      </View>
    </DynamicKeyboardAvoidingView>
  );
}
