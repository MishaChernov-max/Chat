import instance from "./instance";

export type ParamsRequest = {
  lastId?: string;
  limit: number;
  chatId: string;
};

export async function getChatMessages(params: ParamsRequest) {
  const response = await instance.get(`/messages`, {
    params,
  });
  return response;
}
