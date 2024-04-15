import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BaseIcon from "~/icon/BaseIcon";
import BottomModal from "~/modals/BottomModal";
import { useMediaStore } from "-/media.store";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

const BaseFileUpload = ({
  multiSelect = false,
  onSetImageData,
  variant = "photo",
  label,
  title = "",
  value = [],
  error = false,
}: {
  multiSelect?: boolean;
  variant?: "photo" | "document";
  label?: string;
  title?: string;
  onSetImageData: (url: string[]) => void;
  value: string[];
  error?: boolean;
}) => {
  let { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const valueData = useMemo(() => {
    const data = value?.map((item) => {
      const id = item?.split("/")?.pop();
      return { id: id || "", url: item };
    });
    if (data) {
      return data;
    }
    return [];
  }, [value]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<{ id: string; url: string }[]>(valueData);
  const { media, uploadPhotos, deleteMedia, isLoading, isLoadingDelete } =
    useMediaStore();
  const pickImage = async (mode?: string) => {
    let options: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: !multiSelect,
      aspect: [4, 3],
      quality: 1,
    };
    if (mode === "gallery") {
      options = {
        ...options,
        allowsMultipleSelection: multiSelect,
        selectionLimit: multiSelect ? 5 : 1,
      };
    } else {
      options = {
        ...options,
        selectionLimit: 5,
        cameraType: ImagePicker.CameraType.front,
      };
    }
    const result = await (mode === "gallery"
      ? ImagePicker.launchImageLibraryAsync(options)
      : ImagePicker.launchCameraAsync(options));
    if (!result?.canceled) {
      const image = result?.assets.map(({ uri }) => uri);
      uploadPhotos("photos", image).then((res: string[]) => {
        handleUploadMedia(res);
      });
    }
  };
  function handleUploadMedia(medias: string[]) {
    if (medias.length > 0) {
      const newMedia = medias.map((item) => {
        const id = item?.split("/")?.pop();
        return { id: id || "", url: item };
      });
      setImage((prevImages) => [...prevImages, ...newMedia]);
    }
  }
  useEffect(() => {
    onSetImageData(image.map(({ url }) => url));
  }, [image]);
  const handleDelete = useCallback(
    (id: string) => {
      deleteMedia(id);
      setImage((currentImages) =>
        currentImages.filter((item) => item.id !== id)
      );
    },
    [deleteMedia]
  );
  const handleGallery = (mode?: string) => {
    pickImage(mode);
    setModalVisible(false);
  };
  // console.log("image component render bo'ldi");

  return (
    <View className="w-full rounded-lg">
      <Text
        className={`mb-1 text-sm font-medium ${
          colorScheme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
      <View style={{ gap: 10 }} className="flex-row flex-wrap mb-2">
        {image &&
          image.length > 0 &&
          image.map((item, i) =>
            variant === "photo" ? (
              <View key={`${item}-${i}`} className="relative w-[22.6%] h-20">
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  className="absolute -bottom-1 -right-1 z-10 w-6 h-6 items-center justify-center bg-white border border-gray-200 rounded-full"
                >
                  <BaseIcon
                    name="trash"
                    cn="text-red-500"
                    height={18}
                    width={18}
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: item.url }}
                  className="w-full h-full rounded"
                />
              </View>
            ) : (
              <View
                key={`${item.id}-${i}`}
                className={`w-full h-12 px-1 flex-row border rounded items-center justify-between ${
                  colorScheme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.url }}
                    className="w-10 h-10 rounded"
                  />
                  <Text
                    className={`text-base ml-2 ${
                      colorScheme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.url.length > 25 ? item.url.slice(-25) : item.url}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  className="mr-2"
                >
                  <BaseIcon name="trash" cn="text-red-500/70" />
                </TouchableOpacity>
              </View>
            )
          )}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          {
            borderRadius: 8,
            borderWidth: 2,
            borderColor: error ? "rgba(239,68,68,0.7)" : "#2E90FA",
            borderStyle: "dashed",
          },
        ]}
        className="flex-row items-center justify-center w-full h-12"
      >
        {isLoadingDelete || isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              colorScheme === "dark"
                ? error
                  ? "rgba(239,68,68,0.7)"
                  : "#2E90FA"
                : "#2E90FA"
            }
            className={`absolute`}
          />
        ) : (
          <>
            <BaseIcon
              name="upload"
              color={error ? "rgba(239,68,68,0.7)" : "#2E90FA"}
            />
            <Text
              className={`ml-3 text-base ${
                error
                  ? "text-red-500/70"
                  : colorScheme === "dark"
                  ? "text-gray-300"
                  : "text-gray-700"
              } `}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "rgba(239,68,68,0.7)" }} className="mt-0.5">
          {t("required")}
        </Text>
      )}
      <BottomModal
        visible={modalVisible}
        height={220}
        onClose={() => setModalVisible(false)}
      >
        <>
          <Text
            className={`text-lg font-semibold leading-7 pb-4 ${
              colorScheme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t("upload_vehicle_images")}
          </Text>
          <TouchableOpacity
            onPress={() => handleGallery("gallery")}
            className={`px-4 py-3 rounded-md items-center my-2 flex-row justify-center ${
              colorScheme === "dark" ? "bg-slate-700" : "bg-gray-200"
            }`}
          >
            <BaseIcon name="folderOpen" />
            <Text
              className={`
          pl-2  text-sm font-semibold ${
            colorScheme === "dark" ? "text-white" : "text-gray-900"
          }
          `}
            >
              {t("device_folder")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleGallery()}
            className={`px-4 py-3  rounded-md items-center my-2 flex-row justify-center ${
              colorScheme === "dark" ? "bg-slate-700" : "bg-gray-200"
            }`}
          >
            <BaseIcon name="camera" />
            <Text
              className={`
          pl-2  text-sm font-semibold ${
            colorScheme === "dark" ? "text-white" : "text-gray-900"
          }
          `}
            >
              {t("camera")}
            </Text>
          </TouchableOpacity>
        </>
      </BottomModal>
    </View>
  );
};
export default BaseFileUpload;
