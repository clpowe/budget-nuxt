<template>
  <footer
    class="bg-neutral text-neutral-content fixed bottom-0 w-full z-10 p-4"
  >
    <div class="container flex justify-between mx-auto">
      <button class="btn btn-secondary w-32" @click="toggleBudgetDrawer">
        Add Budget
      </button>
      <button class="btn btn-secondary w-40" @click="toggleExpenseDrawer">
        Add Expense
      </button>
    </div>
  </footer>
</template>

<script setup>
const budgetDrawerToggle = inject("budgetDrawerToggle");

function toggleBudgetDrawer() {
  if (expenseDrawerToggle.value) {
    expenseDrawerToggle.value = false;
    budgetDrawerToggle.value = !budgetDrawerToggle.value;
    return;
  }
  budgetDrawerToggle.value = !budgetDrawerToggle.value;
}

const expenseDrawerToggle = inject("expenseDrawerToggle");

function toggleExpenseDrawer() {
  if (budgetDrawerToggle.value) {
    budgetDrawerToggle.value = false;
    expenseDrawerToggle.value = !expenseDrawerToggle.value;
    return;
  }
  expenseDrawerToggle.value = !expenseDrawerToggle.value;
}
</script>
