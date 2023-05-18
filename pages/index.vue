<template>
	<div>
		<form v-if="!isSignUp" @submit.prevent="signUp">
			<input type="text" v-model="name" />
			<input type="email" v-model="email" />
			<input type="password" v-model="password" />
			<button type="submit">
				<span>Sign up</span>
			</button>
		</form>
		<form v-else @submit.prevent="login">
			<input type="email" v-model="email" />
			<input type="password" v-model="password" />
			<button type="submit">
				<span>Log in</span>
			</button>
		</form>
		<button @click="isSignUp = !isSignUp">
			<span v-show="isSignUp">Create a new account</span>
			<span v-show="!isSignUp">Have an account? Log in instead</span>
		</button>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth']
	})

	const name = ref('')
	const email = ref('')
	const password = ref('')
	const isSignUp = ref(false)
	const client = useSupabaseAuthClient()

	async function login() {
		const { user, error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value
		})
		console.log('error', error)
	}

	async function signUp() {
		const { user, error } = await client.auth.signUp({
			email: email.value,
			password: password.value
		})
		console.log('user', user)
		console.log('error', error.message)
	}

	const user = useSupabaseUser()

	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				navigateTo('/account')
			}
		})
	})
</script>

<style lang="scss" scoped></style>
