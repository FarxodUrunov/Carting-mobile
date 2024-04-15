import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import BaseSelect from "~/base-select/BaseSelect";
import { BaseButton } from "~/button/BaseButton";
import { experienceOptions } from "_constants/index";
import { ControlledInput } from "~/ControlledInput";
import { router } from "expo-router";
import BaseDatePicker from "~/base-date-picker/BaseDatePicker";
import { useSearchStore } from "-/search.store";
import { useAnnouncementStore } from "-/announcement.store";
import { useTranslation } from "react-i18next";

export default function AnnouncementFilter() {
  const { t } = useTranslation();
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isValidDate, setValidDate] = useState(true);

  const {
    searchValue,
    handleFilterAnnouncementValue,
    clearAnnouncement,
    filterAnnouncementValue,
  } = useSearchStore();

  const { getAnnouncements } = useAnnouncementStore();

  const schema = z.object({
    experience: z.string().optional(),
    salaryFrom: z.number().optional(),
    salaryTo: z.number().optional(),
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
      experience: filterAnnouncementValue?.experience?.[0],
      salaryFrom: filterAnnouncementValue?.salary?.min,
      salaryTo: filterAnnouncementValue?.salary?.max,
    },
  });

  const { field: experience } = useController({
    control,
    name: "experience",
  });
  const { field: salary_from } = useController({ control, name: "salaryFrom" });
  const { field: salary_to } = useController({ control, name: "salaryTo" });

  const handleShowing = () => {
    const mandatory = inputIsMandatory();
    if (Date.parse(beginTime) >= Date.parse(endTime)) {
      setValidDate(false);
    } else {
      setValidDate(true);
    }
    if (mandatory || Date.parse(beginTime) >= Date.parse(endTime)) {
      return;
    }
    const filter = {
      experience: experience.value ? [experience.value] : [],
      salary: {
        min: salary_from.value ? salary_from.value : undefined,
        max: salary_to.value ? salary_to.value : undefined,
      },
      created_at: {
        min: beginTime ? beginTime : undefined,
        max: endTime ? endTime : undefined,
      },
    };

    handleFilterAnnouncementValue(filter);
    getAnnouncements({
      filter: { vacancies: filter, search: { value: searchValue } },
    });
    router.back();
  };

  const inputIsMandatory = () => {
    if (salary_from.value && salary_to.value) {
      if (+salary_from.value > +salary_to.value) {
        setError("salaryTo", {
          message: t(
            "the_next_amount_must_be_greater_than_the_original_amount"
          ),
        });
        return true;
      } else {
        clearErrors("salaryTo");
        return false;
      }
    }
  };
  const handleClear = () => {
    clearAnnouncement({});
    setBeginTime("");
    setEndTime("");
    reset();
    getAnnouncements({ filter: { search: { value: searchValue } } });
    router.back();
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: true,
          headerBackTitle: t("back"),
          headerTitle: t("announcement_filter"),
          headerRight: () => (
            <Pressable onPress={handleClear} className="py-2 px-1">
              <Text className="text-gray-500 font-normal mt-1">
                {t("clear")}
              </Text>
            </Pressable>
          ),
          headerLeft: ({ canGoBack }) => (
            <Pressable onPress={() => canGoBack}></Pressable>
          ),
        }}
      />
      <ScrollView>
        <View className="px-5 mt-3 flex-1 pb-8">
          <View className="flex-1 gap-4">
            <BaseSelect
              title={t("work_experience")}
              value={experience.value}
              label={t("work_experience")}
              placeholder={t("experience")}
              options={experienceOptions.map((item) => ({
                ...item,
                value: t(item.value),
              }))}
              onSelected={(item: any) => setValue("experience", item.id)}
            />
            <View className="justify-center">
              <Text className="font-medium mb-1 text-gray-700 dark:text-gray-300 capitalize">
                {t("salary")}
              </Text>
              <View className="flex-row">
                <View className="flex-1">
                  <ControlledInput
                    control={control}
                    name={"salaryFrom"}
                    placeholder={t("from")}
                    errors={errors}
                    keyboardType="numeric"
                    numeric
                  />
                </View>
                <View className="flex-1 ml-4">
                  <ControlledInput
                    control={control}
                    name={"salaryTo"}
                    placeholder={t("to")}
                    errors={errors}
                    keyboardType="numeric"
                    numeric
                  />
                </View>
              </View>
            </View>
            <View>
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
                    placeholder={t("from_date")}
                    dateValue={beginTime}
                    setDateValue={(val: string) => setBeginTime(val)}
                    errorMessage="Required"
                  />
                </View>
                <View className="flex-1">
                  <BaseDatePicker
                    placeholder={t("to_date")}
                    dateValue={endTime}
                    setDateValue={(val: string) => setEndTime(val)}
                    errorMessage="Required"
                  />
                </View>
              </View>
            </View>
            {!isValidDate && (
              <Text className="text-red-500/70 mt-1 text-center">
                Please enter valid date
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="px-5 mt-3 pb-8 justify-end">
        <BaseButton
          hasLoader
          title={t("showing")}
          onPress={handleSubmit(handleShowing)}
        />
      </View>
    </View>
  );
}
