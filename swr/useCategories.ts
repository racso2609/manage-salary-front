import useSWR from "swr";
import { categoriesFetcher } from "../requests/categories";
import { categoryInterface } from "../interfaces/categories";

interface propsTypes {
  token: string;
  expenseId?: string;
}

export default function UseCategories(props: propsTypes) {
  const { token } = props;

  const {
    data: categories,
    mutate: setCategories,
    error,
  } = useSWR<categoryInterface[]>(
    [`/api/categories`, token],
    categoriesFetcher
  );

  return {
    categories,
    setCategories,
    isError: error,
    isLoading: !error && !categories,
  };
}
