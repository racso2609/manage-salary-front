import useSWR from 'swr';
import { entryInterface } from '../interfaces/entries';
import { SHORT } from '../constants/time';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';

export default function useEntry() {
    const { token } = useToken();

    const {
        data: entries,
        mutate: setEntries,
        error,
    } = useSWR<entryInterface[]>(
        token ? '/api/entries/' : null,
        (url) => fetcherWithToken(url, token, 'entries'),
        {
            refreshInterval: SHORT,
        }
    );

    // render data
    return {
        entries,
        setEntries,
        isError: error,
        isLoading: !error && !entries,
    };
}
