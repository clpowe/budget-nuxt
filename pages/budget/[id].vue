<template>
	<div>{{ budget?.name }}</div>
	<button @click="handleDelete(budget.id)">delete budget</button>
	<div>remaining: {{ formatCurrency(budget.amount - spent) }}</div>
	<AddExpenseForm :bid="budget?.id" :bn="budget?.name" />

	<div v-if="expenses.length > 0">
		<div>Expenses</div>
		<Table
			:showBudget="false"
			:expenses="expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useBudgetStore } from '@/stores/BudgetStore'
	import { useExpensesStore } from '@/stores/ExpensesStore'
	import { Budget } from '~/types'

	const budgetStore = useBudgetStore()
	const expensesStore = useExpensesStore()
	const route = useRoute()

	const budget: Ref<Budget | any> = ref()

	budget.value = budgetStore.budgets.find((b) => b.id == route.params.id)

	const expenses = computed({
		get() {
			return expensesStore.expenses.filter(
				(exp) => exp.budget_id == route.params.id
			)
		},
		set() {
			return expensesStore.expenses.filter(
				(exp) => exp.budget_id == route.params.id
			)
		}
	})

	const spent = computed({
		get() {
			return calculateSpentByBudget(budget.value.id)
		},
		set() {
			return calculateSpentByBudget(budget.value.id)
		}
	})

	async function handleDelete(id: string) {
		await budgetStore.deleteBudget(id)
		navigateTo('/account')
	}
</script>

<style scoped></style>
