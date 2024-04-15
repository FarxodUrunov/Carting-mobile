// import { View, Pressable, Platform } from "react-native";
// import BaseIcon from "~/icon/BaseIcon";
// import * as FileSystem from "expo-file-system";
// import { shareAsync } from "expo-sharing";

// const BaseFileDownload = ({ urlFile = "" }: { urlFile: any }) => {
//   const downloadFromUrl = async () => {
//     const filename = urlFile?.split("/")?.pop();
//     // const filename = "oooo.png";
//     const result = await FileSystem.downloadAsync(
//       urlFile,
//       FileSystem.documentDirectory + filename
//     );
//     console.log(result);
//     // console.log(
//     //   "result.headers",
//     //   result.headers["Content-Disposition"].split(".")?.pop()
//     // );

//     save(
//       result.uri,
//       filename + "." + result.headers["Content-Disposition"].split(".")?.pop(),
//       result.headers["Content-Type"]
//     );
//   };

//   const save = async (uri: any, filename: any, mimetype: any) => {
//     if (Platform.OS === "android") {
//       const permissions =
//         await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
//       if (permissions.granted) {
//         const base64 = await FileSystem.readAsStringAsync(uri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         await FileSystem.StorageAccessFramework.createFileAsync(
//           permissions.directoryUri,
//           filename,
//           mimetype
//         )
//           .then(async (uri) => {
//             await FileSystem.writeAsStringAsync(uri, base64, {
//               encoding: FileSystem.EncodingType.Base64,
//             });
//           })
//           .catch((e) => console.log(e));
//       } else {
//         shareAsync(uri);
//       }
//     } else {
//       shareAsync(uri);
//     }
//   };
//   console.log("urlFile", urlFile);

//   return (
//     <View>
//       <Pressable onPress={downloadFromUrl}>
//         <BaseIcon name="download" cn="text-blue-400 mr-2" />
//       </Pressable>
//     </View>
//   );
// };
// export default BaseFileDownload;
