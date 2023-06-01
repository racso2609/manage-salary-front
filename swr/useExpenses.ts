import useSWR from 'swr';
import { expenseInterface } from '../interfaces/expenses';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';
interface propsType {
    limit?: number;
    page?: number;
}

export default function useExpenses({ page, limit }: propsType) {
    const { token } = useToken();

    const { data, mutate, error } = useSWR<expenseInterface[]>(
        token
            ? `/api/expenses?page=${page ? page : 1}&limit=${limit ?? 20}`
            : null,
        (url) => fetcherWithToken(url, token, 'expends'),
        {
            revalidateOnFocus: true,
        }
    );

    // render data
    return {
        expenses: data,
        isError: error,
        isLoading: !error && !data,
        setExpenses: mutate,
    };
}
