<template>
	<div>
		Account: {{ username }}
		<button @click="logout">Sign Out</button>
		<div>Budgets</div>
		<ul>
			<li v-for="budget in budgets">
				<div :key="budget.id">{{ budget.name }} | {{ budget.amount }}</div>
			</li>
		</ul>

		<form @submit.prevent="addBudget">
			<input type="text" v-model="newBudgetName" placeholder="Budget Name" />
			<input
				type="text"
				v-model="newBudgetAmount"
				placeholder="Budget Amount"
			/>
			<button>Add Budget</button>
		</form>
		<div>Expenses</div>
		<ul>
			<li v-for="expense in expenses">
				<div :key="expense.id">{{ expense.name }} | {{ expense.amount }}</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth']
	})

	const client = useSupabaseAuthClient()
	const user = useSupabaseUser()

	const { data: username } = await useAsyncData('profiles', async () => {
		const { data } = await client
			.from('profiles')
			.select('id,name')
			.eq('user_id', user.value.id)
		return data[0].name
	})

	const { data: budgets } = await useAsyncData('budgets', async () => {
		const { data } = await client
			.from('budgets')
			.select('id,name,amount')
			.eq('user_id', user.value.id)
		return data
	})

	const { data: expenses } = await useAsyncData('expenses', async () => {
		const { data } = await client
			.from('expenses')
			.select('id,name,amount')
			.eq('user_id', user.value.id)
		return data
	})

	const newBudgetName = ref('')
	const newBudgetAmount = ref('')

	async function addBudget() {
		try {
			const { data } = await client
				.from('budgets')
				.upsert({
					user_id: user.value.id,
					name: newBudgetName.value,
					amount: newBudgetAmount.value
				})
				.select('id , name , amount')
				.single()

			newBudgetName.value = ''
			newBudgetAmount.value = ''
			budgets.value.push(data)
		} catch (error) {
			console.error(error)
		}
	}

	function logout() {
		client.auth.signOut()
	}
	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				navigateTo('/account')
			} else {
				navigateTo('/')
			}
		})
	})
</script>

<style lang="scss" scoped></style>
