import useSWR from 'swr';
import { expenseInterface } from '../interfaces/expenses';
import { SHORT } from '../constants/time';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';

export default function useExpenses() {
    const { token } = useToken();

    const {
        data: expenses,
        mutate: setExpenses,
        error,
    } = useSWR<expenseInterface[]>(
        token ? '/api/expenses/' : null,
        (url) => fetcherWithToken(url, token, 'expends'),
        {
            refreshInterval: SHORT,
        }
    );

    // render data
    return {
        expenses,
        setExpenses,
        isError: error,
        isLoading: !error && !expenses,
    };
}
