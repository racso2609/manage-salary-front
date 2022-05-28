import axios from "axios";

import {
  getExpenseResponse,
  getExpensesResponse,
} from "../interfaces/expenses";
import notify from "../utils/notify";
import { API_URL } from "../constants";

export const expensesFetcher = async (url: string, token: string) => {
  const { data }: { data: getExpensesResponse } = await axios.get(
    `${API_URL}${url}`,
    { headers: { Authorization: token } }
  );
  return data.expenses;
};

export const expenseFetcher = async (url: string, token: string) => {
  const { data }: { data: getExpenseResponse } = await axios.get(
    `${API_URL}${url}`,
    { headers: { Authorization: token } }
  );
  return data.expense;
};

interface IupdateExpense {
  data?: {
    description: string;
    amount: string;
    name: string;
  };
  token: string;
  entryId: string;
}
export const updateExpense = async ({
  data,
  token,
  entryId,
}: IupdateExpense): Promise<void> => {
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

export const createExpense = async ({
  data,
  token,
}: IupdateExpense): Promise<void> => {
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

export const toggleActiveEntry = async ({ entryId, token }: IupdateExpense) => {
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
