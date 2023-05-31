import useSWR from 'swr';
import { totalData } from '../interfaces/total';
import { LONG, SHORT } from '../constants/time';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';
interface propsType {
    decimals?: number;
}
export default function useTotal({ decimals }: propsType) {
    const { token } = useToken();
    decimals = decimals ?? 2;

    const {
        data,
        mutate: setTotal,
        error,
    } = useSWR<totalData>(
        token ? '/api/data/totals' : null,
        (url) => fetcherWithToken(url, token),
        {
            refreshInterval: LONG,
        }
    );
    const total = data ?? { totalEntries: 0, totalExpenses: 0, total: 0 };

    // render data
    return {
        total: {
            totalExpenses: Number(total.totalExpenses.toFixed(decimals)),
            totalEntries: Number(total.totalEntries.toFixed(decimals)),
            total: Number(total.total.toFixed(decimals)),
        } as totalData,
        setTotal,
        isError: error,
        isLoading: !error && !total,
    };
}
