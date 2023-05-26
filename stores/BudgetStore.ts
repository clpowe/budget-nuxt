import { defineStore } from 'pinia'
import { Budget } from '~/types'

export const useBudgetStore = defineStore('BudgetsStore', () => {
	const budgets: Ref<Budget[]> = ref([])
	const client = useSupabaseAuthClient()

	async function deleteBudget(id: string) {
		await client.from('budgets').delete().match({ id: id })
		budgets.value = budgets.value.filter((budget) => budget.id !== id)
	}

	return { budgets, deleteBudget }
})
