export interface expenseInterface {
    amount: number;
    description: string;
    category: string;
    user: string;
    updateAt: Date;
    createdAt: Date;
    _id: string;
}

export interface getExpensesResponse {
    status: string;
    success: boolean;
    expends: [expenseInterface];
}

export interface getExpenseResponse {
    status: string;
    success: boolean;
    expense: expenseInterface;
}
