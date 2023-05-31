import useSWRInfinite from 'swr/infinite';
import { entryInterface } from '../interfaces/entries';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';
import { useEffect, useState } from 'react';
interface propsType {
    limit: number;
}

const getKey = (page: number, limit: number) => {
    return `/api/entries?page=${page}&limit=${limit}`; // SWR key
};

export default function useEntries({ limit }: propsType) {
    const { token } = useToken();
    const [entries, setEntries] = useState<entryInterface[]>([]);

    const { data, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite(
            (page) => getKey(page, limit),
            (url) => fetcherWithToken(url, token, 'entries')
        );

    useEffect(() => {
        if (data && data.length) setEntries(data.flat());
    }, [data]);

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < limit);

    const nextPage = () => {
        if (isLoading || isReachingEnd) return;
        setSize(size + 1);
    };
    // render data
    return {
        entries,
        isError: !isLoading && !data,
        isLoading: isLoading,
        page: size,
        nextPage,
        isRefreshing: isValidating && data && data.length === size,
        isReachingEnd,
        isEmpty,
        setEntries: mutate,
    };
}
