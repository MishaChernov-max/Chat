import type { updateUserTypeResponse } from "../store/slices/authSlice";
import instance from "./instance";

export type userType = {
  _id: string;
  email: string;
  photo?: string;
  isOnline?: boolean;
  name?: string;
  surName?: string;
};

export type getUsersResponseType = {
  users: userType[];
};

export type getUserResponseType = {
  user: userType;
};

export type registerUserType = {
  email: string;
  password: string;
};

export type updateUserType = {
  email: string;
  name: string;
  surName: string;
};

export async function getUsers() {
  const response = await instance.get<getUsersResponseType>("/users");
  console.log("users", response.data.users);
  return response.data.users;
}

export async function getUser(_id: string) {
  console.log("id отпарвляю", _id);
  const response = await instance.get<getUserResponseType>(`/user/${_id}`);
  console.log("users", response.data.user);
  return response.data.user;
}

export async function registerUser({ email, password }: registerUserType) {
  const response = await instance.post("/registration", {
    email: email,
    password: password,
  });
  return response.data;
}

export async function searchChats(q: string) {
  const response = await instance.get("/search", {
    params: {
      q: q,
    },
  });
  return response.data;
}

export async function updateUserProfile({
  email,
  name,
  surName,
}: updateUserType) {
  const response = await instance.patch<updateUserTypeResponse>("/userData", {
    params: {
      email: email,
      name: name,
      surName: surName,
    },
  });
  return response.data;
}
