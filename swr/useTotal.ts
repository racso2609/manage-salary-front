import useSWR from 'swr';
import { totalData } from '../interfaces/total';
import { SHORT } from '../constants/time';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';

export default function useTotal() {
    const { token } = useToken();

    const {
        data: total,
        mutate: setTotal,
        error,
    } = useSWR<totalData>(
        token ? '/api/data/totals' : null,
        (url) => fetcherWithToken(url, token),
        {
            refreshInterval: SHORT,
        }
    );

    // render data
    return {
        total,
        setTotal,
        isError: error,
        isLoading: !error && !total,
    };
}
