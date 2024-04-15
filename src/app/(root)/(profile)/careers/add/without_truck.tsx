import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import BaseInput from "~/input/BaseInput";
import BaseMultiSelect from "~/base-multi-select/BaseMultiSelect";
import { currencyOptions, paymentMethods } from "_constants/index";
import { FormatPhone } from "~/FormatPhone";
import { BaseButton } from "~/button/BaseButton";
import BaseFileUpload from "~/base-file-upload/BaseFileUpload";
import { FormatAge } from "~/Format";
import { ControlledInput } from "~/ControlledInput";
import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import ControlledSelect from "~/controlled-select/ControlledSelect";
import { FormatExperience } from "~/FormatExperience";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ProfileCareersCreateWithoutTruckScreen() {
  const { t } = useTranslation();

  const { user, isLoad } = useAuth();
  const { createWithoutTruck, regions, confirmData, updateCv, clearValues } =
    useProfile();
  const [regionList, setRegionList] = useState<{ id: string; value: string }[]>(
    []
  );
  const params = useLocalSearchParams();

  const schema = z.object({
    title: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    from_region_id: z.number({ required_error: t("required") }),
    to_region_id: z.number({ required_error: t("required") }),
    salary: z.number({ required_error: t("required") }),
    description: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    payment_methods: z
      .array(z.string({ required_error: t("required") }))
      .nonempty(),
    currency: z.string({ required_error: t("required") }),
    files_mobile: z.array(z.any()).nonempty(),
    experience: z.string(),
    // files: z
    //   .array(
    //     z.object({
    //       extension: z.string(),
    //       filename: z.string(),
    //       original_name: z.string(),
    //       size: z.number(),
    //       url: z.string(),
    //     })
    //   )
    //   .nonempty(),
  });

  // Need to remove file validation and add custom file validation
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  }: any = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      experience: user?.experience,
      ...confirmData,
    },
  });

  const { field: payment_methods, fieldState: payment_methodsState } =
    useController({
      control,
      name: "payment_methods",
    });

  const { field: files_mobile, fieldState: files_mobileState } = useController({
    control,
    name: "files_mobile",
  });

  useEffect(() => {
    reset();
  }, [router]);

  const handleCountryList = (data: any) => {
    if (data && data.length != 0) {
      const updatedList = data?.map((obj: { id: number; name: string }) => ({
        id: obj?.id.toString(),
        value: obj?.name,
      }));

      return updatedList;
    }
  };

  useEffect(() => {
    setRegionList(handleCountryList(regions));
  }, []);

  const handleFileChange = async (item: any) => {
    setValue("files_mobile", item);
  };

  const handleCreateUpdate = handleSubmit(async (values: any) => {
    if (params && params.edit === "edit") {
      const result: any = await updateCv("cv", confirmData.id, values);
      if (result) {
        router.push({
          pathname: `/careers/${result.id}`,
          params: { create: "create" },
        });
        clearValues();
      }
    } else {
      const result = await createWithoutTruck(values);
      if (result) {
        router.navigate("/careers");
        clearValues();
      }
    }
  });
  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: `${
            params.edit === "edit" ? t("edit_career") : t("create_career")
          }`,
          headerBackTitle: t("careers"),
          headerShadowVisible: false,
        }}
      />
      {!isLoad.userLoading ? (
        user?.identify_number ? (
          <KeyboardAvoidingView
            className="flex-col px-5 py-4"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: 16 }}>
                  <View>
                    <BaseInput
                      value={user.first_name}
                      label={t("first_name")}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("last_name")}
                      value={user.last_name}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("father_name")}
                      value={user.father_name}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("age")}
                      value={FormatAge(user.birth_date)}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("phone_number")}
                      value={FormatPhone(user.phone)}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("email")}
                      value={user.email}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("country")}
                      value="Country"
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("region")}
                      value={user.region?.name}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("address")}
                      value={user.address}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("driver_licence_category")}
                      value={user.driver_license_category?.join(", ")}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <BaseInput
                      label={t("experience")}
                      value={FormatExperience(user.experience)}
                      readOnly
                      disabled={true}
                    />
                  </View>
                  <View>
                    <ControlledInput
                      label={t("title")}
                      placeholder={t("title_cv")}
                      control={control}
                      name="title"
                      errors={errors}
                    />
                  </View>
                  <View>
                    <ControlledInput
                      label={t("about_me")}
                      placeholder={t("some_notes")}
                      control={control}
                      name="description"
                      numberOfLines={3}
                      multiline
                      errors={errors}
                    />
                  </View>
                  <View>
                    <ControlledSelect
                      label={t("where_from")}
                      placeholder={t("select_region")}
                      control={control}
                      name="from_region_id"
                      errors={errors}
                      options={regionList.map((item) => ({
                        label: item.value,
                        value: item.id,
                      }))}
                      numeric
                    />
                  </View>
                  <View>
                    <ControlledSelect
                      label={t("where_to")}
                      placeholder={t("select_region")}
                      control={control}
                      name="to_region_id"
                      errors={errors}
                      options={regionList.map((item) => ({
                        label: item.value,
                        value: item.id,
                      }))}
                      numeric
                    />
                  </View>
                  <View>
                    <ControlledSelect
                      placeholder={t("select")}
                      label={t("currency")}
                      control={control}
                      name="currency"
                      errors={errors}
                      options={currencyOptions.map((item) => ({
                        label: `${t(item.value)}`,
                        value: item.id,
                      }))}
                    />
                  </View>
                  <View>
                    <ControlledInput
                      label={t("salary")}
                      placeholder={t("salary")}
                      control={control}
                      name="salary"
                      keyboardType="numeric"
                      errors={errors}
                      numeric={true}
                    />
                  </View>
                  <View className="my-2">
                    <BaseMultiSelect
                      label={t("payment_method")}
                      placeholder={t("select")}
                      value={watch("payment_methods")}
                      onSelected={(item: any) =>
                        setValue("payment_methods", item)
                      }
                      options={paymentMethods.map((item) => ({
                        ...item,
                        value: t(item.value),
                      }))}
                      error={
                        (payment_methods.value === undefined ||
                          payment_methods.value?.length === 0) &&
                        payment_methodsState.invalid
                      }
                      success={
                        payment_methods.value !== undefined ||
                        (payment_methods.value !== 0 &&
                          payment_methodsState.invalid)
                      }
                      errorMessage={t("required")}
                    />
                  </View>
                  <View className="mb-2">
                    <BaseFileUpload
                      title={t("upload_new_file")}
                      label={t("files")}
                      variant="document"
                      multiSelect
                      onSetImageData={(item: any) => {
                        handleFileChange(item);
                      }}
                      value={files_mobile.value}
                      error={
                        (files_mobile.value === undefined ||
                          files_mobile.value?.length === 0) &&
                        files_mobileState.invalid
                      }
                    />
                  </View>
                  <View className="my-4">
                    <BaseButton
                      hasLoader
                      isLoading={isSubmitting}
                      title={`${
                        params.edit === "edit"
                          ? t("edit_career")
                          : t("create_career")
                      }`}
                      onPress={handleCreateUpdate}
                    />
                  </View>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        ) : (
          <View className="h-full justify-center items-center">
            <Link
              href="/edit"
              className="underline dark:text-gray-50 text-blue-500"
            >
              {t("invalid_data")}
            </Link>
          </View>
        )
      ) : (
        <View></View>
      )}
    </CustomSafeAreaView>
  );
}
