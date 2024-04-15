import { View, Pressable, Alert, ScrollView } from "react-native";
import React, { useEffect } from "react";
import BaseIcon from "~/icon/BaseIcon";
import icons from "~/icon/icons";
import ActivityBar from "~/secondary/ActivityBar";
import { Stack } from "expo-router";
import { ActivitiesStore } from "-/activities.store";
import BaseChart from "~/base-chart/Chart";
import { BaseText } from "~/text/BaseText";
import SkeletonActivites from "~/secondary/skeletons/SkeletonActivities";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

type StatCardProps = {
  icon: keyof typeof icons;
  title: string;
  value: string;
  percentage: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <View className="p-4 rounded-lg border w-[48%] mb-4 dark:bg-gray-900 dark:border-gray-700 bg-white border-gray-200">
      <View>
        <BaseText
          className="text-xs font-semibold uppercase"
          variant="tertiary"
        >
          {title}
        </BaseText>
        <BaseText className="text-2xl font-semibold">{value}</BaseText>
      </View>
    </View>
  );
}

export default function ActivitiesScreen() {
  const { colorScheme } = useColorScheme();
  const { getStats, counts, orders, stats, activities, isLoading } =
    ActivitiesStore();
  const { t } = useTranslation();
  const months = [
    t("jan"),
    t("feb"),
    t("mar"),
    t("apr"),
    t("may"),
    t("jun"),
    t("jul"),
    t("aug"),
    t("sep"),
    t("oct"),
    t("nov"),
    t("dec"),
  ];

  const statItems: any = [
    {
      id: 1,
      icon: "arrowUp",
      title: t("icome"),
      value: counts?.order_price ?? 0,
    },
    {
      id: 2,
      icon: "arrowDown",
      title: t("orders"),
      value: counts?.total_orders ?? 0,
    },
    {
      id: 3,
      icon: "arrowDown",
      title: t("active_time"),
      value: counts?.total_hours ?? 0,
    },
    {
      id: 4,
      icon: "arrowUp",
      title: t("cars"),
      value: counts?.total_vehicle ?? 0,
    },
  ];

  useEffect(() => {
    getStats();
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack.Screen
        options={{
          headerBackTitle: "Home",
          headerTitle: t("activities"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
          headerRight: () => (
            <Pressable onPress={() => Alert.alert(t("link_copied"))}>
              <BaseIcon name="share" />
            </Pressable>
          ),
        }}
      />
      {isLoading ? (
        <SkeletonActivites />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-5"
        >
          <View className="mt-2 mb-4">
            <ActivityBar
              current={activities?.activities ?? 0}
              total={100}
              title={t("your_activity")}
            />
          </View>
          <View className="flex-row justify-between flex-1 flex-wrap">
            {statItems.map((item: any) => (
              <StatCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                value={item.value}
                percentage={item.percentage}
              />
            ))}
          </View>
          <View style={{ gap: 16 }} className="pb-4">
            <BaseChart
              label={t("line_graph")}
              dataCharts={stats.map((item) => item.completed)}
              categoriesChart={stats.map((el) => months[el.month - 1])}
            />
            <BaseChart
              label={t("pie_chart")}
              dataCharts={[orders?.completed ?? 0, orders?.rejected ?? 0]}
              type="pie"
              rating={(orders?.completed ?? 0) + (orders?.rejected ?? 0)}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
