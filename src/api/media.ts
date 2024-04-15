import { DeleteMediaFileType } from "_/profile";
import axios from "_utils/fetch";

export function UploadMediaFile(type: string, payload: any) {
  return axios.post<any>(`/medias${type === `files` ? `/files` : ``}`, payload);
}
export function DeleteMediaFile(id: string) {
  return axios.delete<DeleteMediaFileType>(`/medias/${id}`);
}
