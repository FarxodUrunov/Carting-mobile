import {
  LoadDetailTypeMobile,
  ChatContact,
  CreateGroupPayload,
  UpdateGroupPayload,
  Contact,
  Message,
  GroupType,
} from "@anysoftuz/carting-shared/dist/types/mobile";

export interface ChatState {
  isLoading: boolean;
  isLoadingList: boolean;
  chats: (ChatContact | Contact)[];
  contacts: Contact[];
  groupChats: ChatContact[];
  vacancyChats: ChatContact[];
  loadChats: ChatContact[];
  userChats: Contact[];
  groupMessages: Message[];
  room: {
    messages: Message[];
  };
  currentGroup: any;
  isLoadingDetail: boolean;
  loadDetail: LoadDetailTypeMobile & {
    is_accepted: boolean;
  };
  createGroup: (payload: CreateGroupPayload) => Promise<any>;
  updateGroup: (id: number, payload: UpdateGroupPayload) => Promise<any>;
  deleteGroup: (id: number) => Promise<any>;
  getLoadDetails: (orderId: number) => Promise<any>;
  attachGroupMembers: (
    group_id: number,
    payload: { member_ids: number[] }
  ) => Promise<any>;
  removeGroupMember: (group_id: number, user_id: number) => Promise<any>;
  getGroup(id: number): Promise<void>;
  getAll: () => Promise<void>;
  getGroupChats: () => Promise<void>;
  getVacancyChats: () => Promise<void>;
  getLoadChats: (id: number) => Promise<void>;
  getUserChats: () => Promise<void>;
  getRoom: (room_id: number, item_id?: number) => Promise<void>;
  getContacts: (search?: string) => Promise<void>;
  setRoomMessage: (message: any) => void;
  setChatContactsDynamic: (
    chatContactType: "group" | "proposal" | "vacancy" | "individual",
    data: any
  ) => void;
}

export type UserType = {
  id: number;
  photo: string;
  name: string;
  job: string;
};
