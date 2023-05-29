<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th
            v-for="(i, index) in [
              'Name',
              'Amount',
              'Date',
              showBudget ? 'Budget' : '',
              '',
            ]"
            key="index"
          >
            {{ i }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <ExpenseItem :expense="expense" :showBudget="showBudget" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Expense } from "~/types";
const props = defineProps<{
  showBudget: boolean;
  expenses: {
    type: Expense;
  };
}>();
</script>
