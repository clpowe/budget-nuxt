<template>
	<nav class="navbar bg-neutral text-neutral-content">
		<div class="flex justify-between container mx-auto">
			<div class="">
				<NuxtLink to="/account" class="btn btn-ghost normal-case text-xl">
					Account
				</NuxtLink>
			</div>

			<button @click="logout" class="btn btn-secondary">Sign Out</button>
		</div>
	</nav>
</template>

<script setup>
	const user = useSupabaseUser()
	const client = useSupabaseAuthClient()
	const router = useRouter

	function logout() {
		client.auth.signOut()
		navigateTo('/')
	}
</script>
