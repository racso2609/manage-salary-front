import useSWR from "swr";
import { categoriesFetcher } from "../requests/categories";
import { categoryInterface } from "../interfaces/categories";

interface propsTypes {
  token: string;
}

export default function UseCategories(props: propsTypes) {
  const { token } = props;

  const {
    data: categories,
    mutate: setCategories,
    error,
  } = useSWR<categoryInterface[]>(
    [`/api/categories`, token],
    categoriesFetcher,
    {
      refreshInterval: 30 * 1000,
    }
  );

  return {
    categories,
    setCategories,
    isError: error,
    isLoading: !error && !categories,
  };
}
