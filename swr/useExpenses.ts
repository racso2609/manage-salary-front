import useSWR from "swr";
import { expensesFetcher } from "../requests/expense";
import { expenseInterface } from "../interfaces/expenses";

interface propsTypes {
  token: string;
}

export default function UseEntry(props: propsTypes) {
  const { token } = props;

  const {
    data: entries,
    mutate: setEntries,
    error,
  } = useSWR<expenseInterface[]>(["/api/entries/", token], expensesFetcher, {
    refreshInterval: 10000,
  });

  // render data
  return {
    entries,
    setEntries,
    isError: error,
    isLoading: !error && !entries,
  };
}
