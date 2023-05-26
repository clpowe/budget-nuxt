import { useExpensesStore } from '@/stores/ExpensesStore'
import { Expense } from '~/types'

export const calculateSpentByBudget = (budgetId: string) => {
	const expensesStore = useExpensesStore()
	const expense = expensesStore.expenses

	const budgetSpent = expense.reduce((acc: number, expense: Expense) => {
		// check if expense.id === budgetId I passed in
		if (expense.budget_id !== budgetId) return acc
		return (acc += expense.amount)
	}, 0)
	return budgetSpent
}
