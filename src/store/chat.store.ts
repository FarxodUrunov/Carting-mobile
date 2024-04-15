import {
  AddGroupMembers,
  ChatRoomProposalUpdate,
  ChatRoomVacancyUpdate,
  CreateNewGroup,
  DeleteGroup,
  GetChatContact,
  GetChatContacts,
  GetChatGroup,
  GetChatItem,
  GetContacts,
  RemoveGroupMembers,
  UpdateGroup,
} from "_api/chat";
import { create } from "zustand";

import { Alert } from "react-native";
import {
  AddGroupMembersPayload,
  ChatContactFindManyTypeMobile,
  ChatContactMobile,
  ChatMessageMobile,
  ChatMobile,
  MobileChatContactLoadOrVacancy,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import { t } from "i18next";
export type ChatContactMember = {
  id: number;
  photo: string;
  type: string;
  name: string;
};
export type ChatState = {
  contacts: ChatContactFindManyTypeMobile;
  contact_members: ChatContactMember[] | [];
  contact_members_cache: ChatContactMember[] | [];
  contact: ChatMobile;
  loading: boolean;
  chatItem: MobileChatContactLoadOrVacancy;

  unreadMessageCount: () => number;
  getContacts: (params: {
    take: number;
    cursor: number | string;
    direction: "next" | "prev";
    filter?: {
      chat_contacts?: { type: any };
      search?: {
        value: string;
      };
    };
  }) => void;
  getContact: (id: number) => void;
  filterContacts: (index: number) => ChatContactMobile[];
  getChatItem: (id: number, type: "load" | "vacancy") => void;
  getGroup: (id: number) => void;
  createGroup: (payload: any) => Promise<number | void>;
  updateGroup: (id: number, payload: any) => Promise<number | void>;
  deleteGroup: (id: number) => Promise<number | void>;
  attachGroupMembers: (id: number, payload: AddGroupMembersPayload) => void;
  removeGroupMember: (group_id: number, member_id: number) => void;
  setMessage: (payload: ChatMessageMobile) => void;
  sendMessage: (payload: ChatMessageMobile) => void;
  getChatContacts: (params?: any) => void;
  searchChatContacts: (query: string | null) => void;
  vacancyUpdate: (id: number, action: "confirm" | "cancel") => void;
  proposalUpdate: (id: number, action: "confirm" | "cancel") => void;
  setNewMessageContacts(data: any): void;
};

export const useChats = create<ChatState>((set, get) => ({
  contact_members: [],
  contact_members_cache: [],
  contacts: {
    data: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: "",
      startCursor: "",
      totalCount: 0,
    },
  },
  contact: {
    members: [],
    messages: {
      data: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: "",
        startCursor: "",
        totalCount: 0,
      },
    },
    id: 0,
  },
  loading: false,
  chatItem: {} as MobileChatContactLoadOrVacancy,
  unreadMessageCount() {
    const contacts = get().contacts;
    if (contacts.data) {
      return contacts.data.reduce((acc, contact) => {
        return acc + contact.unread_message_count;
      }, 0);
    } else {
      return 0;
    }
  },
  filterContacts(type) {
    const contacts = get().contacts;
    const typeEnum: any = {
      0: "proposal",
      1: "group",
      2: "individual",
      3: "vacancy",
    };

    return contacts.data
      .filter((contact) => contact.type === typeEnum[type])
      .sort(
        (a, b) =>
          new Date(b.last_message?.created_at).getTime() -
          new Date(a.last_message?.created_at).getTime()
      );
  },
  getContacts: (params) => {
    set({ loading: true });
    return GetChatContacts(params)
      .then(({ data }) => {
        set({ contacts: data });
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  getContact(id) {
    set({ loading: true });
    return GetChatContact(id)
      .then(({ data }) => {
        data.messages.data = data.messages.data.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        set({ contact: data });
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  getChatItem(id, type) {
    set({ loading: true });
    return GetChatItem(id, type)
      .then(({ data }) => {
        set({ chatItem: data });
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  getGroup(id) {
    set({ loading: true });
    return GetChatGroup(id)
      .then(({ data }) => {
        set({ contact: data });
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  createGroup(payload) {
    set({ loading: true });

    return CreateNewGroup(payload)
      .then(({ data }) => {
        return data.id;
      })
      .catch((error) => {
        if (error.response.status === 422) {
          if (error.response.data.member_ids) {
            Alert.alert(t("number_group_limit"));
          }
        } else {
          Alert.alert(error.response.data.error, error.response.data.message);
        }
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  updateGroup(id, payload) {
    set({ loading: true });
    return UpdateGroup(id, payload)
      .then(({ data }) => {
        return data.id;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  deleteGroup(id) {
    set({ loading: true });
    return DeleteGroup(id)
      .then(({ data }) => {
        return data.id;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  attachGroupMembers(id, payload) {
    set({ loading: true });
    return AddGroupMembers(id, payload)
      .then(({ data }) => {
        return data.id;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  removeGroupMember(group_id, member_id) {
    set({ loading: true });
    return RemoveGroupMembers(group_id, member_id)
      .then(({ data }) => {
        return data.id;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  setMessage(payload) {
    const messages = get().contact.messages.data;
    set((state) => ({
      contact: {
        ...state.contact,
        messages: {
          ...state.contact.messages,
          data: [payload, ...messages].sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          ),
        },
      },
    }));
  },
  sendMessage(payload) {},
  getChatContacts(params) {
    set({ loading: true });
    return GetContacts(params)
      .then(({ data }) => {
        set({ contact_members: data, contact_members_cache: data });
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  searchChatContacts(query) {
    const members = get().contact_members;
    const cache = get().contact_members_cache;
    if (query && query.length > 0) {
      const result = members.filter((f) =>
        f.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      set({
        contact_members: result ? result : [],
      });
    } else {
      set({
        contact_members: cache,
      });
    }
  },
  vacancyUpdate(id, action) {
    set({ loading: true });
    return ChatRoomVacancyUpdate(id, action)
      .then(async ({ data }) => {
        await get().getChatItem(id, "vacancy");
        return data;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  proposalUpdate(id, action) {
    set({ loading: true });
    return ChatRoomProposalUpdate(id, action)
      .then(async ({ data }) => {
        await get().getChatItem(id, "load");
        return data;
      })
      .catch((error) => {
        Alert.alert(error.response.data.error, error.response.data.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  setNewMessageContacts(data) {
    const contacts = get().contacts.data;
    const newContacts = contacts.map((contact) => {
      if (contact.id === data.contact_id) {
        return {
          ...contact,
          last_read_message_id: data.id,
          unread_message_count: contact.unread_message_count + 1,
          last_message: {
            files: data.files,
            text: data.message,
            created_at: data.created_at,
          },
        };
      } else {
        return contact;
      }
    });
    set((state) => ({
      contacts: {
        ...state.contacts,
        data: newContacts.sort((a, b) => {
          return (
            new Date(b.last_message?.created_at).getTime() -
            new Date(a.last_message?.created_at).getTime()
          );
        }),
      },
    }));
  },
}));
