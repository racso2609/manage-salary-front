import useSWR from "swr";
import { expenseFetcher } from "../requests/expense";
import { expenseInterface } from "../interfaces/expenses";

interface propsTypes {
  token: string;
  expenseId?: string;
}

export default function UseEntry(props: propsTypes) {
  const { token, expenseId } = props;

  const {
    data: entry,
    mutate: setEntry,
    error,
  } = useSWR<expenseInterface>(
    expenseId ? [`/api/expense/${expenseId}`, token] : "",
    expenseFetcher
  );

  // render data
  return {
    entry,
    setEntry,
    isError: error,
    isLoading: !error && !entry,
  };
}
