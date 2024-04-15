import { AppliedLoads, ConfirmLoadPayload } from "_/load";
import { create } from "zustand";
// import { GetAppliedLoads, PatchConfirmLoad } from "_api/load";
// import { FilesUpload } from "_api/profile";
import { FormatMedia } from "_utils/formatMedia";
import { Alert } from "react-native";
import { UploadMediaFile, DeleteMediaFile } from "_api/media";
import { t } from "i18next";

type MediaStoreProps = {
  isLoading: boolean;
  isLoadingDelete: boolean;
  media: string[];
  uploadPhotos: (type: string, payload: string[]) => Promise<any>;
  deleteMedia: (id: string) => Promise<any>;
  clearMedia: () => void;
};

export const useMediaStore = create<MediaStoreProps>((set, get) => ({
  isLoading: false,
  isLoadingDelete: false,
  media: [],

  uploadPhotos: async (type: string, payload: any) => {
    set({ isLoading: true });

    const formDataPhotos = await FormatMedia(payload);
    const response: any = await UploadMediaFile(type, formDataPhotos);
    set({ media: response.data });
    set({ isLoading: false });
    return response.data;
  },
  deleteMedia: async (id: string) => {
    set({ isLoadingDelete: true });
    return DeleteMediaFile(id)
      .then(() => {
        Alert.alert(t("successfully_deleted"));
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoadingDelete: false });
      });
  },
  clearMedia: () => {
    set({ media: [] });
  },
}));
