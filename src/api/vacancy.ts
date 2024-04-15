import {
  AnnouncementDetailTypeMobile,
  AnnouncementFindManyTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import {
  AnnouncementSearchFilterRequest,
  ApplyVacancyType,
} from "_/announcements";
import { CancelDriverProposalPayload } from "_/load";
import axios from "_utils/fetch";

export function GetVacancies(params: AnnouncementSearchFilterRequest) {
  return axios.get<AnnouncementFindManyTypeMobile>("/vacancies", { params });
}

export function GetVacancy(id: number) {
  return axios.get<AnnouncementDetailTypeMobile>(`vacancies/${id}`);
}

export function GetAllResumes() {
  return axios.get<GetAllCvsMobile>("/cv");
}

export function HandleApplyVacancy(payload: ApplyVacancyType) {
  return axios.post<{ id: number }>(`/vacancy-requests`, {
    ...payload,
  });
}

export function CancelDriverVacancy(payload: CancelDriverProposalPayload) {
  return axios.patch<{ id: number }>(`/vacancy-requests/${payload.id}/cancel`, {
    message: payload.message,
  });
}
