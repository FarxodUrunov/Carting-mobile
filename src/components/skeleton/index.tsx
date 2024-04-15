import { View } from "react-native";

const Skeleton = ({ variant, propClasses }: any) => {
  return (
    <View
      className={`${propClasses} relative animate-pulse dark:bg-gray-500 bg-gray-200 ${
        variant === `card`
          ? `rounded-md`
          : variant === `circle`
          ? `rounded-full`
          : ``
      }`}
    ></View>
  );
};

export default Skeleton;
