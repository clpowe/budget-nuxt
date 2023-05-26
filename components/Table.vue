<template>
	<div>
		<table class="table w-full">
			<thead>
				<tr>
					<th
						v-for="(i, index) in [
							'Name',
							'Amount',
							'Date',
							showBudget ? 'Budget' : '',
							''
						]"
						key="index"
					>
						{{ i }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="expense in expenses" :key="expense.id">
					<ExpenseItem :expense="expense" :showBudget="showBudget" />
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
	import { Expense } from '~/types'
	const props = defineProps<{
		showBudget: { type: Boolean; default: true }
		expenses: {
			type: Expense
		}
	}>()
</script>
