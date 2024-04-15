import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BaseAvatar from "~/base-avatar/BaseAvatar";
import BaseIcon from "~/icon/BaseIcon";
import icons from "~/icon/icons";
import SafeAreaView from "~/safe-area/SafeAreaView";

export default function BaseSelect({
  icon = { right: "chevronDown" },
  title,
  value,
  onSelected,
  placeholder,
  label,
  options,
  success,
  error,
  errorMessage,
  fieldNames = {
    key: "id",
    label: "value",
    sub_title: "subTitle",
    img: "avatar",
  },
  variant = "simple",
}: {
  title?: string;
  value?: any;
  onSelected: (item: any) => void;
  placeholder?: string;
  label?: string;
  options?: any[];
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  fieldNames?: { key: string; label: string; sub_title?: string; img?: string };
  icon?: { [key: string]: keyof typeof icons };
  variant?: "simple" | "picture";
}) {
  const [modalShow, setModalShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  const valueInput = useMemo(() => {
    const selectedItem = options?.find(
      (el) => String(el?.[fieldNames?.key]) == value
    );
    if (selectedItem) {
      return selectedItem?.[fieldNames?.label];
    }
    return "";
  }, [value]);

  const pictureData = useMemo(() => {
    return options?.find((el) => String(el?.[fieldNames?.key]) == value);
  }, [value]);
  const borderColor = useMemo(() => {
    if (error) return "border-red-500/70";
    // if (success && clicked) return "border-lime-500/70";
    return;
  }, [error, success, clicked]);

  const isIcon = useMemo(() => {
    if (icon?.left) return "pl-3 pr-3";
    if (icon?.right) return "pr-3 pl-3";
    return "px-3";
  }, [icon]);

  const styledClasses = useMemo(() => {
    return [
      `w-full border py-2 rounded-md text-gray-700 ${
        error ? borderColor : `dark:border-gray-700 border-gray-300`
      }`,
      ,
      isIcon,
    ].join(" ");
  }, [borderColor, isIcon]);

  const handleSelected = (item: any) => {
    onSelected(item);
    setModalShow(false);
    setClicked(true);
  };

  return (
    <View>
      {label && (
        <Text className="font-medium mb-1 capitalize dark:text-white text-gray-700">
          {label}
        </Text>
      )}
      <TouchableOpacity
        className="!my-0 !py-0 relative"
        activeOpacity={0.5}
        onPress={() => setModalShow(true)}
      >
        <View
          className={`${styledClasses} flex-row  items-center justify-between`}
        >
          <View className="flex-row">
            {icon?.left && (
              <View className="mr-3">
                <BaseIcon name={icon.left} color="#D0D7DE" />
              </View>
            )}
            {variant === "simple" ? (
              <Text
                className={
                  valueInput
                    ? "dark:text-gray-100 mt-0.5 text-gray-700"
                    : "dark:text-gray-500 mt-0.5 text-gray-400"
                }
              >
                {valueInput ? valueInput : placeholder}
              </Text>
            ) : value ? (
              <View className="flex-row justify-between items-center">
                <BaseAvatar
                  variant="square"
                  source={{
                    uri: pictureData?.[fieldNames?.img || "avatar"],
                  }}
                />
                <View className="ml-4">
                  <Text className="text-lg font-semibold dark:text-gray-50 text-gray-900">
                    {pictureData?.[fieldNames?.label]}
                  </Text>
                  <Text className="text-sm dark:text-gray-50 text-gray-900">
                    {pictureData?.[fieldNames?.sub_title || "subTitle"]}
                  </Text>
                </View>
              </View>
            ) : (
              <Text className="dark:text-gray-500 mt-0.5 text-gray-400">
                {placeholder}
              </Text>
            )}
          </View>

          {icon?.right && (
            <View className="">
              <BaseIcon name={icon.right} color="#D0D7DE" />
            </View>
          )}
        </View>
      </TouchableOpacity>
      {error && <Text className="text-red-500/70">{errorMessage}</Text>}
      <Modal
        animationType="slide"
        visible={modalShow}
        onRequestClose={() => setModalShow(false)}
      >
        <SafeAreaView className="dark:bg-gray-900">
          <View className="h-full p-5 dark:bg-gray-900 bg-neutral-50">
            <View className="pb-4 flex-row items-center">
              <Pressable onPress={() => setModalShow(false)}>
                <BaseIcon name="arrowLeft" color="#D0D7DE" />
              </Pressable>
              <Text className="ml-10 text-lg font-semibold leading-7 dark:text-white text-gray-900">
                {title}
              </Text>
            </View>
            <FlatList
              data={options}
              inverted={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item?.[fieldNames?.key]}
              renderItem={({ item }) => (
                <View className="px-4 my-1">
                  <TouchableOpacity onPress={() => handleSelected(item)}>
                    {variant === "picture" ? (
                      <View className="flex-row items-center border-b py-2.5 dark:border-gray-600 border-gray-300">
                        <BaseAvatar
                          variant="square"
                          source={{
                            uri: item?.[fieldNames?.img || "avatar"],
                          }}
                        />
                        <View className="ml-4">
                          <Text className="text-lg font-semibold dark:text-gray-50 text-gray-900">
                            {item?.[fieldNames?.label]}
                          </Text>
                          <Text className="text-sm dark:text-gray-50 text-gray-900">
                            {item?.[fieldNames?.sub_title || "subTitle"]}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View className="border-b py-2.5 dark:border-gray-600 border-gray-300">
                        <Text className="dark:text-white text-gray-900">
                          {item?.[fieldNames?.label]}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
