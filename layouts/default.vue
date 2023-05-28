<template>
  <Navigation data-theme="light" />
  <div data-theme="light" class="">
    <slot />
  </div>
  <Footer class="z-40" />
</template>

<script setup>
const user = useSupabaseUser();

const budgetDrawerToggle = ref(false);
const expenseDrawerToggle = ref(false);

provide("budgetDrawerToggle", budgetDrawerToggle);
provide("expenseDrawerToggle", expenseDrawerToggle);
</script>
