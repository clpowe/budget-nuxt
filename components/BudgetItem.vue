<template>
	<div class="card card-compact w-96 bg-base-100 shadow-xl p-4">
		<div>{{ budget.name }}</div>
		<div>{{ formatCurrency(budget.amount) }} budgeted</div>
		<div
			class="radial-progress text-primary"
			:style="`--value:${Math.round(
				(spent / budget.amount) * 100
			)} ;--size:8rem;`"
		>
			<span class="countdown font-mono text-4xl">
				<span
					:style="`--value:${Math.round((spent / budget.amount) * 100)}; `"
				></span
				>%
			</span>
			<!-- {{ formatPercentage(spent / budget.amount) }} -->
		</div>
		<!-- <progress :max="budget.amount" :value="spent">
						 {{ formatPercentage(spent / budget.amount) }}
					 </progress> -->
		<div className="progress-text">
			<small>{{ formatCurrency(spent) }}</small>
			<small>{{ formatCurrency(budget.amount - spent) }}</small>
		</div>
		<NuxtLink class="btn" :to="`budget/${budget.id}`">View Details</NuxtLink>
	</div>
</template>

<script setup lang="ts">
	import { Budget } from '~/types'

	const props = defineProps<{
		budget: Budget
	}>()

	const spent = computed({
		get() {
			return calculateSpentByBudget(props.budget.id)
		},
		set() {
			return calculateSpentByBudget(props.budget.id)
		}
	})
</script>

<style lang="scss" scoped></style>
