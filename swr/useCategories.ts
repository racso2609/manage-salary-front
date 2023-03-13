import useSWR from 'swr';
import { categoryInterface } from '../interfaces/categories';
import { LONG } from '../constants/time';
import useToken from '../hooks/useToken';
import { fetcherWithToken } from '../utils/fetcher';

export default function useCategories() {
    const { token } = useToken();

    const {
        data: response,
        mutate: setCategories,
        error,
    } = useSWR<categoryInterface[]>(
        token ? `/api/categories` : null,
        (url) => fetcherWithToken(url, token, 'categories'),
        {
            refreshInterval: LONG,
        }
    );

    return {
        categories: response,
        setCategories,
        isError: error,
        isLoading: !error && !response,
    };
}
