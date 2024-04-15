import { AnnouncementDetailTypeMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import { CancelDriverProposalPayload, FilterData } from "./load";

export type AnnouncementSearchFilterRequest = {
  filter: {
    vacancies?: {
      salary?: {
        min?: number;
        max?: number;
      };
      experience?: number[];
      created_at?: {
        min?: string;
        max?: string;
      };
    };
    search?: {
      value: string;
    };
  };
};

export interface SearchAnnouncementState {
  isLoading: boolean;
  isLoad: boolean;
  isLoadCv: boolean;
  announcements: any;
  announcement: AnnouncementDetailTypeMobile;
  resumes: any;
  getAnnouncements: (params: AnnouncementSearchFilterRequest) => void;
  getAnnouncement: (announcementId: number) => void;
  getMyAllCv: () => void;
  handleApplyVacancy: (payload: ApplyVacancyType) => void;
  cancelDriverVacancy: (payload: CancelDriverProposalPayload) => Promise<any>;
}

export type ApplyVacancyType = {
  vacancy_id: number;
  cv_id: number;
};
