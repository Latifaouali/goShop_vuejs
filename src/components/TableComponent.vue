<template>
  <div class="card recent-sales overflow-auto">
    <div class="card-body">
      <h5 class="card-title">Recent Sales</h5>

      <div
        class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns"
      >
        <div class="datatable-container">
          <table class="table table-borderless datatable datatable-table">
            <thead>
              <tr>
                <th data-sortable="true" style="width: 10.855263157894738%">
                  #
                </th>
                <th
                  data-sortable="true"
                  style="width: 23.848684210526315%"
                  aria-sort="descending"
                  class="datatable-descending"
                >
                  Customer
                </th>
                <th data-sortable="true" style="width: 37.993421052631575%">
                  Product
                </th>
                <th data-sortable="true" style="width: 11.513157894736842%">
                  QTY
                </th>
                <th data-sortable="true" style="width: 11.513157894736842%">
                  Total price
                </th>
                <th data-sortable="true" style="width: 15.789473684210526%">
                  Status
                </th>
              </tr>
            </thead>
            <tbody v-for="(order, index) in recentSales" :key="index">
              <tr data-index="0">
                <td>
                  <a href="#">{{ index + 1 }}</a>
                </td>
                <td>{{ order.userID.userName }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'productView',
                      params: { id: order.productID._id },
                    }"
                    class="text-primary"
                    >{{ order.productID.name }}</router-link
                  >
                </td>
                <td>{{ order.quantity }}</td>
                <td>{{ order.productID.price * order.quantity }}MAD</td>
                <td>
                  <span class="paid"> {{ order.paymentStatus }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const orders = computed(() => store.getters["moduleSeller/getOrders"]);
const recentSales = ref([]);
const fetchOrders = async () => {
  await store.dispatch("moduleSeller/fetchOrders", user.value._id);
};
watchEffect(() => {
  if (orders.value) {
    recentSales.value = orders.value.filter((o) => o.paymentStatus === "paid");
  }
});
onMounted(fetchOrders);
</script>
<style scoped>
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
}

.card-header,
.card-footer {
  border-color: #ebeef4;
  background-color: #fff;
  color: #798eb3;
  padding: 15px;
}

.card-title {
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.card-title span {
  color: #899bbd;
  font-size: 14px;
  font-weight: 400;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.recent-sales {
  font-size: 14px;
}

.recent-sales .table thead {
  background: #f6f6fe;
}

.recent-sales .table thead th {
  border: 0;
}

.recent-sales .datatable-top {
  padding: 0 0 10px 0;
}

.recent-sales .datatable-bottom {
  padding: 10px 0 0 0;
}

.datatable-wrapper.no-footer .datatable-container {
  border-bottom: 1px solid #d9d9d9;
}

/* TABLE */
.datatable-table {
  max-width: 100%;
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
}

.datatable-table > tbody > tr > td,
.datatable-table > tbody > tr > th,
.datatable-table > tfoot > tr > td,
.datatable-table > tfoot > tr > th,
.datatable-table > thead > tr > td,
.datatable-table > thead > tr > th {
  vertical-align: top;
  padding: 8px 10px;
}

.datatable-table > thead > tr > th {
  vertical-align: bottom;
  text-align: left;
  border-bottom: 1px solid #d9d9d9;
}

.datatable-table > tfoot > tr > th {
  vertical-align: bottom;
  text-align: left;
  border-top: 1px solid #d9d9d9;
}

.datatable-table th {
  vertical-align: bottom;
  text-align: left;
}

.datatable-table th a {
  text-decoration: none;
  color: inherit;
}

.paid {
  background: #60d2371c;
  color: green;
}
</style>
