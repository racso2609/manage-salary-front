import useSWR from 'swr';
import { entryInterface } from '../interfaces/entries';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';
interface propsType {
    limit?: number;
    page?: number;
}

export default function useEntries({ limit, page }: propsType) {
    const { token } = useToken();

    const { data, error, mutate } = useSWR<entryInterface[]>(
        token
            ? `/api/entries?page=${page ? page : 1}&limit=${limit ?? 0}`
            : null,
        (url) => fetcherWithToken(url, token, 'entries')
    );

    // render data
    return {
        entries: data,
        isError: error,
        isLoading: !error && !data,
        setEntries: mutate,
    };
}
