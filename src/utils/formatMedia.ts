import { Platform } from "react-native";

export const FormatMedia = async (payload: any) => {
  payload.forEach((element: string) =>
    Platform.OS === "ios" ? element.replace("file://", "") : element
  );

  const formdata = new FormData();
  formdata.append("tag", "system");
  formdata.append("id", "1");

  payload.forEach((element: string) => {
    const parts = element.split(".");
    const extension = parts[parts.length - 1];
    const fileName = `${Date.now()}.${extension}`;
    const file: any = {
      uri: element,
      name: fileName,
      type: `image/${extension}`,
    };
    formdata.append("file", file);
  });

  return formdata;
};
