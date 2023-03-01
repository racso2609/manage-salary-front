import useSWR from 'swr';
import { entryFetcher } from '../requests/entries';
import { entryInterface } from '../interfaces/entries';

interface propsTypes {
    token: string;
    entryId?: string;
}

export default function UseEntry(props: propsTypes) {
    const { token, entryId } = props;

    const {
        data: entry,
        mutate: setEntry,
        error,
    } = useSWR<entryInterface>(
        entryId ? [`/api/entries/${entryId}`, token] : '',
        entryFetcher
    );

    // render data
    return {
        entry,
        setEntry,
        isError: error,
        isLoading: !error && !entry,
    };
}
