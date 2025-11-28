import instance from "./instance";

export type userType = {
  _id: string;
  email: string;
  isActivated?: boolean;
  avatar?: string;
  firstName: string;
  surName: string;
};

export type UpdatedUserInformation = {
  _id: string;
  firstName: string;
  surName: string;
};

export type getUsersResponseType = {
  users: userType[];
};

export type registerUserType = {
  email: string;
  password: string;
  firstName?: string;
  surName?: string;
};

export async function getUsers() {
  const response = await instance.get<getUsersResponseType>("/users");
  return response.data.users;
}

export async function updateGetUserInformation(
  userData: UpdatedUserInformation
) {
  const response = await instance.patch("/users/me", { userData });
  return response;
}

export async function registerUser({
  email,
  password,
  firstName,
  surName,
}: registerUserType) {
  const response = await instance.post("auth/registration", {
    email: email,
    password: password,
    firstName: firstName,
    surName: surName,
  });
  console.log("response", response);
  return response.data;
}

export async function loginUser({ email, password }: registerUserType) {
  const response = await instance.post("auth/login", {
    email: email,
    password: password,
  });
  return response.data;
}

export async function searchChats(q: string) {
  const response = await instance.get("users/search", {
    params: {
      q: q,
    },
  });
  return response.data;
}
