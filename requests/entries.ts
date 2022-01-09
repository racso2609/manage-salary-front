import axios from "axios";
import { getEntriesResponse } from "../interfaces/entries";

const API_URL = "http://192.168.0.107:3001";

export const entriesFetcher = async (url: string, token: string) => {
    const { data }: { data: getEntriesResponse } = await axios.get(
      `${API_URL}${url}`,
      { headers: { Authorization: token } }
    );
    return data.entries;
};
