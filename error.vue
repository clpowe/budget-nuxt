<template>
  <div>
    <Navigation />
    <div
      class="grid h-screen w-screen place-content-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500 to-cyan-600"
    >
      <div class="max-w-xl text-center gap-4 grid">
        <h1 class="text-8xl font-bold text-base-100">404</h1>
        <div class="text-3xl text-base-100">
          {{ error.message }}
        </div>
        <button
          class="btn btn-sm btn-secondary max-w-sm mx-auto"
          @click="handleError"
        >
          Return Home
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/account/" });
</script>
