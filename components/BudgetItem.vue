<template>
  <NuxtLink :to="`/budget/${budget.id}`">
    <figure
      class="card card-compact bg-base-100 shadow-xl p-4 flex items-center gap-2"
    >
      <h4 class="font-bold">{{ budget.name }}</h4>

      <ProgressCircle :spent="spent" :total="budget.amount" :size="8" />

      <div className="progress-text">
        <p class="font-bold">Available</p>
        <p class="text-xl">{{ formatCurrency(budget.amount - spent) }}</p>
      </div>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Budget } from "~/types";

const props = defineProps<{
  budget: Budget;
}>();

const spent = computed({
  get() {
    return calculateSpentByBudget(props.budget.id);
  },
  set() {
    return calculateSpentByBudget(props.budget.id);
  },
});
</script>

<style lang="scss" scoped></style>
