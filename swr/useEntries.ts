import useSWR from 'swr';
import { entriesFetcher } from '../requests/entries';
import { entryInterface } from '../interfaces/entries';
import { SHORT } from '../utils/time';

interface propsTypes {
    token: string;
}

export default function UseEntry(props: propsTypes) {
    const { token } = props;

    const {
        data: entries,
        mutate: setEntries,
        error,
    } = useSWR<entryInterface[]>(['/api/entries/', token], entriesFetcher, {
        refreshInterval: SHORT,
    });

    // render data
    return {
        entries,
        setEntries,
        isError: error,
        isLoading: !error && !entries,
    };
}
