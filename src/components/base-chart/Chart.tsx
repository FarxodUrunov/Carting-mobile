import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPie,
  VictoryTooltip,
} from "victory-native";
import { BaseText } from "~/text/BaseText";

interface ChartType {
  label?: string;
  type?: "area" | "pie";
  dataCharts: number[];
  categoriesChart?: string[];
  lineColor?: string;
  colorScale?: string[];
  rating?: number;
  percent?: number;
}

const BaseChart = (props: ChartType) => {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const {
    label,
    type = "area",
    dataCharts,
    categoriesChart,
    lineColor = "#1570EF",
    colorScale = ["#D0D5DD", "#12B76A"],
    rating = 0,
  } = props;

  return (
    <View>
      {label && (
        <BaseText className="font-medium leading-normal mb-1">{label}</BaseText>
      )}
      {type === "area" ? (
        <View className="dark:bg-gray-900 dark:border-gray-800 bg-gray-50 border-gray-200 relative border rounded-lg overflow-hidden">
          <VictoryChart>
            <View className="absolute top-0 left-0 right-0 bottom-0 w-full">
              <VictoryArea
                interpolation="natural"
                categories={{ x: categoriesChart ?? [] }}
                data={[0, ...dataCharts]}
                domain={{ y: [0, Math.max(...dataCharts, 10)] }}
                style={{
                  data: {
                    fill: lineColor,
                    fillOpacity: colorScheme === "dark" ? 0.2 : 0.05,
                    stroke: lineColor,
                    strokeWidth: 3,
                  },
                }}
              />
            </View>
            <VictoryAxis
              dependentAxis
              tickFormat={(tick: number) => tick}
              style={{
                axis: { stroke: "transparent" },
                grid: {
                  stroke: colorScheme === "dark" ? "#1D2939" : "#e1e1e1",
                },
                ticks: { stroke: "transparent" },
                tickLabels: {
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: colorScheme === "dark" ? "#ffffff" : "#344054",
                },
              }}
            />
            <VictoryAxis
              tickFormat={(tick: any) => tick}
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: {
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: colorScheme === "dark" ? "#ffffff" : "#344054",
                },
              }}
              domainPadding={25}
            />
          </VictoryChart>
        </View>
      ) : (
        <View className="dark:bg-gray-900 dark:border-gray-800 bg-gray-50 border-gray-200 relative border rounded-lg overflow-hidden items-center pb-4">
          <View className="absolute w-full flex-row items-center justify-start top-4 left-6">
            <View className="flex-row items-center mr-6">
              <View
                style={{ backgroundColor: colorScale[1] }}
                className="w-2 h-2 rounded-full mr-1 mt-0.5"
              />
              <BaseText className="capitalize">{t("success")}</BaseText>
            </View>
            <View className="flex-row items-center">
              <View
                style={{ backgroundColor: colorScale[0] }}
                className="w-2 h-2 rounded-full mr-1 mt-0.5"
              />
              <BaseText className="capitalize">{t("rejected")}</BaseText>
            </View>
          </View>
          <View
            className="absolute items-center top-1/2"
            style={{
              transform: [{ translateY: -40 }],
            }}
          >
            <BaseText
              className="text-center text-4xl font-semibold leading-10"
              variant="secondary"
            >
              {rating}
            </BaseText>
            <BaseText className="dark:text-gray-400 text-gray-500 text-center text-sm font-medium leading-tight uppercase">
              {t("rating")}
            </BaseText>
          </View>
          <VictoryPie
            padAngle={2}
            innerRadius={100}
            data={dataCharts}
            colorScale={colorScale}
            padding={{ top: 55, bottom: 70 }}
            style={{
              labels: {
                fill: "none",
              },
            }}
            labels={dataCharts}
            labelComponent={
              <VictoryTooltip
                center={{ x: 180, y: 30 }}
                pointerOrientation="bottom"
                flyoutWidth={100}
                flyoutHeight={50}
                pointerWidth={20}
                cornerRadius={10}
                flyoutStyle={{
                  stroke: "#D0D5DD",
                  strokeWidth: 1,
                  fill: "white",
                }}
                style={{ fill: "#000000" }}
                renderInPortal={false}
              />
            }
          />
          <View className="absolute flex-row items-center justify-start bottom-3 left-6">
            <View className="items-center mr-6">
              <BaseText className="dark:text-gray-400 text-gray-500 text-sm font-medium leading-tight uppercase">
                {t("success")}
              </BaseText>
              <Text className="text-2xl font-semibold leading-loose dark:text-gray-50 text-gray-900">
                {dataCharts[1]}
              </Text>
            </View>
            <View className="items-center">
              <BaseText className="dark:text-gray-400 text-gray-500 text-sm font-medium leading-tight uppercase">
                {t("rejected")}
              </BaseText>
              <Text className="text-2xl font-semibold leading-loose dark:text-gray-50 text-gray-900">
                {dataCharts[0]}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default BaseChart;
