<template>
  <div class="container mx-auto px-4">
    <NuxtLink to="/account" class="font-bold">BACK</NuxtLink>
  </div>
  <div class="container mx-auto p-4">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold">{{ budget?.name }}</h1>
      <button class="btn btn-sm btn-error" @click="handleDelete(budget.id)">
        delete budget
      </button>
    </div>
  </div>

  <ProgressCircle :spent="100" :total="200" :size="12" />

  <div class="flex w-full justify-between md:flex-col md:justify-center gap-4">
    <div>
      <h3 class="text-base">Spent</h3>
      <p class="text-3xl font-bold">{{ formatCurrency(spent) }}</p>
    </div>
    <div>
      <h3 class="text-base">Remaining</h3>
      <p class="text-3xl font-bold">
        {{ formatCurrency(budget.amount - spent) }}
      </p>
    </div>
  </div>
  <Chart />
  <AddExpenseForm :bid="budget?.id" :bn="budget?.name" />
  <section class="mb-20">
    <div v-if="expenses.length > 0">
      <div class="text-3xl font-bold">Expenses</div>
      <Table
        :showBudget="false"
        :expenses="
          expenses.sort((a, b) => b.created_at - a.created_at).slice(0, 8)
        "
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBudgetStore } from "@/stores/BudgetStore";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { Budget } from "~/types";

const budgetStore = useBudgetStore();
const expensesStore = useExpensesStore();
const route = useRoute();

const budget: Ref<Budget | any> = ref();

budget.value = budgetStore.budgets.find((b) => b.id == route.params.id);

const expenses = computed({
  get() {
    return expensesStore.expenses.filter(
      (exp) => exp.budget_id == route.params.id
    );
  },
  set() {
    return expensesStore.expenses.filter(
      (exp) => exp.budget_id == route.params.id
    );
  },
});

const spent = computed({
  get() {
    return calculateSpentByBudget(budget.value.id);
  },
  set() {
    return calculateSpentByBudget(budget.value.id);
  },
});

async function handleDelete(id: string) {
  await budgetStore.deleteBudget(id);
  navigateTo("/account");
}
</script>

<style scoped></style>
