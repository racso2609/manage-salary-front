import useSWR from "swr";
import { expensesFetcher } from "../requests/expense";
import { expenseInterface } from "../interfaces/expenses";

interface propsTypes {
  token: string;
}

export default function UseExpenses(props: propsTypes) {
  const { token } = props;

  const {
    data: expenses,
    mutate: setExpenses,
    error,
  } = useSWR<expenseInterface[]>(
    ["/api/expenses/", token],
    expensesFetcher,
    {}
  );

  // render data
  return {
    expenses,
    setExpenses,
    isError: error,
    isLoading: !error && !expenses,
  };
}