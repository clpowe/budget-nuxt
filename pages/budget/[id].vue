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
  <div class="container mx-auto p-4">
    <ProgressCircle :spent="100" :total="200" :size="12" />
    <div
      class="flex w-full justify-between md:flex-col md:justify-center gap-4"
    >
      <div>
        <h3 class="text-base">Total Spent</h3>
        <p class="text-3xl font-bold">{{ formatCurrency(spent) }}</p>
      </div>
      <div>
        <h3 class="text-base">Amount Remaining</h3>
        <p class="text-3xl font-bold">
          {{ formatCurrency(budget.amount - spent) }}
        </p>
      </div>
    </div>
  </div>

  <section class="container mx-auto p-4 mb-20 grid gap-4">
    <AddExpenseForm :bid="budget?.id" :bn="budget?.name" />
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

if (!budget.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Check your couch cousions I cant find the envelope here",
  });
}

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

const chart = computed(() => {
  const days = new Set();
  expenses.value.forEach((exp) => days.add(new Date(exp.created_at).getDay()));
  function logSetElements(value1: any, value2: any, set: any) {
    const amount = expenses.value.reduce((acc: any, exp) => {
      if (new Date(exp.created_at).getDay() === value1) {
        acc = acc += exp.amount;
        return acc;
      }
    }, 0);
    set[value1] = amount;
  }
  days.forEach(logSetElements);
  return days;
});
</script>
