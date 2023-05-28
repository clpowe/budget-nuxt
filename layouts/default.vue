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

provide(/* key */ "budgetDrawerToggle", budgetDrawerToggle);
</script>
