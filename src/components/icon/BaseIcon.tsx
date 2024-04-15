import { SvgXml } from "react-native-svg";
import icons from "./icons";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";

const BaseIcon = ({
  name,
  cn,
  color,
  width = 24,
  height = 24,
}: {
  name: keyof typeof icons;
  cn?: any;
  color?: string;
  width?: number;
  height?: number;
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <SvgXml
      xml={icons[name]}
      className={cn ?? ""}
      color={color ? color : colors[colorScheme ?? "light"].colors.text}
      width={width}
      height={height}
    />
  );
};

export default BaseIcon;
