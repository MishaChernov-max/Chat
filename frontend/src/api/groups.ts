import type { MessageType } from "../components/Message/Message";
import instance from "./instance";
import type { userType } from "./users";

export type groupType = {
  _id: string;
  userId?: userType | null;
  name: string;
  participiants: userType[];
  photo?: string;
  messages?: MessageType[];
};

export type groupQueryParams = {
  userId?: string;
  groupName: string;
};

export type AddMemberType = {
  groupId: string;
  memberId: string;
};

export async function CreateGroup({ userId, groupName }: groupQueryParams) {
  const response = await instance.post<groupType>("/createGroup", {
    userId: userId,
    groupName: groupName,
  });
  console.log("Отправляю groupName", {
    userId: userId,
    groupName: groupName,
  });
  return response;
}

export async function GetGroups(userId?: string) {
  return await instance.get<groupType[]>("/groups", {
    params: {
      userId: userId,
    },
  });
}

export async function GetGroup(groupId?: string) {
  try {
    const response = await instance.get<groupType>("/group", {
      params: {
        groupId: groupId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error", error);
  }
}

export async function AddMember(groupData: AddMemberType) {
  return await instance.patch("/addMember", {
    groupData: groupData,
  });
}

export async function getGroupChat(Id: string, type: string) {
  const response = instance.post("/getHistory", {
    Id: Id,
    type: type,
  });
  return response;
}
