import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseMultiSelect from "~/base-multi-select/BaseMultiSelect";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { Stack, router } from "expo-router";
import BaseAvatarUpload from "~/base-avatar-upload/BaseAvatarUpload";
import BaseDatePicker from "~/base-date-picker/BaseDatePicker";
import { LicenseOptions, experienceOptions } from "_constants/index";
import { ControlledInput } from "~/ControlledInput";
import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import { EditProfileT } from "_/user";
import ControlledSelect from "~/controlled-select/ControlledSelect";
import BaseIcon from "~/icon/BaseIcon";
import { useColorScheme } from "nativewind";
import { BaseText } from "~/text/BaseText";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";
import colors from "_constants/colors";

export default function ProfileEditScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { editProfile, deleteAccount } = useAuth();
  const { countries, regions } = useProfile();
  const [isVisible, setVisible] = useState(false);

  const [countryList, setCountryList] = useState<
    { id: string; value: string }[]
  >([]);
  const [regionList, setRegionList] = useState<{ id: string; value: string }[]>(
    []
  );
  const user = JSON.parse(SecureStore.getItem("user") ?? "");

  const schema = z.object({
    photo: z.string().optional(),
    first_name: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    last_name: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    father_name: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    birth_date: z.string({ required_error: t("required") }),
    identify_number: z
      .string({ required_error: t("required") })
      .min(14, { message: t("invalid_identify_number") }),
    phone: z
      .string({ required_error: t("required") })
      .min(12, { message: t("required") })
      .regex(/^998\d{9}$/, { message: t("invalid_phone_number") }),
    email: z
      .string({ required_error: t("required") })
      .email({ message: t("invalid_email") }),
    country: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    region_id: z.number({ required_error: t("required") }),
    address: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    driver_license_category: z
      .array(z.string({ required_error: t("required") }))
      .nonempty(),
    experience: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  const {
    field: driver_license_category,
    fieldState: driver_license_categoryState,
  } = useController({
    control,
    name: "driver_license_category",
  });
  const { field: birth_date, fieldState: birth_dateState } = useController({
    control,
    name: "birth_date",
  });

  const handleCountryList = (data: any) => {
    if (data && data.length != 0) {
      const updatedList = data?.map((obj: { id: number; name: string }) => ({
        id: obj.id.toString(),
        value: obj.name,
      }));

      return updatedList;
    }
  };
  useEffect(() => {
    reset({
      ...user,
      region_id: user?.region ? user?.region.id : undefined,
      country: user?.country ? `${user?.country.id}` : undefined,
    });
    setCountryList(handleCountryList(countries));
    setRegionList(handleCountryList(regions));
  }, []);

  const handleShowing = async (values: EditProfileT) => {
    const result = await editProfile(values);
    if (result) {
      router.push("/(root)/(tabs)/(profile)/");
    }
  };

  const handleDelete = async () => {
    const result = await deleteAccount();
    if (result) {
      router.push("/(public)/register");
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 flex-col px-5 py-4"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen
            options={{
              headerTitle: t("edit_profile"),
              headerBackTitle: t("profile"),
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors[colorScheme].colors.card,
              },
              headerTintColor: colors[colorScheme].colors.text,
            }}
          />
          <View className="px-2 items-center">
            <BaseAvatarUpload
              source={
                user.photo
                  ? { uri: user.photo }
                  : require("@/images/avatar.png")
              }
              setValue={setValue}
            />
          </View>

          <View style={{ gap: 16 }}>
            <View>
              <ControlledInput
                label={t("name")}
                placeholder={t("first_name")}
                control={control}
                errors={errors}
                name="first_name"
              />
            </View>
            <View>
              <ControlledInput
                label={t("last_name")}
                placeholder={t("last_name")}
                control={control}
                errors={errors}
                name="last_name"
              />
            </View>
            <View>
              <ControlledInput
                label={t("father_name")}
                placeholder={t("father_name")}
                control={control}
                errors={errors}
                name="father_name"
              />
            </View>
            <View>
              <View
                className={`min-h-20 ${
                  birth_dateState.invalid ? `mb-6` : `mb-2`
                } `}
              >
                <BaseDatePicker
                  label={t("birth_date")}
                  placeholder={t("birth_date")}
                  dateValue={birth_date.value}
                  setDateValue={(val: string) => setValue("birth_date", val)}
                  error={
                    (birth_date.value === undefined ||
                      birth_date.value?.length === 0) &&
                    birth_dateState.invalid
                  }
                  errorMessage={t("required")}
                />
              </View>
            </View>
            <View>
              <ControlledInput
                label={t("jshshir")}
                placeholder={t("jshshir")}
                control={control}
                errors={errors}
                name="identify_number"
                keyboardType="numeric"
                maxLength={14}
              />
            </View>
            <View>
              <ControllerInputMask
                mask="998999999999"
                control={control}
                name="phone"
                label={t("phone_number")}
                placeholder={t("phone_number")}
                errors={errors}
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <ControlledInput
                label={t("email")}
                placeholder={t("email")}
                control={control}
                errors={errors}
                name="email"
                keyboardType="email-address"
              />
            </View>

            <View>
              <ControlledSelect
                label={t("country")}
                placeholder={t("country")}
                control={control}
                name="country"
                options={countryList.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                errors={errors}
              />
            </View>

            <View>
              <ControlledSelect
                label={t("region")}
                placeholder={t("region")}
                control={control}
                name="region_id"
                options={regionList.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                errors={errors}
                numeric
              />
            </View>
            <View>
              <ControlledInput
                label={t("home_address")}
                placeholder={t("home_address")}
                control={control}
                errors={errors}
                name="address"
              />
            </View>

            <View>
              <BaseMultiSelect
                label={t("driver_licence_category")}
                placeholder={t("driver_licence_category")}
                title="Category"
                value={driver_license_category.value}
                onSelected={(item) => setValue("driver_license_category", item)}
                options={LicenseOptions}
                error={
                  (driver_license_category.value === undefined ||
                    driver_license_category.value?.length === 0) &&
                  driver_license_categoryState.invalid
                }
                success={
                  driver_license_category.value !== undefined ||
                  (driver_license_category.value?.length !== 0 &&
                    driver_license_categoryState.invalid)
                }
                errorMessage={t("required")}
              />
            </View>

            <View>
              <ControlledSelect
                label={t("experience")}
                placeholder={t("experience")}
                control={control}
                name="experience"
                options={experienceOptions.map((item) => ({
                  label: t(item.value),
                  value: item.id,
                }))}
                errors={errors}
              />
            </View>
          </View>

          <View className="my-4">
            <Pressable className="p-4" onPress={() => setVisible(true)}>
              <Text
                className={`text-sm font-semibold text-center ${
                  colorScheme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                {t("delete_account")}
              </Text>
            </Pressable>
            <BaseButton
              hasLoader
              isLoading={isSubmitting}
              title={t("save_changes")}
              onPress={handleSubmit(handleShowing)}
            />
          </View>
          <Modal visible={isVisible} transparent={true} animationType="fade">
            <View
              className="w-full items-center justify-center  flex-1 px-10"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <View className="relative w-full items-center justify-center rounded-lg p-6 dark:bg-gray-900 bg-white">
                <Pressable
                  className="absolute right-6 top-6"
                  onPress={() => setVisible(false)}
                >
                  <BaseIcon name="close" />
                </Pressable>
                <View className="rounded-full bg-gray-200	dark:bg-gray-600 p-4">
                  <BaseIcon
                    name="exclamationCircle"
                    cn="dark:text-gray-300	 text-gray-700"
                  />
                </View>
                <View className="mt-5 items-center w-full">
                  <BaseText className="font-semibold">
                    {t("delete_account")}
                  </BaseText>
                  <BaseText variant="secondary">
                    {t("delete_description")}
                  </BaseText>
                </View>
                <View className="w-full mt-8 gap-4">
                  <BaseButton
                    title={t("delete")}
                    variant="delete"
                    onPress={handleDelete}
                    colored={true}
                    hasLoader
                    isLoading={isSubmitting}
                  />
                  <BaseButton
                    title={t("cancel")}
                    variant="secondary"
                    onPress={() => setVisible(false)}
                    colored={true}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
