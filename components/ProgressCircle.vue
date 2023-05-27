<template>
	<div
		class="radial-progress text-primary"
		:style="`--value:${Math.round((spent / total) * 100)} ;--size:${size}rem;`"
	>
		<span class="countdown font-mono text-4xl">
			<span :style="`--value:${Math.round((spent / total) * 100)}; `"></span>%
		</span>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		spent: number
		total: number
		size: number
	}>()
</script>

<style></style>
