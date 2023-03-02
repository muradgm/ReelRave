import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (actorInfo) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", actorInfo, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchActor = async (query) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/actor/search?name=${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getActors = async (page, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/actor/actors?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};
