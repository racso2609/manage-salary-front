import useSWR from 'swr';
import { expenseFetcher } from '../requests/expense';
import { expenseInterface } from '../interfaces/expenses';

interface propsTypes {
    token: string;
    expenseId?: string;
}

export default function UseExpense(props: propsTypes) {
    const { token, expenseId } = props;

    const {
        data: expense,
        mutate: setExpense,
        error,
    } = useSWR<expenseInterface>(
        expenseId ? [`/api/expenses/${expenseId}`, token] : '',
        expenseFetcher
    );

    // render data
    return {
        expense,
        setExpense,
        isError: error,
        isLoading: !error && !expense,
    };
}
