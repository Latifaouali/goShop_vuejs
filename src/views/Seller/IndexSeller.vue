<template>
  <div id="container_seller">
    <DashboardLayout v-if="user" :user="user" />
    <main class="main" id="main">
      <div class="row">
        <div class="col-xxl-4 col-md-6">
          <CardComponent :cardInfo="card1" />
        </div>
        <div class="col-xxl-4 col-md-6">
          <CardComponent :cardInfo="card2" />
        </div>
        <div class="col-xxl-4 col-xl-12">
          <TableComponent />
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const totalSales = computed(() => store.getters["moduleSeller/gettotalSales"]);
const totalMoney = computed(() => store.getters["moduleSeller/gettotalMoney"]);
import DashboardLayout from "@/components/seller/DashboardLayout.vue";
import CardComponent from "@/components/CardComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import { ref } from "vue";

const card1 = ref({
  title: "sales",
  number: null,
  color: "#f6f6fe",
  icon: "bi bi-cart",
  icon_color: "#4154f1",
});

const card2 = ref({
  title: "Revenu",
  number: null,
  color: "#e0f8e9",
  icon: "bi bi-currency-dollar",
  icon_color: "#2eca6a",
});

watchEffect(() => {
  if (totalSales.value) {
    card1.value.number = totalSales.value;
  }
  if (totalMoney.value) {
    card2.value.number = totalMoney.value + "MAD";
  }
});

onMounted(async () => {
  await store.dispatch("moduleSeller/salesSummary");
});
</script>

<style>
#container_seller {
  background-color: #cbdce578;
}
#main {
  margin-top: 60px;
  padding: 20px 30px;
  transition: all 0.3s;
  height: 100vh;
}

@media screen and (min-width: 992px) and (max-width: 1092px) {
  #main {
    margin-left: 30%;
  }
}

@media screen and (min-width: 1093px) {
  #main {
    margin-left: 25%;
  }
}
</style>
