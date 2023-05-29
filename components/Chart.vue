<script setup>
import { Line, Bar } from "vue-chartjs";

const data = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};
</script>

<template>
  <Line :data="data" />
</template>
