import axios from "axios";

import { getEntriesResponse, getEntryResponse } from "../interfaces/entries";
import notify from "../utils/notify";
import { API_URL } from "../constants";

export const entriesFetcher = async (url: string, token: string) => {
  const { data }: { data: getEntriesResponse } = await axios.get(
    `${API_URL}${url}`,
    { headers: { Authorization: token } }
  );
  return data.entries;
};

export const entryFetcher = async (url: string, token: string) => {
  const { data }: { data: getEntryResponse } = await axios.get(
    `${API_URL}${url}`,
    { headers: { Authorization: token } }
  );
  return data.entry;
};

interface IupdateEntry {
  data?: {
    description: string;
    amount: string;
  };
  token: string;
  entryId: string;
}
export const updateEntries = async ({
  data,
  token,
  entryId,
}: IupdateEntry): Promise<void> => {
  try {
    await axios.put(`${API_URL}/api/entries/${entryId}`, data, {
      headers: { Authorization: token },
    });
  } catch (error) {
    notify.send({
      type: "error",
      title: "error updating entrie",
      message: error.message,
    });
  }
};

export const createEntry = async ({
  data,
  token,
}: IupdateEntry): Promise<void> => {
  try {
    await axios.post(`${API_URL}/api/entries`, data, {
      headers: { Authorization: token },
    });
  } catch (error) {
    notify.send({
      type: "error",
      title: "error creating entry",
      message: error.message,
    });
  }
};

export const toggleActiveEntry = async ({ entryId, token }: IupdateEntry) => {
  try {
    await axios.patch(`${API_URL}/api/entries/${entryId}`, null, {
      headers: { Authorization: token },
    });
  } catch (error) {
    notify.send({
      type: "error",
      title: "error toggle entry",
      message: error.message,
    });
  }
};
