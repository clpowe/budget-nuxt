import { defineStore } from 'pinia'
import { Expense } from '~/types'

export const useExpensesStore = defineStore('ExpensesStore', () => {
	const client = useSupabaseAuthClient()

	const expenses: Ref<Expense[]> = ref([])

	async function deleteExpense(id: number) {
		expenses.value = expenses.value.filter((expense) => expense.id !== id)
		await client.from('expenses').delete().match({ id: id })
	}

	return { expenses, deleteExpense }
})
