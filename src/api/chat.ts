import { ChatContactMember } from "-/chat.store";
import {
  CreateGroupPayload,
  UpdateGroupPayload,
  AddGroupMembersPayload,
  ChatContactTypeMobile,
  ChatContactFindManyTypeMobile,
  ChatMobile,
  MobileChatContactLoadOrVacancy,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import axios from "_utils/fetch";

export function GetChatContacts(params: {
  take: number;
  cursor: number | string;
  direction: "next" | "prev";
  filter?: {
    chat_contacts?: { type: ChatContactTypeMobile };
    search?: {
      value: string;
    };
  };
}) {
  return axios.get<ChatContactFindManyTypeMobile>("/chats/contacts", {
    params,
  });
}
export function GetContacts(params?: any) {
  return axios.get<ChatContactMember[]>("/chats/driver-contacts", { params });
}
export function GetChatItem(id: number, type: "load" | "vacancy") {
  return axios.get<MobileChatContactLoadOrVacancy>(`/chats/${type}/${id}`);
}
export function GetChatContact(id: number) {
  return axios.get<ChatMobile>(`/chats/contacts/${id}`);
}
export function GetChatGroup(id?: number) {
  return axios.get<ChatMobile>(`/chats/groups/${id}`);
}
export function CreateNewGroup(payload: CreateGroupPayload) {
  return axios.post<{ id: number }>("/chats/groups", payload);
}
export function UpdateGroup(id: number, payload: UpdateGroupPayload) {
  return axios.patch<{ id: number }>(`/chats/groups/${id}`, payload);
}
export function RemoveGroupMembers(id: number, userId: number) {
  return axios.delete<{ id: number }>(`/chats/groups/${id}/members/${userId}`);
}
export function AddGroupMembers(id: number, payload: AddGroupMembersPayload) {
  return axios.post<{ id: number }>(`/chats/groups/${id}/members`, payload);
}
export function DeleteGroup(id: number) {
  return axios.delete<{ id: number }>(`/chats/groups/${id}`);
}
export function GetRoom(id: number) {
  return axios.get<{ messages: any[] }>(`/chats/messages/${id}`);
}
export function ChatRoomProposalUpdate(
  id: number,
  action: "confirm" | "cancel"
) {
  return axios.patch<{ messages: any[] }>(`/proposals-driver/${id}/${action}`);
}
export function ChatRoomVacancyUpdate(
  id: number,
  action: "confirm" | "cancel"
) {
  const baseAction = action === "confirm" ? "confirm" : "cancel/chat";
  return axios.patch<{ messages: any[] }>(
    `/vacancy-requests/${id}/${baseAction}`
  );
}
