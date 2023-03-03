import useSWR from 'swr';
import { totalData } from '../interfaces/total';
import { totalFetcher } from '../requests/total';
import { SHORT } from '../constants/time';

interface propsTypes {
    token: string;
}

export default function UseTotal(props: propsTypes) {
    const { token } = props;

    const {
        data: total,
        mutate: setTotal,
        error,
    } = useSWR<totalData>(['/api/data/totals', token], totalFetcher, {
        refreshInterval: SHORT,
    });

    // render data
    return {
        total,
        setTotal,
        isError: error,
        isLoading: !error && !total,
    };
}
