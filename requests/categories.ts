import axios from "axios";

import { getCategoriesResponse } from "../interfaces/categories";
import { API_URL } from "../constants";

export const categoriesFetcher = async (url: string, token: string) => {
  const { data }: { data: getCategoriesResponse } = await axios.get(
    `${API_URL}${url}`,
    { headers: { Authorization: token } }
  );
  return data.categories;
};
