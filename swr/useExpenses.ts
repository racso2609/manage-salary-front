import useSWRInfinite from 'swr/infinite';
import { expenseInterface } from '../interfaces/expenses';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';
import { useEffect, useState } from 'react';
interface propsType {
    limit: number;
}

const getKey = (page: number, limit: number) => {
    return `/api/expenses?page=${page}&limit=${limit}`; // SWR key
};

export default function useExpenses({ limit }: propsType) {
    const { token } = useToken();
    const [expenses, setExpenses] = useState<expenseInterface[]>([]);

    const { data, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite(
            (page) => getKey(page, limit),
            (url) => fetcherWithToken(url, token, 'expends')
        );

    useEffect(() => {
        if (data && data.length) setExpenses(data.flat());
    }, [data]);

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < limit);

    const nextPage = () => {
        if (isLoading || isReachingEnd) return;
        setSize(size + 1);
    };
    // const expenses: expenseInterface[] = data ? [].concat(...data) : [];
    // render data
    return {
        expenses,
        isError: !isLoading && !data,
        isLoading: isLoading,
        page: size,
        nextPage,
        isRefreshing: isValidating && data && data.length === size,
        isReachingEnd,
        isEmpty,
        setExpenses: mutate,
    };
}
