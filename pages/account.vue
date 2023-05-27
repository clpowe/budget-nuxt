<template>
	<div class="container mx-auto">
		<section class="grid justify-center grid-cols-1 md:grid-cols-2 gap-4">
			<div class="p-4 flex flex-col gap-6">
				<h2 class="text-2xl font-bold">Hello, {{ username }}</h2>
				<div class="mx-auto self-center">
					<ProgressCircle
						:spent="totalSpent"
						:total="totalBudgeted"
						size="12"
					/>
				</div>
				<div class="flex w-full justify-between">
					<div>
						<h3 class="text-base">Spent</h3>
						<p class="text-3xl font-bold">{{ formatCurrency(totalSpent) }}</p>
					</div>
					<div>
						<h3 class="text-base">Remaining</h3>
						<p class="text-3xl font-bold">
							{{ formatCurrency(totalBudgeted) }}
						</p>
					</div>
				</div>
			</div>
			<AddBudgetForm />
			<AddExpenseForm />
		</section>
		<section class="p-4 bg-secondary/20">
			<h2 class="text-3xl font-bold mb-4">Budgets</h2>
			<div class="grid grid-cols-2 gap-4">
				<div v-for="budget in budgetStore.budgets">
					<BudgetItem :key="budget.id" :budget="budget" />
				</div>
			</div>
		</section>

		<section class="mb-20 p-4">
			<div v-if="expensesStore?.expenses.length > 0">
				<h2 class="text-3xl font-bold mb-4">Expenses</h2>
				<Table
					:showBudget="true"
					:expenses="
						expensesStore.expenses
							.sort((a, b) => b.createdAt - a.createdAt)
							.slice(0, 8)
					"
				/>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { useBudgetStore } from '@/stores/BudgetStore'
	import { useExpensesStore } from '@/stores/ExpensesStore'

	const budgetStore = useBudgetStore()
	const expensesStore = useExpensesStore()

	const { pending: budgetsPending, data: budgets } = await useAsyncData(
		'budgets',
		() => $fetch('/api/budgets', { headers: useRequestHeaders(['cookie']) })
	)
	const { pending: expensesPending, data: expenses } = await useAsyncData(
		'expenses',
		() => $fetch('/api/expenses', { headers: useRequestHeaders(['cookie']) })
	)
	budgetStore.budgets = budgets.value
	expensesStore.expenses = expenses.value

	const totalBudgeted = computed(() => {
		return budgets.value.reduce((acc, budget) => {
			return (acc += budget.amount)
		}, 0)
	})
	const totalSpent = computed(() => {
		return expenses.value.reduce((acc, expense) => {
			return (acc += expense.amount)
		}, 0)
	})

	const { data: username } = await useAsyncData('profiles', async () => {
		const { data } = await client
			.from('profiles')
			.select('id,name')
			.eq('user_id', user.value.id)
		return data[0].name
	})

	watchEffect(
		() => {
			budgetStore.budgets = budgets.value
			expensesStore.expenses = expenses.value
		},
		{ immediate: true }
	)
</script>
