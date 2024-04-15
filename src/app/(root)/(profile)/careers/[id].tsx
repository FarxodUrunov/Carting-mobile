import {
  View,
  Pressable,
  Image,
  Alert,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";
import { FormatDate } from "~/FormatDate";
import { FormatPhone } from "~/FormatPhone";
import SkeletonProfileDetail from "~/secondary/skeletons/SkeletonProfileDetail";
import { FormatAge, FormatLoadType, FormatTripType } from "~/Format";
import { FormatExperience } from "~/FormatExperience";
import { useProfile } from "-/profile.store";
import { useTranslation } from "react-i18next";
import { BaseButton } from "~/button/BaseButton";
import { useState } from "react";
import { useAuth } from "-/auth.store";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ProfileCareerDetailScreen() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const { isLoad, cvDetail, setEditCvValues, deleteCv, getCareers } =
    useProfile();
  const { user } = useAuth();

  const [deleteModal, setDeleteModal] = useState(false);

  const handleEdit = () => {
    setEditCvValues();
    router.push({
      pathname: cvDetail.model
        ? "/careers/add/with_truck"
        : "/careers/add/without_truck",
      params: { edit: "edit" },
    });
  };
  const handleBackToCareer = () => {
    // Need to fix
    if (params.edit === "edit") {
      router.push("/careers");
    } else {
      router.back();
    }
  };

  const handleDelete = async () => {
    const res = await deleteCv(cvDetail.id);
    if (res.status === 200) {
      setDeleteModal(false);
      getCareers();
      router.back();
    }
  };

  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Pressable
                onPress={handleBackToCareer}
                className="flex-row items-center"
              >
                <BaseIcon name="chevronLeft" cn="text-lime-600" />
                <BaseText className="text-lg text-lime-600 font-semibold">
                  {t("my_career")}
                </BaseText>
              </Pressable>
            );
          },
          headerRight: () => (
            // Alert.alert("", t("link_copied"), [{ text: t("ok") }])
            <Pressable onPress={() => Alert.alert(t("link_copied"))}>
              <BaseIcon name="share" />
            </Pressable>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="px-5 py-4">
        {!isLoad.careersDetail ? (
          <>
            <View className="border-b pb-4 dark:border-gray-700 border-gray-200">
              <View className="py-4 rounded-md flex-row gap-3 mb-4 dark:border-gray-700 border-gray-200">
                {cvDetail.model
                  ? cvDetail.photos?.length > 0 && (
                      <Image
                        className="w-16 h-16 rounded"
                        source={{
                          uri: cvDetail.photos?.[0],
                        }}
                      />
                    )
                  : user.photo?.length > 0 && (
                      <Image
                        className="w-16 h-16 rounded"
                        source={{
                          uri: user.photo,
                        }}
                      />
                    )}
                <View>
                  <BaseText className="text-lg font-semibold">
                    {cvDetail.model ??
                      `${cvDetail.first_name} ${cvDetail.last_name}`}
                  </BaseText>
                  <BaseText className="text-sm">
                    {cvDetail.auto_number ?? FormatPhone(cvDetail.phone)}
                  </BaseText>
                </View>
              </View>
              <BaseText className="text-xl font-semibold">
                {cvDetail.title}
              </BaseText>
              <BaseText className="text-sm mt-2" variant="tertiary">
                {cvDetail.description}
              </BaseText>
            </View>

            <View className="border-b mb-6 dark:border-gray-700 border-gray-200">
              <View className="flex-row justify-between items-center my-4">
                <BaseText className="text-lg font-semibold">
                  {t("basic_info")}
                </BaseText>
                <Pressable onPress={handleEdit}>
                  <BaseIcon name="pencil" color="#4CA30D" />
                </Pressable>
              </View>

              <LabelDetail
                label={
                  cvDetail.auto_number ? t("auto_number") : t("first_name")
                }
                value={cvDetail.auto_number ?? cvDetail.first_name}
              />
              <LabelDetail
                label={
                  cvDetail.certificate_code
                    ? t("certificate_series")
                    : t("family_name")
                }
                value={cvDetail.certificate_code ?? cvDetail.last_name}
              />
              <LabelDetail
                label={
                  cvDetail.certificate_number
                    ? t("certificate_number")
                    : t("father_name")
                }
                value={cvDetail.certificate_number ?? cvDetail.father_name}
              />
              <LabelDetail
                label={
                  cvDetail.load_type?.length > 0 ? t("load_type") : t("age")
                }
                value={
                  cvDetail.load_type?.length > 0
                    ? cvDetail.load_type?.map((type: string) => t(type))
                    : FormatAge(cvDetail.birth_date)
                }
              />
              {cvDetail.trip_type ? (
                <LabelDetail
                  label={t("trip_type")}
                  value={t(cvDetail.trip_type)}
                />
              ) : (
                <LabelDetail label={t("country")} value={cvDetail.country} />
              )}
              <LabelDetail
                label={
                  cvDetail.auto_number && cvDetail.phone
                    ? t("phone_number")
                    : t("region")
                }
                value={
                  (cvDetail.auto_number && FormatPhone(cvDetail.phone)) ??
                  cvDetail.region
                }
              />

              {cvDetail.address && (
                <LabelDetail
                  label={t("home_address")}
                  value={cvDetail.address}
                />
              )}

              <View className="mb-4">
                <BaseText
                  variant="tertiary"
                  className="text-sm font-medium mb-1.5 capitalize"
                >
                  {t("files")}
                </BaseText>

                {cvDetail.files_mobile?.map((file: any, i: number) => (
                  <View
                    key={`${file} - ${i}`}
                    className="flex-row justify-between items-center p-1 rounded border my-2 dark:border-gray-700 border-gray-200"
                  >
                    <View className="flex-row gap-2 items-center">
                      <Image
                        className="w-10 h-10 rounded-sm"
                        source={{
                          uri: file,
                        }}
                      />
                      <BaseText
                        variant="tertiary"
                        className="text-xs font-medium uppercase"
                      >
                        {typeof file === "string"
                          ? file?.split("/")?.pop()
                          : `-`}
                      </BaseText>
                    </View>
                    {/* Need to fix */}
                    {/* <BaseFileDownload urlFile={file} /> */}
                  </View>
                ))}
              </View>
            </View>

            <View className="dark:border-gray-700 border-gray-200 border-b">
              <View className="flex-row justify-between items-center mb-4">
                <BaseText className="text-lg font-semibold">
                  {t("additional_info")}
                </BaseText>
              </View>

              <LabelDetail
                label={cvDetail.model ? t("model") : t("phone_number")}
                value={cvDetail.model ?? FormatPhone(cvDetail.phone)}
              />
              <LabelDetail
                label={cvDetail.vin ? t("vin") : t("email")}
                value={cvDetail.vin ?? cvDetail.email}
              />
              <LabelDetail
                label={
                  cvDetail.body_width && cvDetail.body_length
                    ? t("body_size")
                    : t("route")
                }
                value={
                  (cvDetail.body_width &&
                    cvDetail.body_length &&
                    cvDetail.body_height) ??
                  `${cvDetail.from_region} - ${cvDetail.to_region}`
                }
              />
              <LabelDetail
                label={
                  cvDetail.made_year
                    ? t("year_of_manufacture")
                    : t("driver_licence_category")
                }
                value={
                  cvDetail.made_year ??
                  cvDetail.driver_license_category?.join(", ")
                }
              />
              <LabelDetail
                label={cvDetail.capacity ? t("capacity") : t("work_experience")}
                value={
                  cvDetail.capacity
                    ? cvDetail.capacity + ` ${t("kg")}`
                    : FormatExperience(cvDetail.experience)
                }
              />
              {cvDetail.first_name && (
                <LabelDetail
                  label={t("payment_method")}
                  value={t(cvDetail.payment_methods?.join(", "))}
                />
              )}

              {cvDetail.status && (
                <>
                  <LabelDetail
                    label={t("type_of_transport")}
                    value={t(cvDetail.vehicle_type)}
                  />
                  <LabelDetail
                    label={t("fuel")}
                    value={t(cvDetail.fuel_type)}
                  />
                  <LabelDetail
                    label={t("power")}
                    value={cvDetail.power + ` ${t("hp")}`}
                  />
                  <LabelDetail
                    label={t("transmission_box")}
                    value={t(cvDetail.gearbox)}
                  />
                  <LabelDetail label={t("region")} value={cvDetail.region} />
                  <LabelDetail
                    label={t("route")}
                    value={`${cvDetail.from_region} - ${cvDetail.to_region}`}
                  />
                  <LabelDetail
                    label={t("payment_method")}
                    value={t(cvDetail.payment_methods?.join(", "))}
                  />
                </>
              )}
            </View>

            <View className="mb-12 pt-4">
              <BaseText className="text-sm font-semibold capitalize">
                {t("created")}{" "}
                {cvDetail.created_at ? FormatDate(cvDetail.created_at) : "-"}
              </BaseText>
            </View>
            <View className="pb-8">
              <Pressable
                onPress={() => setDeleteModal(true)}
                className="flex-row justify-center items-center border rounded-md p-3 border-red-500"
              >
                <BaseIcon
                  name="trash"
                  cn="dark:text-red-500 text-gray-900"
                  width={20}
                  height={20}
                />
                <Text className="text-sm font-semibold text-center mx-2 dark:text-gray-50">
                  {t("delete_cv")}
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <SkeletonProfileDetail />
        )}
        <Modal visible={deleteModal} transparent={true} animationType="fade">
          <View
            className="w-full items-center justify-center  flex-1 px-10"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="relative w-full items-center justify-center rounded-lg p-6 bg-white dark:bg-gray-800">
              <Pressable
                className="absolute right-6 top-6"
                onPress={() => setDeleteModal(false)}
              >
                <BaseIcon name="close" />
              </Pressable>
              <View className="rounded-full bg-gray-200	dark:bg-gray-600 p-4">
                <BaseIcon
                  name="exclamationCircle"
                  cn="dark:text-gray-300 text-gray-700"
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
                  isLoading={isLoad.cv}
                />
                <BaseButton
                  title={t("cancel")}
                  variant="secondary"
                  onPress={() => setDeleteModal(false)}
                  colored={true}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const LabelDetail = ({ label, value }: { label: string; value: any }) => (
  <View className="mb-6">
    <BaseText variant="tertiary" className="text-xs font-medium uppercase">
      {label ? label : "-"}
    </BaseText>
    <BaseText className="text-base font-medium uppercase">
      {value ? value : "-"}
    </BaseText>
  </View>
);
