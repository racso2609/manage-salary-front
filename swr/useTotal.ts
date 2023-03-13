import useSWR from 'swr';
import { totalData } from '../interfaces/total';
import { totalFetcher } from '../requests/total';
import { SHORT } from '../constants/time';
import UseToken from '../hooks/useToken';

export default function UseTotal() {
    const { token } = UseToken();

    const {
        data: total,
        mutate: setTotal,
        error,
    } = useSWR<totalData>(
        token ? '/api/data/totals' : null,
        (url) => totalFetcher(url, token),
        {
            refreshInterval: SHORT,
        }
    );
    console.log(total, error?.response?.data?.message);

    // render data
    return {
        total,
        setTotal,
        isError: error,
        isLoading: !error && !total,
    };
}
