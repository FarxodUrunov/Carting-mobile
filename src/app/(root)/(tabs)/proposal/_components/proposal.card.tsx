import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import BaseRating from "~/rating/BaseRating";
import BaseIcon from "~/icon/BaseIcon";
import BaseTab from "~/base-tab/BaseTab";
import Skeleton from "~/skeleton";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

const orderData: any = [];
export default function ProposalsScreen() {
  const [data, setData] = useState([1]);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const router = useRouter();
  return (
    <CustomSafeAreaView className="px-5 py-4">
      <View className=" flex-row justify-center items-center relative py-2">
        <Text className="text-gray-900 text-lg font-semibold">Proposals</Text>
        <TouchableOpacity className="absolute right-5">
          <BaseIcon name="adjustments" />
        </TouchableOpacity>
      </View>
      <BaseTab
        items={[
          {
            id: 1,
            name: "Active",
            children: !isLoading ? (
              <ActiveComponent data={data} router={router} />
            ) : (
              <GeneralSkeleton status="active" />
            ),
          },
          {
            id: 2,
            name: "Waiting",
            children: !isLoading ? (
              <WaitingComponent />
            ) : (
              <GeneralSkeleton status="waiting" />
            ),
          },
          {
            id: 3,
            name: "Archive",
            children: !isLoading ? (
              <WaitingComponent />
            ) : (
              <GeneralSkeleton status="waiting" />
            ),
          },
        ]}
      />
    </CustomSafeAreaView>
  );
}

const ActiveComponent = ({ data, router }: { data: any; router: any }) =>
  data.length ? (
    <ScrollView
      className="bg-neutral-50 mb-36"
      showsVerticalScrollIndicator={false}
    >
      <View className="my-4 py-4 px-3 bg-gray-100 rounded-md">
        <View className="px-2 py-1 bg-gray-200 rounded">
          <Text className="text-lime-600 text-sm font-normal">Ongoing</Text>
        </View>
        <View className="my-4">
          <Text className="text-gray-900 text-base font-semibold">
            Экспорт томатной продукции
          </Text>
          <Text className="text-gray-900 text-xl font-bold">
            28 000 000 uzs
          </Text>
        </View>
        <View className="relative">
          <View className="w-[52px] h-[1px] bg-gray-300 rotate-90 absolute top-[46px] -left-[14px]" />
          <View className="flex-row mb-3">
            <View className="mr-2">
              <BaseIcon name="circleBordered" cn="text-blue-500" />
            </View>
            <View>
              <Text className="text-gray-900 text-base font-medium">
                УЗБ, Ташкент
              </Text>
              <Text className="text-gray-500 text-sm font-normal">
                12 сен, 12:48 - 15:39
              </Text>
            </View>
          </View>
          <View className="flex-row mt-3">
            <View className="mr-2">
              <BaseIcon name="circleBordered" cn="text-lime-500" />
            </View>
            <View>
              <Text className="text-gray-900 text-base font-medium">
                РОС, Москва
              </Text>
              <Text className="text-gray-500 text-sm font-normal">
                12 сен, 12:48 - 15:39
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(root)/liveTracking")}
          className="my-4 w-full h-36 bg-gray-200 rounded-md justify-center items-center"
        >
          <Text>Map</Text>
        </TouchableOpacity>
        <View className="p-4 bg-gray-900 bg-opacity-80 rounded-lg items-center">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-gray-300 text-sm font-medium">
              Yetkazib borish jarayoni
            </Text>
            <Text className="text-gray-300 text-sm font-normal">40%</Text>
          </View>
          <View className="pt-4">
            <Text>Progress bar</Text>
            {/* <BaseProgressBar total={2} /> */}
          </View>
          <Text className="text-lime-600 text-sm font-semibold">
            YUK ORTISH
          </Text>
          <Text className="text-gray-200 text-xs font-medium">
            Qo’qon, Yangi bozor
          </Text>
          <Text className="text-gray-400 text-xs font-medium">
            Sep 03, 8:02
          </Text>
        </View>
        <View className="h-12 bg-white rounded-lg border border-gray-300 my-2 p-2 flex-row justify-center items-center relative">
          <TouchableOpacity className="absolute left-0 w-14 h-11 bg-lime-600 rounded-md justify-center items-center">
            <BaseIcon name="arrowRight" cn="text-white" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-sm font-semibold">
            Pickup load
          </Text>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View className="bg-neutral-50 flex-1 justify-center items-center">
      <Image source={require("@/images/no-data.png")} className="w-20 h-20" />
      <Text className="text-center text-gray-900 text-base font-medium ">
        Active proposals not found
      </Text>
    </View>
  );

