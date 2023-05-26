<template>
	<div class="card card-compact bg-base-100 shadow-xl p-4">
		<h2>Add Expense</h2>
		<form @submit.prevent="addExpense" class="space-y-4">
			<div>
				<label class="label" for="expenseName">
					<span class="label-text">Expense Name</span>
				</label>
				<input
					id="expenseName"
					type="text"
					v-model="name"
					placeholder="Expense Name"
					required
					class="input input-bordered input-md w-full"
				/>
			</div>
			<div>
				<label class="label">
					<span class="label-text">Enter amount</span>
				</label>
				<label class="input-group w-full">
					<input
						type="text"
						v-model="amount"
						placeholder="Expense Amount"
						class="input input-bordered w-full"
						required
					/>
					<span>USD</span>
				</label>
			</div>

			<select
				v-model="selected_budget"
				v-if="!bid"
				class="select select-bordered select-sm w-full"
			>
				<template v-for="budget in budgetStore.budgets" :key="budget.id">
					<option :value="budget">{{ budget.name }}</option>
				</template>
			</select>

			<button class="btn">Add Expense</button>
		</form>
	</div>
</template>

<script setup>
	import { useExpensesStore } from '@/stores/ExpensesStore'
	import { useBudgetStore } from '@/stores/BudgetStore'
	const client = useSupabaseAuthClient()
	const user = useSupabaseUser()

	const expensesStore = useExpensesStore()
	const budgetStore = useBudgetStore()

	const name = ref('')
	const amount = ref('')

	const props = defineProps(['bid', 'bn'])
	const selected_budget = ref(null)
	const budget_id = ref(props.bid)
	const budget_name = ref(props.bn)

	watchEffect(() => {
		if (selected_budget.value) {
			budget_id.value = selected_budget.value.id
			budget_name.value = selected_budget.value.name
		}
	})

	async function addExpense() {
		try {
			const { data } = await client
				.from('expenses')
				.upsert({
					user_id: user.value.id,
					name: name.value,
					amount: amount.value,
					budget_id: budget_id.value,
					budget_name: budget_name.value
				})
				.select('id , name , amount, budget_id, budget_name, created_at')
				.single()

			expensesStore.$patch((state) => {
				state.expenses.push(data)
			})

			name.value = ''
			amount.value = ''
		} catch (error) {
			console.error(error)
		}
	}
</script>

<style lang="scss" scoped></style>
