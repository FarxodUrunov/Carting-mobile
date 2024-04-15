import React from "react";
import { useController, useForm } from "react-hook-form";
import { View, ScrollView, Pressable } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseButton } from "~/button/BaseButton";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import BaseSelect from "~/base-select/BaseSelect";
import { currencyOptions, paymentMethods } from "_constants/index";
import BaseFileUpload from "~/base-file-upload/BaseFileUpload";
import BaseMultiSelect from "~/base-multi-select/BaseMultiSelect";
import { ControlledInput } from "~/ControlledInput";
import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import ControlledSelect from "~/controlled-select/ControlledSelect";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ProfileCareersAddAdditionalScreen() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { trucks, rememberDetails, uploadFiles, confirmData } = useProfile();
  const params = useLocalSearchParams();

  const myTruckOptions = trucks?.map((item: any) => {
    return {
      id: `${item.id}`,
      model: item.model,
      auto_number: item.auto_number,
      photos: item.photos[0],
    };
  });

  const schema = z.object({
    title: z.string({ required_error: t("required") }),
    vehicle_id: z.number({ required_error: t("required") }),
    salary: z.number({ required_error: t("required") }),
    payment_methods: z
      .array(z.string({ required_error: t("required") }))
      .nonempty(),
    description: z.string({ required_error: t("required") }),
    currency: z.string({ required_error: t("required") }),
    files_mobile: z.array(z.any()).nonempty(),
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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  }: any = useForm({
    resolver: zodResolver(schema),
    defaultValues: confirmData,
  });

  const { field: vehicle_id, fieldState: vehicle_idState } = useController({
    control,
    name: "vehicle_id",
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

  const handleShowing = (values: any) => {
    values.experience = `${user?.experience}`;

    rememberDetails(values);

    if (params && params.edit === "edit") {
      router.push({
        pathname: "/careers/add/confirm",
        params: { edit: "edit" },
      });
    } else {
      router.push("/careers/add/confirm");
    }
  };

  const handleFileChange = async (item: any) => {
    setValue("files_mobile", item);
  };

  const handleBackToBasic = () => {
    router.push("/careers/add/with_truck");
  };
  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerTitle:
            params.edit === "edit" ? t("edit_career") : t("add_new_career"),
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft() {
            return (
              <Pressable
                onPress={handleBackToBasic}
                className="flex-row items-center"
              >
                <BaseIcon name="chevronLeft" cn="text-lime-600" />
                <BaseText className="text-lg text-lime-600 font-semibold">
                  {t("basic")}
                </BaseText>
              </Pressable>
            );
          },
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false} className="px-5 py-4">
          <View className="justify-center items-center pb-8 pt-2 px-14">
            <BaseProgressbar progress={2} />
          </View>

          <View className="justify-between" style={{ gap: 16 }}>
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
              <BaseSelect
                title={t("vehicle")}
                label={t("vehicle")}
                placeholder={t("select")}
                value={vehicle_id.value}
                fieldNames={{
                  key: "id",
                  label: "model",
                  sub_title: "auto_number",
                  img: "photos",
                }}
                variant="picture"
                options={myTruckOptions}
                onSelected={(item: { id: string }) =>
                  setValue("vehicle_id", +item.id)
                }
                error={
                  (vehicle_id.value === undefined || vehicle_id.value === 0) &&
                  vehicle_idState.invalid
                }
                success={
                  vehicle_id.value !== undefined ||
                  (vehicle_id.value !== 0 && vehicle_idState.invalid)
                }
                errorMessage={t("required")}
              />
            </View>
            <View>
              <ControlledSelect
                label={t("currency")}
                placeholder={t("select")}
                control={control}
                name="currency"
                options={currencyOptions.map((item) => ({
                  label: t(item.value),
                  value: item.id,
                }))}
                errors={errors}
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
            <View>
              <BaseMultiSelect
                title={t("payment_method")}
                label={t("payment_method")}
                placeholder={t("select")}
                value={payment_methods.value}
                options={paymentMethods.map((item) => ({
                  ...item,
                  value: t(item.value),
                }))}
                onSelected={(item: any) => setValue("payment_methods", item)}
                error={
                  (payment_methods.value === undefined ||
                    payment_methods.value?.length === 0) &&
                  payment_methodsState.invalid
                }
                success={
                  payment_methods.value !== undefined ||
                  (payment_methods.value !== 0 && payment_methodsState.invalid)
                }
                errorMessage={t("required")}
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
                style={{ textAlignVertical: "top" }}
                errors={errors}
              />
            </View>

            <View className="mb-4">
              <BaseFileUpload
                title={t("upload_new_file")}
                label={t("files")}
                variant="document"
                multiSelect
                onSetImageData={(item: any) => handleFileChange(item)}
                value={files_mobile.value}
                error={
                  (files_mobile.value === undefined ||
                    files_mobile.value?.length === 0) &&
                  files_mobileState.invalid
                }
              />
            </View>
            <View className="pb-6">
              <BaseButton
                hasLoader
                isLoading={isSubmitting}
                onPress={handleSubmit(handleShowing)}
                title={t("continue")}
              />
            </View>
          </View>
        </ScrollView>
      </>
    </CustomSafeAreaView>
  );
}
