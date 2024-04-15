import { useController, useForm } from "react-hook-form";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pressable, ScrollView, Text, View } from "react-native";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import { BaseButton } from "~/button/BaseButton";
import BaseMultiSelect from "~/base-multi-select/BaseMultiSelect";
import {
  fuelType,
  gearboxOptions,
  loadType,
  paymentMethods,
  statusOptions,
  supplementaryOptions,
  tripOptions,
  vehicleOptions,
} from "_constants/index";
import BaseFileUpload from "~/base-file-upload/BaseFileUpload";
import { ControlledInput } from "~/ControlledInput";
import { useEffect, useState } from "react";
import ControlledSelect from "~/controlled-select/ControlledSelect";
import { useProfile } from "-/profile.store";
import BaseIcon from "~/icon/BaseIcon";
import { useTranslation } from "react-i18next";

export default function ProfileVehicleAddAdditionalScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { rememberDetails, regions, brands, getModels, models, confirmData } =
    useProfile();
  const [regionList, setRegionList] = useState<{ id: string; value: string }[]>(
    []
  );
  const schema = z.object({
    vehicle_type: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    status: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    brand_type: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    model_id: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    vin: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    body_width: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    body_length: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    body_height: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    made_year: z.number({ required_error: t("required") }).refine(
      (value) => {
        const numericValue = Number(value);
        return (
          !isNaN(numericValue) && numericValue > 1990 && numericValue < 2030
        );
      },
      {
        message: t("invalid_year_message"),
      }
    ),
    capacity: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    load_type: z.string().array().nonempty(),
    supplementary: z.string().array().nonempty(),
    fuel_type: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    power: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    gearbox: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    trip_type: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
    from_region_id: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    to_region_id: z
      .number({ required_error: t("required") })
      .min(1, { message: t("required") }),
    payment_methods: z.string().array().nonempty(),
    description: z
      .string({ required_error: t("required") })
      .min(1, { message: t("required") }),
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
    setRegionList(handleCountryList(regions));
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  }: any = useForm({
    resolver: zodResolver(schema),
    defaultValues: confirmData,
  });

  const createController = (name: string) => {
    const { field, fieldState } = useController({
      control,
      name,
    });
    return { field, fieldState };
  };

  // Usage
  const { field: load_type, fieldState: load_typeState } =
    createController("load_type");
  const { field: supplementary, fieldState: supplementaryState } =
    createController("supplementary");

  const { field: payment_methods, fieldState: payment_methodsState } =
    createController("payment_methods");

  const { field: files_mobile, fieldState: files_mobileState } =
    createController("files_mobile");

  const handleCheckSubmit = handleSubmit((values: any) => {
    rememberDetails(values);
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/vehicles/add/confirm",
        params: { edit: "edit" },
      });
    } else {
      router.push("/vehicles/add/confirm");
    }
  });
  const handleClick = async () => {
    await handleCheckSubmit();
  };

  const handleBrandChange = (id: number) => {
    setValue("model_id", null);
    if (id) {
      getModels(id);
    }
  };
  const handleFileChange = async (item: any) => {
    setValue("files_mobile", item);
  };
  const handleBackToBasic = () => {
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/vehicles/add/",
        params: { edit: "edit" },
      });
    } else {
      router.push("/vehicles/add/");
    }
  };
  return (
    <>
      <ScrollView
        className="flex-1 flex-col px-5 py-4"
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            headerTitle: t("additional"),
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeft() {
              return (
                <Pressable
                  onPress={handleBackToBasic}
                  className="flex-row items-center"
                >
                  <BaseIcon name="chevronLeft" cn="text-lime-600" />
                  <Text className="text-lg text-lime-600 font-semibold capitalize">
                    {t("basic")}
                  </Text>
                </Pressable>
              );
            },
          }}
        />

        <View className="items-center mb-8 ">
          <BaseProgressbar progress={2} />
        </View>

        <View style={{ gap: 14 }}>
          <View>
            <ControlledSelect
              label={t("transport_type")}
              placeholder={t("select")}
              name="vehicle_type"
              control={control}
              options={vehicleOptions.map((item) => ({
                label: `${t(item.value)}`,
                value: item.id,
              }))}
              errors={errors}
            />
          </View>
          <View>
            <ControlledSelect
              label={t("status_type")}
              placeholder={t("select")}
              name="status"
              control={control}
              options={statusOptions.map((item) => ({
                label: t(item.value),
                value: item.id,
              }))}
              errors={errors}
            />
          </View>
          <View>
            <ControlledSelect
              label={t("brand_type")}
              placeholder={t("select")}
              name="brand_type"
              control={control}
              options={brands?.map((item: any) => ({
                label: item.value,
                value: item.id,
              }))}
              errors={errors}
              handleValueChange={handleBrandChange}
              numeric
            />
          </View>
          <View>
            <ControlledSelect
              label={t("model")}
              placeholder={t("select")}
              name="model_id"
              control={control}
              options={models?.map((item: any) => ({
                label: item?.value,
                value: item?.id,
              }))}
              errors={errors}
              numeric
            />
          </View>
          <View>
            <ControlledInput
              control={control}
              name="vin"
              label={t("vin")}
              placeholder={t("vin")}
              errors={errors}
            />
          </View>
          <View style={{ gap: 8 }} className="flex-row w-full items-end">
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="body_width"
                label={t("size")}
                placeholder={t("size")}
                errors={errors}
                keyboardType="numeric"
                numeric
              />
            </View>
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="body_length"
                label={t("length")}
                placeholder={t("length")}
                errors={errors}
                keyboardType="numeric"
                numeric
              />
            </View>
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="body_height"
                label={t("height")}
                placeholder={t("height")}
                errors={errors}
                keyboardType="numeric"
                numeric
              />
            </View>
          </View>
          <View>
            <ControlledInput
              control={control}
              name="made_year"
              label={t("year")}
              placeholder={t("year")}
              errors={errors}
              keyboardType="numeric"
              numeric
            />
          </View>
          <View>
            <ControlledInput
              label={t("capacity")}
              placeholder={t("capacity")}
              control={control}
              name="capacity"
              errors={errors}
              keyboardType="numeric"
              numeric
            />
          </View>
          <View>
            <BaseMultiSelect
              label={t("load_type")}
              placeholder={t("select")}
              value={watch("load_type")}
              onSelected={(item) => setValue("load_type", item)}
              options={loadType.map((item) => ({
                id: item.id,
                value: t(item.value),
                selected: item.selected,
              }))}
              error={
                (load_type.value === undefined ||
                  load_type.value?.length === 0) &&
                load_typeState.invalid
              }
              success={
                load_type.value !== undefined ||
                (load_type.value?.length !== 0 && load_typeState.invalid)
              }
              errorMessage={t("required")}
            />
          </View>
          <View>
            <BaseMultiSelect
              label={t("supplementary")}
              value={watch("supplementary")}
              placeholder={t("select")}
              onSelected={(item) => setValue("supplementary", item)}
              options={supplementaryOptions.map((item) => ({
                ...item,
                value: t(item.value),
              }))}
              error={
                (supplementary.value === undefined ||
                  supplementary.value?.length === 0) &&
                supplementaryState.invalid
              }
              success={
                supplementary.value !== undefined ||
                (supplementary.value?.length !== 0 &&
                  supplementaryState.invalid)
              }
              errorMessage={t("required")}
            />
          </View>
          <View>
            <ControlledSelect
              label={t("fuel_type")}
              placeholder={t("select")}
              name="fuel_type"
              control={control}
              options={fuelType.map((item) => ({
                label: t(item.value),
                value: item.id,
              }))}
              errors={errors}
            />
          </View>
          <View>
            <ControlledInput
              control={control}
              name="power"
              label={t("power")}
              placeholder={t("power")}
              errors={errors}
              keyboardType="numeric"
              numeric
            />
          </View>
          <View>
            <ControlledSelect
              label={t("transmission")}
              placeholder={t("select")}
              name="gearbox"
              control={control}
              options={gearboxOptions.map((item) => ({
                label: t(item.value),
                value: item.id,
              }))}
              errors={errors}
            />
          </View>
          <View>
            <ControlledSelect
              label={t("trip_type")}
              placeholder={t("select")}
              name="trip_type"
              control={control}
              options={tripOptions.map((item) => ({
                label: t(item.value),
                value: item.id,
              }))}
              errors={errors}
            />
          </View>
          <View>
            <ControlledSelect
              label={t("pickup_location")}
              placeholder={t("select")}
              name="from_region_id"
              control={control}
              options={regionList.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              errors={errors}
              numeric
            />
          </View>
          <View>
            <ControlledSelect
              label={t("delivery_location")}
              placeholder={t("select")}
              name="to_region_id"
              control={control}
              options={regionList.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              errors={errors}
              numeric
            />
          </View>
          <View>
            <BaseMultiSelect
              label={t("payment_method")}
              value={watch("payment_methods")}
              placeholder={t("select")}
              onSelected={(item) => setValue("payment_methods", item)}
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
                (payment_methods.value?.length !== 0 &&
                  payment_methodsState.invalid)
              }
              errorMessage={t("required")}
            />
          </View>
          <View>
            <ControlledInput
              label={t("description")}
              placeholder={t("some_notes")}
              control={control}
              name="description"
              numberOfLines={3}
              multiline
              errors={errors}
            />
          </View>
          <View>
            <BaseFileUpload
              title={t("upload_files")}
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
        </View>

        <View className="my-6">
          <BaseButton
            hasLoader
            isLoading={isSubmitting}
            onPress={handleClick}
            title={t("continue")}
          />
        </View>
      </ScrollView>
    </>
  );
}
