import useSWR from 'swr';
import { entriesFetcher } from '../requests/entries';
import { entryInterface } from '../interfaces/entries';
import { SHORT } from '../constants/time';
import UseToken from '../hooks/useToken';

export default function UseEntry() {
    const { token } = UseToken();

    const {
        data: entries,
        mutate: setEntries,
        error,
    } = useSWR<entryInterface[]>(
        token ? '/api/entries/' : null,
        (url) => entriesFetcher(url, token),
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
