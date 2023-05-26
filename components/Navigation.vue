<template>
	<nav class="navbar bg-base-100 container mx-auto">
		<div class="flex-1">
			<NuxtLink to="/account" class="btn btn-ghost normal-case text-xl">
				Account: {{ username }}
			</NuxtLink>
		</div>
		<div class="flex-none">
			<button @click="logout">Sign Out</button>
		</div>
	</nav>
</template>

<script setup>
	const user = useSupabaseUser()
	const client = useSupabaseAuthClient()

	const { data: username } = await useAsyncData('profiles', async () => {
		const { data } = await client
			.from('profiles')
			.select('id,name')
			.eq('user_id', user.value.id)
		return data[0].name
	})

	function logout() {
		client.auth.signOut()
	}

	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/')
			}
		})
	})
</script>
