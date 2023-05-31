import axios from 'axios';

import {
    getExpenseResponse,
    getExpensesResponse,
} from '../interfaces/expenses';
import notify from '../utils/notify';
import { API_URL } from '../constants';

interface IupdateExpense {
    data?: {
        description: string;
        amount: string;
        name: string;
    };
    token: string;
    id: string;
}
export const updateExpense = async ({
    data,
    token,
    id: expenseId,
}: IupdateExpense): Promise<void> => {
    try {
        await axios.put(`${API_URL}/api/expenses/expense/${expenseId}`, data, {
            headers: { Authorization: token },
        });
    } catch (error: any) {
        notify.send({
            type: 'error',
            title: 'error updating entrie',
            message: error?.response?.data?.message,
        });
    }
};
export const createExpense = async ({
    data,
    token,
}: IupdateExpense): Promise<{ success: boolean } | void> => {
    try {
        await axios.post(`${API_URL}/api/expenses`, data, {
            headers: { Authorization: token },
        });

        notify.send({
            type: 'success',
            title: 'Expense created',
            message: '',
        });
        return { success: true };
    } catch (error: any) {
        notify.send({
            type: 'error',
            title: 'error creating expense',
            message: error?.response?.data?.message,
        });
    }
};
export const deleteExpense = async ({
    expenseId,
    token,
}: {
    expenseId: string;
    token: string;
}): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/api/expenses/expense/${expenseId}`, {
            headers: { Authorization: token },
        });

        notify.send({
            type: 'success',
            title: 'Expense deleted',
            message: '',
        });
    } catch (error: any) {
        notify.send({
            type: 'error',
            title: 'error deleting expense',
            message: error?.response?.data?.message,
        });
    }
};
