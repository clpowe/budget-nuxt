<template>
	<Navigation v-if="user" data-theme="light" />
	<div data-theme="light" class="">
		<slot />
	</div>
	<Footer class="z-40" v-if="user" />
</template>

<script setup>
	const user = useSupabaseUser()
</script>
