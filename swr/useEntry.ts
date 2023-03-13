import useSWR from 'swr';
import useToken from '../hooks/useToken';
import { entryInterface } from '../interfaces/entries';
import { fetcherWithToken } from '../utils/fetcher';

interface propsTypes {
    entryId?: string;
}

export default function useEntry(props: propsTypes) {
    const { entryId } = props;
    const { token } = useToken();

    const {
        data: entry,
        mutate: setEntry,
        error,
    } = useSWR<entryInterface>(
        entryId ? `/api/entries/${entryId}` : null,
        (url) => fetcherWithToken(url, token, 'entry')
    );

    // render data
    return {
        entry,
        setEntry,
        isError: error,
        isLoading: !error && !entry,
    };
}
