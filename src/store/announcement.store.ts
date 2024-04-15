import { ApplyVacancyType } from "./../../types/announcements";
import { create } from "zustand";
import { Alert } from "react-native";
import { SearchAnnouncementState } from "_/announcements";
import {
  CancelDriverVacancy,
  GetAllResumes,
  GetVacancies,
  GetVacancy,
  HandleApplyVacancy,
} from "_api/vacancy";
import { AnnouncementDetailTypeMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import { CancelDriverProposalPayload } from "_/load";

export const useAnnouncementStore = create<SearchAnnouncementState>(
  (set, get) => ({
    isLoading: true,
    isLoad: false,
    isLoadCv: false,
    announcement: {} as AnnouncementDetailTypeMobile,
    announcements: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
      },
      data: [],
    },
    resumes: [],
    getAnnouncements: (params) => {
      set({ isLoading: true });
      return GetVacancies(params)
        .then(({ data }) => {
          set({ announcements: data });
        })
        .catch((err) => {
          Alert.alert(err.response.data.error, err.response.data.message);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    },
    async getAnnouncement(announcementId: number) {
      set({ isLoad: true });
      return GetVacancy(announcementId)
        .then(({ data }) => {
          set({ announcement: data });
        })
        .catch((err) => {
          Alert.alert(err.response.data.error, err.response.data.message);
        })
        .finally(() => {
          set({ isLoad: false });
        });
    },
    getMyAllCv: () => {
      set({ isLoadCv: true });
      return GetAllResumes()
        .then(({ data }) => {
          set({ resumes: data.data });
        })
        .catch((err) => {
          Alert.alert(err.response.data.error, err.response.data.message);
        })
        .finally(() => {
          set({ isLoadCv: false });
        });
    },
    async handleApplyVacancy(payload: ApplyVacancyType) {
      set({ isLoad: true });
      return HandleApplyVacancy({ ...payload })
        .then(({ data }) => {
          get().getAnnouncements({
            filter: {
              search: { value: "" },
            },
          });
          get().getAnnouncement(payload.vacancy_id);
        })
        .catch((err) => {
          Alert.alert(err.response.data.error, err.response.data.message);
        })
        .finally(() => {
          set({ isLoad: false });
        });
    },
    cancelDriverVacancy: (payload: CancelDriverProposalPayload) => {
      set({ isLoad: true });
      return CancelDriverVacancy(payload)
        .then((data) => {
          get().getAnnouncement(payload.id);
          return data;
        })
        .catch((err) => {
          Alert.alert(err.response.data.error, err.response.data.message);
        })
        .finally(() => {
          set({ isLoad: false });
        });
    },
  })
);
