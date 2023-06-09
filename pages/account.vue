<template>
  <div class="relative">
    <section
      class="container mx-auto grid justify-center grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div class="p-4 flex flex-col gap-6">
        <h2 class="text-3xl font-bold">Hello, {{ username }}</h2>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="mx-auto self-center">
            <ProgressCircle
              :spent="totalSpent"
              :total="totalBudgeted"
              :size="12"
            />
          </div>
          <div
            class="flex w-full justify-between md:flex-col md:justify-center gap-4"
          >
            <div>
              <h3 class="text-base">Spent</h3>
              <p class="text-3xl font-bold">{{ formatCurrency(totalSpent) }}</p>
            </div>
            <div>
              <h3 class="text-base">Remaining</h3>
              <p class="text-3xl font-bold">
                {{ formatCurrency(totalBudgeted) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        ref="addBudgetDrawer"
        class="absolute left-0 top-0 p-4 bg-white h-full z-40 w-4/5 max-w-xl block md:hidden"
        @click="openAddBudget"
        :style="{
          transform: 'translateX(-100%)',
        }"
      >
        <AddBudgetForm />
      </div>
      <div class="hidden md:static md:translate-x-[0%] md:block md:w-full">
        <AddBudgetForm />
      </div>
    </section>
    <section class="py-8 px-4 bg-secondary/20 w-full">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-4">Budgets</h2>
        <div
          v-if="budgetStore.budgets?.length > 0"
          class="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div v-for="budget in budgetStore.budgets">
            <BudgetItem :key="budget.id" :budget="budget" />
          </div>
        </div>
        <div class="grid place-content-center" v-else>
          <p>Well it's about time we got started</p>
        </div>
      </div>
    </section>

    <section
      class="mb-20 p-4 container mx-auto grid justify-center grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div
        ref="addExpenseDrawer"
        class="absolute left-0 top-0 p-4 bg-white h-full z-40 w-3/4 max-w-xl drop-shadow-xl md:hidden"
        @click="openAddExpense"
        :style="{
          transform: 'translateX(-100%)',
        }"
      >
        <AddExpenseForm />
      </div>
      <div class="hidden md:static md:translate-x-[0%] md:block md:w-full">
        <AddExpenseForm />
      </div>
      <div v-if="expensesStore?.expenses.length > 0">
        <h2 class="text-3xl font-bold mb-4">Expenses</h2>
        <Table
          :showBudget="true"
          :expenses="
            expensesStore.expenses
              .sort((a, b) => b?.createdAt - a?.createdAt)
              .slice(0, 8)
          "
        />
      </div>
      <div class="grid place-content-center md:col-span-2" v-else>
        <p>You appear to have spent no money</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBudgetStore } from "@/stores/BudgetStore";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { animate } from "motion";

const budgetStore = useBudgetStore();
const expensesStore = useExpensesStore();

const addBudgetDrawer = ref();
const addExpenseDrawer = ref();

const { data: budgets } = useNuxtData("budgets");
const { data: expenses } = useNuxtData("expenses");

const { pending: budgetsPending, data: bud } = await useAsyncData(
  "budgets",
  () => $fetch("/api/budgets", { headers: useRequestHeaders(["cookie"]) })
);
const { pending: expensesPending, data: exp } = await useAsyncData(
  "expenses",
  () => $fetch("/api/expenses", { headers: useRequestHeaders(["cookie"]) })
);
budgetStore.budgets = budgets.value;
expensesStore.expenses = expenses.value;

const totalBudgeted = computed(() => {
  return budgets.value.reduce((acc, budget) => {
    return (acc = acc + budget.amount);
  }, 0);
});

const totalSpent = computed(() => {
  return expenses.value.reduce((acc, expense) => {
    return (acc += expense.amount);
  }, 0);
});

const user = useSupabaseUser();
const client = useSupabaseAuthClient();

const { pending, data: username } = await useAsyncData("profiles", async () => {
  const { data, error } = await client
    .from("profiles")
    .select("name")
    .eq("user_id", user.value.id)
    .single();

  return data.name;
});

// Add Budget Drawer

const openAddBudget = () => {
  animate(addBudgetDrawer.value, { transform: [null, "translateX(0%)"] });
  document.body.style.overflow = "hidden";
};

const closeAddBudget = () => {
  animate(addBudgetDrawer.value, { transform: [null, "translateX(-100%)"] });
  document.body.style.overflow = "auto";
};

const budgetDrawerToggle = inject("budgetDrawerToggle");

watch(budgetDrawerToggle, () => {
  if (budgetDrawerToggle.value) {
    openAddBudget();
  } else {
    closeAddBudget();
  }
});

// Add Expense Drawer

const openExpenseBudget = () => {
  animate(addExpenseDrawer.value, { transform: [null, "translateX(0%)"] });
  document.body.style.overflow = "hidden";
};

const closeExpenseBudget = () => {
  animate(addExpenseDrawer.value, { transform: [null, "translateX(-100%)"] });
  document.body.style.overflow = "auto";
};

const expenseDrawerToggle = inject("expenseDrawerToggle");

watch(expenseDrawerToggle, () => {
  if (expenseDrawerToggle.value) {
    openExpenseBudget();
  } else {
    closeExpenseBudget();
  }
});

watchEffect(
  () => {
    budgetStore.budgets = budgets.value;
    expensesStore.expenses = expenses.value;
  },
  { immediate: true }
);
</script>
