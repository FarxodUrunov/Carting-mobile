import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, Stack } from "expo-router";
import BaseDatePicker from "~/base-date-picker/BaseDatePicker";
import BaseSelect from "~/base-select/BaseSelect";
import { BaseButton } from "~/button/BaseButton";
import { vehicleType, loadType } from "_constants/index";
import { ControlledInput } from "~/ControlledInput";
import { useSearchStore } from "-/search.store";
import { useLoadStore } from "-/load.store";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function LoadsFilter() {
  const { t } = useTranslation();
  const {
    regions,
    filterLoadValue,
    searchValue,
    handleFilterValue,
    clear,
    getRegions,
  } = useSearchStore();
  const { getLoads } = useLoadStore();

  useEffect(() => {
    getRegions();
  }, []);

  const schema = z.object({
    whereFrom: z.number().optional(),
    whereTo: z.number().optional(),
    machineType: z.string().optional(),
    weightFrom: z.number().optional(),
    weightTo: z.number().optional(),
    priceFrom: z.number().optional(),
    priceTo: z.number().optional(),
    cargoType: z.string().optional(),
    cargoLength: z.number().optional(),
    cargoHeight: z.number().optional(),
    cargoWidth: z.number().optional(),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      whereFrom: filterLoadValue?.pickup_region_id?.[0],
      whereTo: filterLoadValue?.delivery_region_id?.[0],
      machineType: filterLoadValue?.vehicle_type?.join(""),
      weightFrom: filterLoadValue?.capacity?.min,
      weightTo: filterLoadValue?.capacity?.max,
      priceFrom: filterLoadValue?.price?.min,
      priceTo: filterLoadValue?.price?.max,
      cargoType: filterLoadValue?.load_type?.join(""),
      cargoLength: filterLoadValue?.body_length,
      cargoHeight: filterLoadValue?.body_height,
      cargoWidth: filterLoadValue?.body_width,
    },
  });
  const { field: whereFrom } = useController({ control, name: "whereFrom" });
  const { field: whereTo } = useController({ control, name: "whereTo" });
  const { field: machineType } = useController({
    control,
    name: "machineType",
  });
  const { field: weightFrom } = useController({ control, name: "weightFrom" });
  const { field: weightTo } = useController({ control, name: "weightTo" });
  const { field: priceFrom } = useController({ control, name: "priceFrom" });
  const { field: priceTo } = useController({ control, name: "priceTo" });
  const { field: cargoType } = useController({ control, name: "cargoType" });
  const { field: cargoLength } = useController({
    control,
    name: "cargoLength",
  });
  const { field: cargoHeight } = useController({
    control,
    name: "cargoHeight",
  });
  const { field: cargoWidth } = useController({ control, name: "cargoWidth" });

  const [dateFrom, setDateFrom] = useState(
    filterLoadValue?.created_at?.min || ""
  );
  const [dateTo, setDateTo] = useState(filterLoadValue?.created_at?.max || "");

  const handleShowing = () => {
    const filter = {
      load_type: cargoType.value ? [cargoType.value] : [],
      body_height: cargoHeight.value ? cargoHeight.value : undefined,
      body_width: cargoWidth.value ? cargoWidth.value : undefined,
      body_length: cargoLength.value ? cargoLength.value : undefined,
      price: {
        max: priceTo.value ? priceTo.value : undefined,
        min: priceFrom.value ? priceFrom.value : undefined,
      },
      pickup_region_id: whereFrom.value ? [whereFrom.value] : [],
      delivery_region_id: whereTo.value ? [whereTo.value] : [],
      vehicle_type: machineType.value ? [machineType.value] : [],
      capacity: {
        min: weightFrom.value ? weightFrom.value : undefined,
        max: weightTo.value ? weightTo.value : undefined,
      },
      created_at: {
        min: dateFrom ? dateFrom : undefined,
        max: dateTo ? dateTo : undefined,
      },
    };

    handleFilterValue(filter);

    getLoads({ filter: { loads: filter, search: { value: searchValue } } });
    router.back();
  };

  const handleClear = () => {
    clear({});
    setDateFrom("");
    setDateTo("");
    reset();
    getLoads({ filter: { search: { value: searchValue } } });
    router.back();
  };

  const inputIsMandatory = (a: undefined | number, b: string | number) => {
    if (Number(a) > Number(b)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: true,
          headerBackTitle: t("back"),
          headerTitle: t("filter"),
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={handleClear} className="px-1 py-2">
              <Text className="text-gray-500 font-normal mt-1">
                {t("clear")}
              </Text>
            </Pressable>
          ),
          headerLeft: ({ canGoBack, tintColor }) => (
            <Pressable onPress={() => canGoBack}></Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        className="flex-col"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View className="px-5 mt-3">
              <View className="w-full gap-4">
                <BaseSelect
                  title={t("where_from")}
                  value={whereFrom.value}
                  label={t("where_from")}
                  placeholder={t("where_from")}
                  fieldNames={{ key: "id", label: "name" }}
                  options={regions}
                  onSelected={(item: any) => setValue("whereFrom", item.id)}
                />
                <BaseSelect
                  title={t("where_to")}
                  value={whereTo.value}
                  label={t("where_to")}
                  placeholder={t("where_to")}
                  fieldNames={{ key: "id", label: "name" }}
                  options={regions}
                  onSelected={(item: any) => setValue("whereTo", item.id)}
                />

                <BaseSelect
                  title={t("type_of_transport")}
                  value={machineType.value}
                  label={t("type_of_transport")}
                  placeholder={t("type_of_transport")}
                  options={vehicleType.map((item) => ({
                    ...item,
                    value: t(item.value),
                  }))}
                  onSelected={(item: any) => setValue("machineType", item.id)}
                />

                <View className="w-full">
                  <Text className="font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("weight")}
                  </Text>
                  <View className="flex-row gap-4">
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"weightFrom"}
                        placeholder={t("from")}
                        errors={errors}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"weightTo"}
                        placeholder={t("to")}
                        errors={errors}
                        onChangeText={(currentWeight) => {
                          if (
                            inputIsMandatory(weightFrom.value, currentWeight)
                          ) {
                            setError("weightTo", {
                              message: t("greater"),
                            });
                          } else {
                            clearErrors("weightTo");
                          }
                        }}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                  </View>
                </View>
                <View className="w-full">
                  <Text className="font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("price")}
                  </Text>
                  <View className="flex-row gap-4">
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"priceFrom"}
                        placeholder={t("from")}
                        errors={errors}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"priceTo"}
                        placeholder={t("to")}
                        errors={errors}
                        keyboardType="numeric"
                        numeric
                        onChangeText={(currentWeight) => {
                          if (
                            inputIsMandatory(priceFrom.value, currentWeight)
                          ) {
                            setError("priceTo", {
                              message:
                                "The price must be greater than the previous price",
                            });
                          } else {
                            clearErrors("priceTo");
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>

                <BaseSelect
                  title={t("cargo_type")}
                  value={cargoType.value}
                  label={t("cargo_type")}
                  placeholder={t("cargo_type")}
                  options={loadType.map((item) => ({
                    ...item,
                    value: t(item.value),
                  }))}
                  onSelected={(item: any) => setValue("cargoType", item.id)}
                />

                <View>
                  <Text className="font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("cargo_dimensions")}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="w-16 font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {t("length")}
                    </Text>
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"cargoLength"}
                        placeholder="5"
                        errors={errors}
                        icon={{ left: "arrowUpBorderBottom" }}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                  </View>
                  <View className="flex-row items-center my-1.5">
                    <Text className="w-16 font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {t("height")}
                    </Text>
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"cargoHeight"}
                        placeholder="5"
                        errors={errors}
                        icon={{ left: "arrowUpBorderBottom" }}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="w-16 font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {t("width")}
                    </Text>
                    <View className="flex-1">
                      <ControlledInput
                        control={control}
                        name={"cargoWidth"}
                        placeholder="5"
                        errors={errors}
                        icon={{ left: "arrowUpBorderBottom" }}
                        keyboardType="numeric"
                        numeric
                      />
                    </View>
                  </View>
                </View>
                <View className="pb-8">
                  <Text className="font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("show_only")}
                  </Text>
                  <View
                    className={`flex-1 ${
                      Platform.OS === "ios" ? "" : "flex-row gap-4"
                    }`}
                  >
                    <View className="flex-1">
                      <BaseDatePicker
                        dateValue={dateFrom}
                        setDateValue={setDateFrom}
                        placeholder={t("from_date")}
                      />
                    </View>
                    <View className="flex-1">
                      <BaseDatePicker
                        dateValue={dateTo}
                        setDateValue={setDateTo}
                        placeholder={t("to_date")}
                        error={inputIsMandatory(
                          Date.parse(dateFrom ? dateFrom : "0"),
                          Date.parse(dateTo ? dateTo : "0")
                        )}
                        errorMessage="Must be greater than date from"
                      />
                    </View>
                  </View>
                </View>
                <BaseButton
                  hasLoader
                  title={t("showing")}
                  onPress={handleSubmit(handleShowing)}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