const WaitingComponent = () => (
  <View className="bg-neutral-50">
    <FlatList
      showsVerticalScrollIndicator={false}
      data={orderData}
      className="mb-36"
      renderItem={({ item }) => (
        <View
          className={`my-2 bg-gray-100 rounded-md py-4 px-3 border-l-4 ${
            item.status === `gray`
              ? `border-gray-500`
              : item.status === `green`
              ? `border-lime-600`
              : `border-red-500`
          }`}
        >
          <View className="mb-2">
            {item.rate > 0 && <BaseRating rating={4} />}
          </View>
          <View className="mb-4">
            <Text className="text-gray-900 font-semibold">{item.title}</Text>
            <Text className="text-gray-900 text-xl font-bold mt-2">
              {item.price.toLocaleString()} {item.currency}
            </Text>
          </View>
          <View className="relative">
            <View className="w-10 h-[1px] bg-gray-300 rotate-90 absolute top-11 -left-2 -z-10" />
            <View className="flex-row">
              <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
              <View className="ml-2">
                <Text className="text-gray-900 font-medium ">
                  {item.pickup_address}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.pickup_time_from} - {item.pickup_time_to}
                </Text>
              </View>
            </View>
            <View className="flex-row mt-6">
              <View className="w-6 h-6 border-[5px] rounded-full border-lime-500" />
              <View className="ml-2">
                <Text className="text-gray-900 font-medium ">
                  {item.delivery_address}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.delivery_time}{" "}
                </Text>
              </View>
            </View>
          </View>
          <View className="my-4 flex-row">
            <View className="py-1 rounded px-2 bg-gray-200">
              <Text className="text-gray-700 text-xs font-medium">
                {item.weightiness} кг
              </Text>
            </View>
            <View className="py-1 px-2 mx-2 rounded bg-gray-200">
              <Text className="text-gray-700 text-xs font-medium">
                {item.body_width}x{item.body_length}x{item.body_height}{" "}
                (ДxШxВ,м){" "}
              </Text>
            </View>
            <View className="py-1 rounded px-2 bg-gray-200">
              <Text className="text-gray-700 text-xs font-medium">
                Срок: {item.deadline} дней
              </Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row justify-center items-center h-9 px-4 py-2 rounded-md border border-lime-500">
            <BaseIcon name="chat" />
            <Text className="text-gray-900 text-sm font-semibold ml-2">
              Перейти чат
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);
const GeneralSkeleton = ({ status }: { status: string }) => (
  <View className="bg-neutral-50">
    <FlatList
      className="mb-36"
      showsVerticalScrollIndicator={false}
      data={status === `active` ? [1] : [1, 2]}
      renderItem={() => (
        <View className=" bg-gray-100 rounded-lg my-2 p-3">
          <Skeleton variant="card" propClasses="w-full h-6" />
          <Skeleton variant="card" propClasses="w-44 h-7 mt-4" />
          <Skeleton variant="card" propClasses="w-20 h-7 mt-2" />
          <View className="my-4 flex-row">
            <Skeleton variant="card" propClasses="w-6 h-6 mr-4" />
            <View>
              <Skeleton variant="card" propClasses="w-40 h-6" />
              <Skeleton variant="card" propClasses="w-28 h-6 mt-2" />
            </View>
          </View>
          <View className="flex-row justify-between">
            <Skeleton variant="card" propClasses="w-16 h-5" />
            <Skeleton variant="card" propClasses="w-16 h-5" />
            <Skeleton variant="card" propClasses="w-16 h-5" />
            <Skeleton variant="card" propClasses="w-16 h-5" />
          </View>
          <Skeleton
            variant="card"
            propClasses={`w-full ${status === `active` ? `h-36` : `h-10`} mt-4`}
          />
        </View>
      )}
    />
    {status === `active` && (
      <Skeleton variant="card" propClasses="w-full h-36" />
    )}
  </View>
);
