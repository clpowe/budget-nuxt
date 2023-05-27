<template>
	<th>{{ expense.name }}</th>
	<td>{{ formatCurrency(expense.amount) }}</td>
	<td>{{ formatDateToLocaleString(expense.created_at) }}</td>
	<td v-if="showBudget">
		<NuxtLink class="btn" :to="`/budget/${expense.budget_id}`">
			{{ expense.budget_name }}
		</NuxtLink>
	</td>
	<td>
		<button @click="expensesStore.deleteExpense(expense.id)">delete</button>
	</td>
</template>

<script setup lang="ts">
	import { useExpensesStore } from '@/stores/ExpensesStore'
	import { Expense } from '~/types'

	const expensesStore = useExpensesStore()

	const props = defineProps<{
		expense: Expense
		showBudget: boolean
	}>()
</script>

<style scoped></style>
