import React from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import { BaseButton } from "~/button/BaseButton";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import BaseFileUpload from "~/base-file-upload/BaseFileUpload";
import { ControlledInput } from "~/ControlledInput";
import { PlateStateObject, autoNumberOptions } from "_constants/index";
import BaseIcon from "~/icon/BaseIcon";
import ControlledSelect from "~/controlled-select/ControlledSelect";
import { useProfile } from "-/profile.store";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";
import { z } from "zod";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";
import { useAuth } from "-/auth.store";

export default function ProfileAddNewVehicle() {
  const { isLoad } = useAuth();

  const { t } = useTranslation();
  const schema = z.object({
    auto_number: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    certificate_code: z
      .string({ required_error: t("required") })
      .max(2, { message: t("required") }),
    certificate_number: z.string({ required_error: t("required") }),
    auto_number_type: z.string({ required_error: t("required") }),
    photos: z.array(z.any()).nonempty(),
  });

  const {
    rememberDetails,
    changeAutoNumberType,
    confirmData,
    clearValues,
    plateState,
  } = useProfile();
  const params = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: confirmData,
  });

  const { field: photos, fieldState: photosState } = useController({
    control,
    name: "photos",
  });

  const handleShowing = (values: any) => {
    rememberDetails(values);
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/vehicles/add/additional",
        params: { edit: "edit" },
      });
    } else {
      router.push("/vehicles/add/additional");
    }
  };

  const handleBackToVehicles = () => {
    router.navigate("/vehicles/");
    clearValues();
  };

  const handleImageChange = async (item: any) => {
    setValue("photos", item);
  };

  const handleTypeSelect = (id: keyof typeof PlateStateObject) => {
    setValue("auto_number_type", id);
    setValue("auto_number", "");
    changeAutoNumberType(id);
  };

  return isLoad.userLoading ? (
    <>{/* Skeleton */}</>
  ) : (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        className="flex-col px-5 py-4"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Stack.Screen
              options={{
                headerTitle: t("add_new_vehicle"),
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerLeft() {
                  return (
                    <Pressable
                      onPress={handleBackToVehicles}
                      className="flex-row items-center"
                    >
                      <BaseIcon name="chevronLeft" cn="text-lime-600" />
                      <BaseText className="text-lg text-lime-600 font-semibold capitalize">
                        {t("back")}
                      </BaseText>
                    </Pressable>
                  );
                },
              }}
            />
            <View className="items-center mb-8">
              <BaseProgressbar progress={1} />
            </View>
            <View style={{ gap: 16 }}>
              <View>
                <ControlledSelect
                  label={t("transport_type")}
                  placeholder={t("select")}
                  name="auto_number_type"
                  control={control}
                  errors={errors}
                  options={autoNumberOptions?.map((item) => ({
                    label: t(item.value),
                    value: item.id,
                  }))}
                  handleValueChange={handleTypeSelect}
                />
              </View>
              <View>
                <ControllerInputMask
                  control={control}
                  mask={plateState.example}
                  name="auto_number"
                  label={t("vehicle_number")}
                  placeholder={plateState.example}
                  errors={errors}
                  autoCapitalize="characters"
                />
              </View>
              <View>
                <ControlledInput
                  control={control}
                  name="certificate_code"
                  label={t("testimonial_series")}
                  placeholder="AB"
                  errors={errors}
                  maxLength={2}
                  autoCapitalize="characters"
                />
              </View>
              <View>
                <ControlledInput
                  control={control}
                  name="certificate_number"
                  label={t("certificate_number")}
                  placeholder={t("certificate_number")}
                  errors={errors}
                  keyboardType="numeric"
                />
              </View>

              <View>
                <BaseFileUpload
                  label={t("vehicle_image")}
                  title={t("upload_vehicle_images")}
                  multiSelect
                  onSetImageData={(item: any) => handleImageChange(item)}
                  value={photos.value}
                  error={
                    (photos.value === undefined ||
                      photos.value?.length === 0) &&
                    photosState.invalid
                  }
                />
              </View>
            </View>

            <View className="my-6">
              <BaseButton
                hasLoader
                isLoading={isSubmitting}
                onPress={handleSubmit(handleShowing)}
                title={t("continue")}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
