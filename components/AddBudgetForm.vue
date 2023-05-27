<template>
	<div class="card card-compact bg-base-100 shadow-xl p-4">
		<h2 class="text-3xl font-bold">Add Budget</h2>
		<form @submit.prevent="addBudget" class="grid gap-3">
			<div>
				<label class="label" for="budgetName">
					<span class="label-text">Budget Name</span>
				</label>
				<input
					type="text"
					id="budgetName"
					v-model="newBudgetName"
					placeholder="Enter budget name"
					class="input input-bordered input-md w-full"
				/>
			</div>
			<div>
				<label class="label" for="budgetAmount">
					<span class="label-text">Amount</span>
				</label>
				<input
					type="text"
					id="budgetAmount"
					class="input input-md input-bordered w-full"
					v-model="newBudgetAmount"
					placeholder="Enter budget amount"
				/>
			</div>
			<button class="btn btn-secondary w-32">Add Budget</button>
		</form>
	</div>
</template>

<script setup>
	import { useBudgetStore } from '@/stores/BudgetStore'
	const client = useSupabaseAuthClient()
	const user = useSupabaseUser()

	const budgetStore = useBudgetStore()

	const newBudgetName = ref('')
	const newBudgetAmount = ref('')

	async function addBudget() {
		try {
			const { data, error } = await client
				.from('budgets')
				.upsert({
					user_id: user.value.id,
					name: newBudgetName.value,
					amount: newBudgetAmount.value
				})
				.select('id , name , amount')
				.single()

			console.log(error)
			budgetStore.$patch((state) => {
				state.budgets.push(data)
				state.hasChanged = true
			})

			newBudgetName.value = ''
			newBudgetAmount.value = ''
		} catch (error) {
			console.error(error.message)
		}
	}
</script>

<style scoped></style>
