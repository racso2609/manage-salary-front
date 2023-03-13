import useSWR from 'swr';
import useToken from '../hooks/useToken';
import { expenseInterface } from '../interfaces/expenses';
import { fetcherWithToken } from '../utils/fetcher';

interface propsTypes {
    expenseId?: string;
}

export default function useExpense(props: propsTypes) {
    const { expenseId } = props;
    const { token } = useToken();

    const {
        data: expense,
        mutate: setExpense,
        error,
    } = useSWR<expenseInterface>(
        expenseId ? `/api/expenses/${expenseId}` : null,
        (url) => fetcherWithToken(url, token, 'expense')
    );

    // render data
    return {
        expense,
        setExpense,
        isError: error,
        isLoading: !error && !expense,
    };
}
