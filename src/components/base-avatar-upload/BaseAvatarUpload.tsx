import { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BaseIcon from "~/icon/BaseIcon";
import BottomModal from "~/modals/BottomModal";
import { useProfile } from "-/profile.store";
import { BaseText } from "~/text/BaseText";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function BaseAvatarUpload({
  source = require("@/images/avatar.png"),
  title = useTranslation().t("upload"),
  deleteText = useTranslation().t("delete"),
  setValue,
  valName = "photo",
  type = "profile",
}: {
  source?: any;
  title?: string;
  deleteText?: string;
  setValue: any;
  valName?: string;
  type?: "profile" | "chat";
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const { deleteProfilePhoto, uploadPhotos } = useProfile();
  const { t } = useTranslation();

  const pickImage = async (mode?: string) => {
    let result: any = {};
    if (mode === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result?.canceled) {
      setImage(result?.assets[0].uri);
    }
  };

  const handleGallery = (mode?: string) => {
    pickImage(mode);
    setModalVisible(false);
  };

  const handleImageChange = async (item: any) => {
    const result: any = await uploadPhotos([item]);

    if (result) {
      if (type === "profile") {
        setValue("photo", result[0]);
      } else {
        setValue(result[0]);
      }
    } else {
      Alert.alert(t("something_wrong_upload"));
    }
  };

  const handleDelete = async () => {
    const match = source.uri?.match(/medias\/(.+)/);
    const id = match?.[1];
    setImage("");
    if (type === "profile") {
      setValue(valName, null);
    } else {
      setValue("");
    }
    if (!id) return;
    if (type === "profile") {
      deleteProfilePhoto(id);
    }
  };

  useEffect(() => {
    if (image) {
      handleImageChange(image);
    }
  }, [image]);

  return (
    <View className="w-full items-center">
      <View className="w-20 h-20 rounded-full items-center justify-center overflow-hidden">
        <Image
          source={image ? { uri: image } : source}
          className={image ? "w-full h-full" : "w-[80%] h-[80%]"}
        />
      </View>
      <View className="flex-row mt-5">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center"
        >
          <BaseIcon
            name="upload"
            width={20}
            height={20}
            cn="dark:text-gray-200 text-gray-700"
          />
          <BaseText className="ml-2 text-sm font-semibold dark:text-gray-50 text-gray-700">
            {title}
          </BaseText>
        </TouchableOpacity>
        {(typeof source === "object" || image) && (
          <TouchableOpacity
            onPress={handleDelete}
            className="flex-row items-center ml-10"
          >
            <BaseIcon
              name="trash"
              cn="dark:text-red-400 text-red-500"
              width={20}
              height={20}
            />
            <BaseText className="ml-2 text-sm font-semibold dark:text-red-400 text-red-500">
              {deleteText}
            </BaseText>
          </TouchableOpacity>
        )}
      </View>

      <BottomModal
        visible={modalVisible}
        height={220}
        onClose={() => setModalVisible(false)}
      >
        <>
          <BaseText className="text-lg font-semibold leading-7 pb-4 dark:text-white text-gray-900">
            {t("upload_vehicle_images")}
          </BaseText>
          <TouchableOpacity
            onPress={() => handleGallery("gallery")}
            className="px-4 py-3 rounded-md items-center my-2 flex-row justify-center dark:bg-slate-700 bg-gray-200"
          >
            <BaseIcon name="folderOpen" />
            <BaseText className="pl-2 text-sm font-semibold dark:text-white text-gray-900">
              {t("device_folder")}
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleGallery()}
            className="px-4 py-3 rounded-md items-center my-2 flex-row justify-center dark:bg-slate-700 bg-gray-200"
          >
            <BaseIcon name="camera" />
            <BaseText className="pl-2 text-sm font-semibold dark:text-white text-gray-900">
              {t("camera")}
            </BaseText>
          </TouchableOpacity>
        </>
      </BottomModal>
    </View>
  );
}
