import useSWR from 'swr';
import { expensesFetcher } from '../requests/expense';
import { expenseInterface } from '../interfaces/expenses';
import { SHORT } from '../constants/time';
import UseToken from '../hooks/useToken';

export default function UseExpenses() {
    const { token } = UseToken();

    const {
        data: expenses,
        mutate: setExpenses,
        error,
    } = useSWR<expenseInterface[]>(
        token ? '/api/expenses/' : null,
        (url) => expensesFetcher(url, token),
        {
            refreshInterval: SHORT,
        }
    );
    console.log(expenses, error, error?.response?.data?.message, 'expense');

    // render data
    return {
        expenses,
        setExpenses,
        isError: error,
        isLoading: !error && !expenses,
    };
}
