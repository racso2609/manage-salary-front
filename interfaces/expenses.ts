export interface expenseInterface {
  amount: number;
  description: string;
  name: string;
  user: string;
  active: boolean;
  updateAt: Date;
  createdAt: Date;
  _id: string;
}

export interface getExpensesResponse {
  status: string;
  success: boolean;
  expenses: [expenseInterface];
}

export interface getExpenseResponse {
  status: string;
  success: boolean;
  expense: expenseInterface;
}
