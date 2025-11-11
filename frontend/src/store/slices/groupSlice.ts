import { createAsyncThunk } from "@reduxjs/toolkit/react";
import {
  AddMember,
  CreateGroup,
  GetGroup,
  getGroupChat,
  GetGroups,
  type AddMemberType,
  type groupQueryParams,
  type groupType,
} from "../../api/groups";
import { createSlice } from "@reduxjs/toolkit";
import type { userType } from "../../api/users";
import type { MessageType } from "../../components/Message/Message";

export const groupsThunk = createAsyncThunk(
  "group/groupsThunk",
  async (userId?: string) => {
    try {
      const response = await GetGroups(userId);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const groupThunk = createAsyncThunk<groupType, groupQueryParams>(
  "group/groupThunk",
  async ({ userId, groupName }) => {
    try {
      const response = await CreateGroup({ userId, groupName });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export type GroupData = {
  roomId: string;
  messages: MessageType[];
};

export const getGroupChatThunk = createAsyncThunk<
  GroupData,
  { Id: string; type: string }
>("group/groupThunk", async ({ Id, type }) => {
  try {
    const response = await getGroupChat(Id, type);
    return response.data;
  } catch (e) {
    throw e;
  }
});

export const getGroupById = createAsyncThunk<groupType, string>(
  "group/getGroupById",

  async (groupId) => {
    const response = await GetGroup(groupId);
    console.log("response", response);
    if (!response) {
      throw new Error("No response received");
    }
    return response.data;
  }
);

export const addMember = createAsyncThunk<
  { groupId: string; participiants: userType[] },
  AddMemberType
>("group/addMember", async (groupData) => {
  const updatedGroup = await AddMember(groupData);
  return updatedGroup.data;
});

export type groupSliceType = {
  isGroupsLoading: boolean;
  typingUsers: Record<string, string[]>;
  isGroupsError: string | null;
  groups: groupType[];
  isLoading: boolean;
  isError: string | null;
  isGetGroupLoading: boolean;
  isGetGroupError: string | null;
  isAddMemberLoading: boolean;
  isAddMemberError: string | null;
  group: groupType;
};

export const initialState: groupSliceType = {
  isGroupsLoading: false,
  isGroupsError: null,
  groups: [],
  isLoading: false,
  isError: null,
  isGetGroupLoading: false,
  isGetGroupError: null,
  isAddMemberLoading: false,
  isAddMemberError: null,
  typingUsers: {},
  group: { _id: "", userId: null, name: "", participiants: [], messages: [] },
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup(state, { payload: group }) {
      state.groups = [...state.groups, group];
    },
    addTypingUser(state, { payload: typingData }) {
      const { roomId, userId } = typingData;
      const group = state.typingUsers[roomId];
      if (!group) {
        state.typingUsers[roomId] = [userId];
        return;
      }
      if (!group.includes(userId)) {
        group.push(userId);
      }
    },
    updateGroupMembers(state, { payload }) {
      const group = state.groups.find(
        (group: groupType) => group._id === payload.groupId
      );
      console.log("group", group);
      if (group) {
        group.participiants = payload.participiants;
      }
    },
    removeTypingUser(state, { payload: typingData }) {
      const { roomId, userId } = typingData;
      const group = state.typingUsers[roomId];
      if (!group) {
        state.typingUsers[roomId] = [userId];
        return;
      }
      if (group.includes(userId)) {
        state.typingUsers[roomId] = group.filter((u) => u !== userId);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(groupThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(groupThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.group = action?.payload;
      state.isError = null;
    });
    builder.addCase(groupThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action?.error?.message ?? null;
    });
    builder.addCase(getGroupById.pending, (state) => {
      state.isGetGroupLoading = true;
      state.isGetGroupError = null;
    });
    builder.addCase(getGroupById.fulfilled, (state, action) => {
      state.isGetGroupLoading = false;
      state.group = action?.payload;
      state.isGetGroupError = null;
    });
    builder.addCase(getGroupById.rejected, (state, action) => {
      state.isGetGroupLoading = false;
      state.isGetGroupError = action?.error.message ?? null;
    });
    builder.addCase(addMember.pending, (state) => {
      state.isAddMemberLoading = true;
      state.isAddMemberError = null;
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.isAddMemberLoading = false;
      state.group.participiants = action.payload.participiants;
      state.isAddMemberError = null;
    });
    builder.addCase(addMember.rejected, (state, action) => {
      state.isAddMemberLoading = false;
      state.isAddMemberError = action?.error.message ?? null;
    });
    builder.addCase(groupsThunk.pending, (state) => {
      state.isGroupsLoading = true;
      state.isGroupsError = null;
    });
    builder.addCase(groupsThunk.fulfilled, (state, action) => {
      state.isGroupsLoading = false;
      state.groups = action.payload;
      state.isGroupsError = null;
    });
    builder.addCase(groupsThunk.rejected, (state, action) => {
      state.isGroupsLoading = false;
      state.isGroupsError = action.error?.message ?? null;
    });
  },
});
export const { actions, reducer } = groupSlice;
