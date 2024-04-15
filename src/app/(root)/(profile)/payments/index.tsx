import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import EmptyScreen from "~/secondary/EmptyScreen";
import { BaseText } from "~/text/BaseText";
import { usePayment } from "-/payment.store";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { FormatDate } from "~/FormatDate";
import { useTranslation } from "react-i18next";

const statusIcon = {
  success: {
    name: "checkDone",
    dark: "text-lime-500",
    light: "text-lime-600",
  },
  pending: {
    name: "pendingIcon",
    dark: "text-red-400",
    light: "text-red-500",
  },
  failed: {
    name: "checkFailed",
    dark: "text-red-400",
    light: "text-red-500",
  },
} as const;

export default function ProfilePaymentsScreens() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getInOutCome();
    await getTransactions();
    await getPayments();
    setRefreshing(false);
  }, []);
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const {
    payments,
    getPayments,
    inOutCome,
    getInOutCome,
    transactions,
    getTransactions,
    isLoad,
  } = usePayment();

  useEffect(() => {
    getInOutCome();
    getTransactions();
    getPayments();
  }, []);

  return isLoad.paymentsLoading ? (
    <>{/* Skeleton */}</>
  ) : (
    <View className="flex-1 px-4 py-3 bg-white dark:bg-gray-900">
      <Stack.Screen
        options={{
          headerTitle: t("payments"),
          headerBackTitle: t("profile"),
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
          headerRight: () =>
            payments.length === 0 ? (
              <Pressable
                className="flex-row  items-center justify-center"
                onPress={() => router.push("/payments/add")}
              >
                <BaseIcon
                  name="plus"
                  width={15}
                  height={15}
                  cn="dark:text-lime-500 text-lime-600"
                />
                <Text className="ml-2 dark:text-lime-500 text-lime-600">
                  {t("add_new")}
                </Text>
              </Pressable>
            ) : null,
        }}
      />
      {payments?.length === 0 && transactions?.length === 0 ? (
        <EmptyScreen title="payment_transaction_not_found" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {payments?.map((payment) => (
              <Pressable
                key={payment.id}
                className="dark:border border-0 dark:border-gray-600 w-80 h-180 py-5 px-6 mr-4 rounded-xl active:border-2 active:border-lime-500 bg-gray-900 justify-between"
              >
                <View className="flex-row justify-between">
                  <View>
                    <Text className="opacity-50 text-gray-100 text-sm font-normal">
                      {t("current_balance")}
                    </Text>
                    <Text className="text-white text-2xl font-semibold">
                      {payment.balance} {payment.currency}
                    </Text>
                  </View>
                  <Image
                    source={require("@/images/mastercard.png")}
                    className="w-w45 h-9 "
                  />
                </View>
                <View className="flex-row justify-between">
                  <View>
                    <Text className="opacity-90 text-white text-sm font-medium">
                      {payment.name}
                    </Text>
                    <Text className="opacity-90 text-white text-sm font-medium">
                      {payment.card_number.replace(/(\d{4})/g, "$1 ").trim()}
                    </Text>
                  </View>
                  <View className="justify-end">
                    <Text className="text-white text-sm font-medium">
                      {payment.expire_date}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <View className="flex-row my-6">
            <View className="flex-1 p-4 mr-2 rounded-lg border justify-between dark:bg-gray-900	bg-gray-50  dark:border-gray-600 border-gray-200">
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-semibold uppercase"
                >
                  {t("incomes")}
                </BaseText>
                <BaseText className="text-2xl font-semibold">
                  {inOutCome.income?.balance ?? 0} {inOutCome.income?.currency}
                </BaseText>
              </View>
            </View>
            <View className="flex-1 p-4 mr-2 rounded-lg border justify-between dark:bg-gray-900	bg-gray-50 dark:border-gray-600 border-gray-200">
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-semibold uppercase"
                >
                  {t("outcomes")}
                </BaseText>
                <BaseText className="text-2xl font-semibold">
                  {inOutCome.outgoing?.balance ?? 0}
                  {inOutCome.outgoing?.currency}
                </BaseText>
              </View>
            </View>
          </View>
          {transactions?.map((transaction) => (
            <View key={transaction.id} className="mb-4">
              <BaseText variant="tertiary" className="text-base font-semibold ">
                {FormatDate(transaction.created_at)}
              </BaseText>
              <View className="flex-row justify-between items-center py-4 border-b dark:border-gray-700 border-gray-200">
                <View>
                  <BaseText variant="secondary" className="text-sm font-normal">
                    {transaction.payer.name}
                  </BaseText>
                  <BaseText className="text-base font-semibold mt-1">
                    {transaction.price.toLocaleString()}{" "}
                    {transaction.payment_method}
                  </BaseText>
                </View>
                <BaseIcon
                  name={statusIcon[transaction.status].name}
                  cn={
                    colorScheme === "dark"
                      ? statusIcon[transaction.status].dark
                      : statusIcon[transaction.status].light
                  }
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
