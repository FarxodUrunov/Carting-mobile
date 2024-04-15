import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BaseBadge from "~/badge/BaseBadge";
import BaseIcon from "~/icon/BaseIcon";
import BaseCheckbox from "~/base-checkbox/BaseCheckbox";
import icons from "~/icon/icons";
import { BaseButton } from "~/button/BaseButton";
import { Label } from "~/label/BaseLabel";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import SafeAreaView from "~/safe-area/SafeAreaView";

interface OptionsType {
  id: string;
  value: string;
  selected?: boolean;
}

export default function MultiSelect({
  size = "sm",
  icon = { right: "chevronDown" },
  title,
  value,
  onSelected,
  placeholder = "Select",
  label,
  options,
  success,
  error,
  errorMessage,
  fieldNames = { key: "id", label: "value" },
  buttonText = "show_selected",
  variant = "external",
}: {
  size?: "sm" | "md" | "lg";
  icon?: { [key: string]: keyof typeof icons };
  title?: string;
  value?: string[] | any;
  onSelected: (item: string[]) => void;
  placeholder?: string;
  label?: string;
  options?: OptionsType[] | any[];
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  fieldNames?: { key: string; label: string };
  buttonText?: string;
  variant?: "internal" | "external";
}) {
  let { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const valSelect = useMemo(() => {
    const newData = options?.map((item) => {
      if (value?.includes(item.id)) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
          selected: !!item.selected,
        };
      }
    });
    return newData?.filter((el) => value?.includes(el.id));
  }, [value]);

  const valData = useMemo(() => {
    const newData = options?.map((item) => {
      if (value?.includes(item.id)) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
          selected: !!item.selected,
        };
      }
    });
    return newData;
  }, [value]);

  useEffect(() => {
    const newData = options?.map((item) => {
      if (value?.includes(item.id)) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
          selected: !!item.selected,
        };
      }
    });
    setData(newData);
    setSelectData(newData?.filter((el) => value?.includes(el.id)));
  }, [value]);

  const [modalShow, setModalShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<OptionsType[] | undefined>(valData);
  const [selectData, setSelectData] = useState<OptionsType[] | undefined>(
    valSelect
  );

  const borderColor = useMemo(() => {
    if (error) return "border-red-500/70";
    // if (success && clicked)
    //   return colorScheme === "dark" ? "border-lime-400" : "border-lime-500/70";
    return colorScheme === "dark" ? "border-gray-600" : "border-gray-300";
  }, [error, success, clicked]);

  const isIcon = useMemo(() => {
    if (icon?.left) return "pl-10 pr-3";
    if (icon?.right) return "pr-3 pl-3";
    return "px-3";
  }, [icon]);

  const sizeStyle = useMemo(() => {
    if (size === "sm") return "h-11 text-sm";
    if (size === "md") return "h-11 text-base";
  }, [size]);

  const styledClasses = useMemo(() => {
    return [
      `w-full border py-2.5 rounded-md`,
      borderColor,
      sizeStyle,
      isIcon,
    ].join(" ");
  }, [borderColor, isIcon]);

  const handleChecked = (itemSelected: any) => {
    const newData = data?.map((item: any) => {
      if (item.id === itemSelected.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return {
        ...item,
        selected: !!item.selected,
      };
    });
    setData(newData);
  };

  const handleSelected = () => {
    const listSelected = data?.filter((item: any) => item.selected === true);
    const listData = listSelected?.map((el) => el.id);
    setSelectData(listSelected);
    setModalShow(false);
    setClicked(true);
    onSelected(listData ? listData : []);
  };

  const handleDeleteItem = (id: string) => {
    setSelectData((val) => {
      return val?.filter((item) => item.id !== id);
    });
    setData((val: any) => {
      return val?.map((item: any) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
    });
    const listData = selectData?.map((el) => el.id);
    onSelected(listData ? listData?.filter((el) => el !== id) : []);
  };

  const selectValueLength = (data: OptionsType[] | undefined) => {
    const str = data
      ?.map((item) => item?.[fieldNames.label as keyof typeof item])
      .join(", ");
    if (str) {
      return str?.length > 38 ? `${str.slice(0, 38)}...` : str;
    }
  };

  return (
    <View>
      {label && (
        <Label
          htmlFor="keywords"
          className={`font-medium mb-1 ${
            size === "sm" ? "text-sm" : "text-base"
          } ${colorScheme === "dark" ? "text-white" : "text-gray-700"}`}
        >
          {label}
        </Label>
      )}
      <TouchableOpacity onPress={() => setModalShow(true)}>
        <View className={styledClasses}>
          <Text
            className={
              colorScheme === "dark" ? "text-gray-500" : "text-gray-400"
            }
          >
            {variant === "internal"
              ? selectValueLength(selectData)?.length
                ? selectValueLength(selectData)
                : placeholder
              : placeholder}
          </Text>
        </View>
        {icon && (
          <View>
            {icon.right && (
              <View className="absolute -top-9 right-3">
                <BaseIcon name={icon.right} color="#D0D7DE" />
              </View>
            )}
            {icon.left && (
              <View className="absolute -top-9 left-3">
                <BaseIcon name={icon.left} color="#D0D7DE" />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
      {error && <Text className="text-red-500/70">{errorMessage}</Text>}
      {variant === "external" && (
        <View style={{ gap: 6 }} className="flex-row flex-wrap my-1">
          {selectData?.map((item: any) => (
            <View key={item?.id}>
              <BaseBadge
                cn={`rounded-full items-center`}
                text={t(`${item?.[fieldNames.label]}`)}
              >
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                  <BaseIcon
                    cn={`mt-0.5 ${
                      colorScheme === "dark" ? "text-gray-50" : "text-gray-700"
                    }`}
                    name="xMark"
                  />
                </TouchableOpacity>
              </BaseBadge>
            </View>
          ))}
        </View>
      )}
      <Modal
        animationType="slide"
        visible={modalShow}
        onRequestClose={() => setModalShow(false)}
      >
        <SafeAreaView className="dark:bg-gray-900">
          <View
            className={`h-full px-5 pt-5 ${
              colorScheme === "dark" ? "bg-gray-900" : "bg-neutral-50"
            }`}
          >
            <View className="flex-row items-center mb-2">
              <Pressable onPress={handleSelected}>
                <BaseIcon name="arrowLeft" />
              </Pressable>
              <Text
                className={`ml-10 text-lg font-semibold leading-7 capitalize ${
                  colorScheme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </Text>
            </View>
            <FlatList
              data={data}
              inverted={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }: any) => (
                <View className="px-4 my-1">
                  <View
                    className={`border-b py-2.5 ${
                      colorScheme === "dark"
                        ? "border-gray-600"
                        : "border-gray-300"
                    }`}
                  >
                    <BaseCheckbox
                      toggleChecked={() => handleChecked(item)}
                      isChecked={item?.selected || false}
                    >
                      <BaseText>{t(item?.[fieldNames.label])}</BaseText>
                    </BaseCheckbox>
                  </View>
                </View>
              )}
            />
            <View className="my-1">
              <BaseButton onPress={handleSelected} title={`${t(buttonText)}`} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
