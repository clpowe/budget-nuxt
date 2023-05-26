<template>
	<div>
		<section class="grid justify-center grid-cols-1 md:grid-cols-2 gap-4">
			<AddBudgetForm />
			<AddExpenseForm />
		</section>
		<section>
			<div>Budgets</div>
			<div class="grid grid-flow-col">
				<div v-for="budget in budgetStore.budgets">
					<BudgetItem :key="budget.id" :budget="budget" />
				</div>
			</div>
		</section>

		<div v-if="expensesStore.expenses.length > 0">
			<div>Expenses</div>
			<Table
				:showBudget="true"
				:expenses="
					expensesStore.expenses
						.sort((a, b) => b.createdAt - a.createdAt)
						.slice(0, 8)
				"
			/>
		</div>
	</div>
</template>

<script setup>
	import { useBudgetStore } from '@/stores/BudgetStore'
	import { useExpensesStore } from '@/stores/ExpensesStore'

	const budgetStore = useBudgetStore()
	const expensesStore = useExpensesStore()

	const { pending: budgetsPending, data: budgets } = await useLazyAsyncData(
		'budgets',
		() => $fetch('/api/budgets', { headers: useRequestHeaders(['cookie']) })
	)
	const { pending: expensesPending, data: expenses } = await useLazyAsyncData(
		'expenses',
		() => $fetch('/api/expenses', { headers: useRequestHeaders(['cookie']) })
	)
	budgetStore.budgets = budgets.value
	expensesStore.expenses = expenses.value

	watchEffect(
		() => {
			budgetStore.budgets = budgets.value
			expensesStore.expenses = expenses.value
		},
		{ immediate: true }
	)
</script>

<style lang="scss" scoped></style>
