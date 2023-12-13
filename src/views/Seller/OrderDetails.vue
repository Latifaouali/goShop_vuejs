<template>
  <div id="container">
    <DashboardLayout v-if="user" :user="user" />
    <main class="main" id="main" v-if="order">
      <div class="card tt-page-header">
        <div
          class="card-body d-lg-flex align-items-center justify-content-lg-between"
        >
          <div class="tt-page-title">
            <h2 class="h5 mb-lg-0">order details</h2>
          </div>
        </div>
      </div>
      <div
        class="alert alert-success bg-success text-light border-0 mt-5 alert-dismissible fade show"
        role="alert"
        v-if="updateSuccess"
      >
        <p class="text-white">Your order has been successfully updated</p>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="alert"
          @click="close"
        ></button>
      </div>
      <div class="card mb-3" style="margin-top: 8%">
        <div class="card mb-4" id="section-1">
          <div class="card-header border-bottom-0">
            <!--order status-->
            <div class="row justify-content-between align-items-center g-3">
              <div class="col-auto col-lg-3">
                <span class="text-muted">Order Date: {{ order.date }} </span>
                <div></div>
              </div>

              <div class="col-auto col-lg-3">
                <label class="form-label text-muted">Payment Status</label>
                <div class="input-group">
                  <select
                    class="form-select select2 select2-hidden-accessible"
                    v-model="orderData.paymentStatus"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              <div class="col-auto col-lg-3">
                <label class="form-label text-muted">Delivery Status</label>
                <div class="input-group">
                  <select
                    class="form-select select2 select2-hidden-accessible"
                    v-model="orderData.deliveryStatus"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <button class="btn btn-outline edit" @click="updateOrder">
                save chnages
              </button>
            </div>
          </div>

          <!--customer info-->
          <div class="card-body">
            <div class="row justify-content-between g-3">
              <div class="col-xl-4 col-lg-6">
                <div class="welcome-message">
                  <h6 class="mb-2">Customer Info</h6>
                  <p class="mb-0">Name: {{ order.userID.userName }}</p>
                  <p class="mb-0">Email: {{ order.userID.email }}</p>
                  <p class="mb-0">Phone: {{ order.userID.phone }}</p>
                </div>
              </div>
              <div class="col-xl-7 col-lg-6">
                <div class="shipping-address d-flex">
                  <div class="pe-2">
                    <h6 class="mb-2">Address</h6>
                    <p class="mb-0">{{ order.userID.address }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--order details-->
          <table
            class="table tt-footable border-top footable footable-1 breakpoint-lg"
            data-use-parent-width="true"
            style=""
          >
            <thead>
              <tr class="footable-header">
                <th style="display: table-cell">Product Name</th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  Unit Price
                </th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  QTY
                </th>
                <th
                  data-breakpoints="xs sm"
                  class="text-end footable-last-visible"
                  style="display: table-cell"
                >
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style="display: table-cell">
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-sm">
                      <img
                        :src="`../../products/${order.productID.picture} `"
                        alt=""
                        class="rounded-circle"
                      />
                    </div>
                    <div class="ms-2">
                      <h6 class="fs-sm mb-0">{{ order.productID.name }}</h6>
                      <div class="text-muted"></div>
                    </div>
                  </div>
                </td>
                <td class="tt-tb-price" style="display: table-cell">
                  <span class="fw-bold">{{ order.productID.price }} </span>
                </td>
                <td class="fw-bold" style="display: table-cell">
                  {{ order.quantity }}
                </td>
                <td
                  class="tt-tb-price text-end footable-last-visible"
                  style="display: table-cell"
                >
                  <span class="text-accent fw-bold"
                    >{{ order.productID.price * order.quantity }}MAD
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardLayout from "@/components/seller/DashboardLayout.vue";
import { computed, ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const route = useRoute();
const orderID = computed(() => route.params.orderID);
const order = computed(() => store.getters["moduleSeller/getOrder"]);
const updateSuccess = ref(false);
const close = () => {
  updateSuccess.value = false;
};
const orderData = ref({
  orderID: orderID.value,
  paymentStatus: null,
  deliveryStatus: null,
});

const getOrder = async () => {
  try {
    await store.dispatch("moduleSeller/getOrderById", orderID.value);
  } catch (error) {
    console.error(error);
  }
};

const updateOrder = async () => {
  try {
    await store.dispatch("moduleSeller/updateOrder", orderData.value);
    updateSuccess.value = true;
  } catch (error) {
    console.error(error);
  }
};
onMounted(getOrder);

watchEffect(() => {
  if (order.value) {
    orderData.value.paymentStatus = order.value.paymentStatus;
    orderData.value.deliveryStatus = order.value.deliveryStatus;
  }
});
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
.card-header {
  background: #eaeef0;
}
.edit {
  font-size: 14px;
  font-weight: bold;
  width: 15%;
  padding: 10px 10px;
  background: green;
  color: white;
}
.edit:hover {
  background: #056605;
}
h6 {
  margin-top: 0;
  margin-bottom: 0.625rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  line-height: 1.2;
  color: var(--blue);
}
p {
  font-size: 15px;
  font-weight: 600;
  color: #595959;
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
</style>
