import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import BottomModal from "~/modals/BottomModal";
import BaseCheckbox from "~/base-checkbox/BaseCheckbox";
import { useLoadStore } from "-/load.store";
import { useAnnouncementStore } from "-/announcement.store";
import { useTranslation } from "react-i18next";
import { useProposalStore } from "-/proposals.store";
import { useSearchStore } from "-/search.store";
import { useRouter } from "expo-router";

export default function CancelModal({
  cancelModal,
  setCancelModal,
  cancelModalText,
  loadId,
  isVacancy = false,
  isProposal = false,
  isReject = false,
}: {
  cancelModal: boolean;
  setCancelModal: any;
  cancelModalText: string[];
  loadId: string | number | undefined;
  isVacancy?: boolean;
  isProposal?: boolean;
  isReject?: boolean;
}) {
  const { t } = useTranslation();
  const { cancelDriverProposal, getLoads } = useLoadStore();
  const { cancelDriverVacancy, getAnnouncements } = useAnnouncementStore();
  const { filterLoadValue, filterAnnouncementValue, searchValue } =
    useSearchStore();
  const { updateStopStatus, handleRejectProposal } = useProposalStore();
  const [option, setOption] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const [modalHeight, setModalHeight] = useState(280);
  Keyboard.addListener("keyboardDidHide", () => setModalHeight(360));
  Keyboard.addListener("keyboardDidShow", (e) => {
    setModalHeight(modalHeight + Number(e.endCoordinates.height - 25));
  });

  const router = useRouter();
  async function handleClick() {
    if (isProposal) {
      await updateStopStatus({ message, status: "stopped" });
    }
    if (loadId) {
      if (isVacancy) {
        await cancelDriverVacancy({ id: +loadId, message });
      } else if (isProposal) {
        const res = await cancelDriverVacancy({ id: +loadId, message });
        if (res.status === 200) {
          Alert.alert(t("successfully_canceled"));
          getAnnouncements({
            filter: {
              vacancies: filterAnnouncementValue,
              search: { value: searchValue },
            },
          });
        }
      } else if (isReject) {
        await handleRejectProposal({ id: +loadId, message });
      } else {
        const res = await cancelDriverProposal({ id: +loadId });
        if (res.status === 200) {
          Alert.alert(t("successfully_canceled"));
          getLoads({
            filter: { loads: filterLoadValue, search: { value: searchValue } },
          });
        }
      }

      setCancelModal(false);
      setOption(0);
      setMessage("");
    }
  }

  function handleSelectOption(index: number) {
    if (option === index + 1) {
      setOption(0);
      setMessage("");
    } else {
      setOption(index + 1);
      setMessage(cancelModalText[index]);
    }
  }

  return (
    <BottomModal
      visible={cancelModal}
      height={modalHeight}
      onClose={() => setCancelModal(false)}
    >
      <View>
        <View className="flex-row justify-start items-center">
          <Text className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
            {t("reason_for_rejection")}
          </Text>
        </View>
        <View className="mb-8">
          <View className="py-2">
            {cancelModalText.map((item: string, index: number) => (
              <View className="py-2" key={index}>
                <BaseCheckbox
                  toggleChecked={() => handleSelectOption(index)}
                  isChecked={option == index + 1}
                >
                  <Text className="text-sm font-medium text-gray-700 dark:text-white capitalize">
                    {cancelModalText[index]}
                  </Text>
                </BaseCheckbox>
              </View>
            ))}
          </View>
          {option === 0 ? (
            <View>
              <TextInput
                className="w-full border border-gray-500 rounded-md p-2 text-white"
                onChange={(e) => setMessage(e.nativeEvent.text)}
                placeholder={t("some_notes")}
              />
            </View>
          ) : null}
        </View>
        <Pressable
          onPress={() => handleClick()}
          className={`w-full px-4 py-3 bg-lime-600 rounded-md justify-center items-center ${
            isProposal ? "bg-red-500" : ""
          }`}
        >
          {isProposal ? (
            <Text className="text-sm font-medium text-white">{t("stop")}</Text>
          ) : (
            <Text className="text-sm font-medium text-white">{t("send")}</Text>
          )}
        </Pressable>
      </View>
    </BottomModal>
  );
}
