<template>
  <div id="container">
    <DashboardLayout v-if="user" :user="user" />
    <main class="main" id="main">
      <div class="card tt-page-header">
        <div
          class="card-body d-lg-flex align-items-center justify-content-lg-between"
        >
          <div class="tt-page-title">
            <h2 class="h5 mb-lg-0">Orders</h2>
          </div>
        </div>
      </div>

      <div class="row g-4" style="margin-top: 1%">
        <div class="col-12">
          <div class="card mb-4" id="section-1">
            <div class="card-header border-bottom-0">
              <div class="row justify-content-between g-3">
                <div class="col-auto flex-grow-1">
                  <div class="tt-search-box">
                    <div class="input-group">
                      <span
                        class="position-absolute top-50 start-0 translate-middle-y ms-2"
                      >
                      </span>
                      <input
                        class="form-control rounded-start w-100 bi bi-search"
                        type="text"
                        v-model.trim="search"
                        placeholder="Search customer"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-auto" data-select2-id="select2-data-9-c82m">
                  <div
                    class="input-group"
                    data-select2-id="select2-data-8-eyq1"
                  >
                    <select
                      class="form-select select2 select2-hidden-accessible"
                      name="brand_id"
                      aria-hidden="true"
                      v-model="selectedStatus"
                    >
                      <option value="" selected>Select Payment status</option>
                      <option value="paid" selected>paid</option>
                      <option value="unpaid" selected>unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <table
              class="table tt-footable border-top footable footable-1 breakpoint-lg"
              data-use-parent-width="true"
              style=""
            >
              <thead>
                <tr class="footable-header">
                  <th
                    class="text-center footable-first-visible blue"
                    style="display: table-cell"
                  >
                    #
                  </th>
                  <th class="blue" style="display: table-cell">Product Name</th>
                  <th class="blue" style="display: table-cell">Customer</th>
                  <th class="blue" style="display: table-cell">Placed On</th>
                  <th class="blue" style="display: table-cell">Payment</th>
                  <th class="blue" style="display: table-cell">Status</th>
                  <th class="blue" style="display: table-cell">Location</th>
                  <th
                    class="text-end footable-last-visible blue"
                    style="display: table-cell"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-for="(order, index) in filterdOrders" :key="index">
                <tr>
                  <td
                    class="text-center footable-first-visible"
                    style="display: table-cell"
                  >
                    <h6 class="fs-sm mb-0 ms-2">{{ index + 1 }}</h6>
                  </td>
                  <td style="display: table-cell">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-sm">
                        <img :src="`${order.productID.picture} `" />
                      </div>
                      <h6 class="fs-sm mb-0 ms-2">
                        {{ order.productID.name }}
                      </h6>
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-md">
                        <img
                          class="rounded-circle"
                          :src="order.userID.picture"
                        />
                      </div>
                      <div class="ms-2">
                        <h6 class="fs-sm mb-0">{{ order.userID.userName }}</h6>
                        <span class="text-muted fs-sm">
                          {{ order.userID.phone }}</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <div class="tt-tb-price fs-sm">
                      <span class="fs-sm"> {{ order.date }}</span>
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <div class="tt-tb-price fs-sm">
                      <span
                        class="badge rounded-pill"
                        :class="order.paymentStatus"
                      >
                        {{ order.paymentStatus }}</span
                      >
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <div class="tt-tb-price fs-sm">
                      <span class="badge rounded-pill statu">
                        {{ order.deliveryStatus }}</span
                      >
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <div class="tt-tb-price fs-sm">
                      <span> {{ order.userID.address }}</span>
                    </div>
                  </td>

                  <td
                    class="text-center footable-last-visible"
                    style="display: table-cell"
                  >
                    <router-link
                      :to="`/seller/order_details/${order._id}`"
                      class="btn p-0 action"
                    >
                      <i class="bi bi-eye blue"></i>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardLayout from "@/components/seller/DashboardLayout.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const orders = computed(() => store.getters["moduleSeller/getOrders"]);
const search = ref("");
const selectedStatus = ref("");
const serachCustomer = (customer) => {
  return orders.value.filter((order) =>
    order.userID.userName.toLowerCase().includes(customer.toLowerCase())
  );
};
const filterdOrders = computed(() => {
  let result = orders.value;
  if (selectedStatus.value) {
    result = orders.value.filter(
      (o) => o.paymentStatus === selectedStatus.value
    );
  }
  if (search.value) {
    result = serachCustomer(search.value);
  }
  return result;
});
const fetchOrders = async () => {
  await store.dispatch("moduleSeller/fetchOrders", user.value._id);
};
onMounted(fetchOrders);
</script>

<style scoped>
#container {
  background-color: #f6f9ff;
}

#main {
  margin-top: 60px;
  padding: 20px 30px;
  transition: all 0.3s;
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

.dropdown-item,
.dropdown-item span,
.action {
  font-size: 15px;
  font-weight: 600;
  color: var(--blue);
}
.avatar.avatar-sm {
  width: 1.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
#remove {
  color: red;
  border-color: red;
}

#remove:hover {
  background-color: red;
  color: white;
}

#add {
  color: white;
  background-color: green;
}
#add:hover {
  background: #056605;
}
.card {
  box-shadow: 0px 0 20px rgba(1, 41, 112, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: var(--blue);
}
h6 {
  margin-top: 0;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  line-height: 1.2;
  color: #212b36fa;
  font-size: 0.9rem;
}
.text-muted {
  color: #919eab !important;
}
.tt-tb-price.fs-sm {
  color: var(--blue);
}
.fs-sm {
  font-size: 0.866rem;
}
.overlay {
  background-color: rgba(9, 8, 8, 0.37);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.avatar.avatar-md {
  width: 2.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
}
.avatar {
  position: relative;
  display: inline-block;
}
.blue {
  color: var(--blue);
}

.paid {
  background: #60d2371c;
  color: green;
}
.unpaid {
  color: red;
  background: #ff00002e;
}
.statu {
  color: #fd9b01;
  background: #ffa5001c;
}
</style>
