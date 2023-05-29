export interface Expense {
  id: number;
  name: string;
  amount: number;
  created_at: any;
  budget_name: string;
  budget_id: string;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
}
