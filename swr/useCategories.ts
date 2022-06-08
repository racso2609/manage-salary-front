import useSWR, { KeyedMutator } from "swr";
import { categoriesFetcher } from "../requests/categories";
import { categoryInterface } from "../interfaces/categories";
import { LONG } from "../utils/time";

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
      refreshInterval: LONG,
    }
  );

  return {
    categories,
    setCategories,
    isError: error,
    isLoading: !error && !categories,
  };
}
