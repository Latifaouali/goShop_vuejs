<template>
  <NavBar />
  <div class="main">
    <h3>
      My Cart (<span style="color: var(--pink)"
        >{{ myItems.length }} items </span
      >)
    </h3>
    <div class="row g-4 content" style="margin-top: 6%">
      <div class="col-8">
        <div class="card mb-4" id="section-1">
          <table
            class="table tt-footable border-top footable footable-1 breakpoint-lg"
            data-use-parent-width="true"
            style=""
          >
            <thead>
              <tr class="footable-header">
                <th
                  class="text-center footable-first-visible"
                  style="display: table-cell"
                >
                  #
                </th>
                <th style="display: table-cell">Product Name</th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  U.Price
                </th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  Quantity
                </th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  T.Price
                </th>
                <th
                  data-breakpoints="xs sm md"
                  class="text-center footable-last-visible"
                  style="display: table-cell"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-for="(product, index) in myItems" :key="index">
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
                      <img :src="`${product.productID.picture} `" />
                    </div>
                    <h6 class="fs-sm mb-0 ms-2">
                      {{ product.productID.name }}
                    </h6>
                  </div>
                </td>
                <td style="display: table-cell">
                  <span>{{ product.productID.price }}MAD</span>
                </td>
                <td style="display: table-cell">
                  <div class="tt-tb-price fs-sm">
                    <span> {{ product.quantity }}</span>
                  </div>
                </td>
                <td style="display: table-cell">
                  <div class="tt-tb-price fs-sm">
                    <span class="text-accent">
                      {{ product.productID.price * product.quantity }}MAD
                    </span>
                  </div>
                </td>

                <td
                  class="text-end footable-last-visible"
                  style="display: table-cell"
                >
                  <div class="dropdown tt-tb-dropdown">
                    <button
                      type="button"
                      class="btn p-0 action"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end shadow">
                      <router-link
                        class="bi bi-eye dropdown-item"
                        :to="`/client/productDetails/${product.productID._id}`"
                      >
                        <span style="margin-left: 10px">View</span>
                      </router-link>

                      <a
                        class="bi bi-trash3 dropdown-item"
                        @click="removeFromCart(product.productID._id)"
                      >
                        <span style="margin-left: 10px"> Delete </span>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-4">
        <div
          class="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
          role="alert"
          v-if="orderSuccess"
        >
          <p>Thank you for your order!</p>
          <p>
            Your order has been successfully placed. We appreciate your
            business.
          </p>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div class="card cart-summery bg-white rounded-2 pt-2 pb-2 px-3">
          <table class="w-100">
            <tbody>
              <tr>
                <td class="py-3">
                  <h5 class="mb-0 fw-bold">Subtotal</h5>
                </td>
                <td class="py-3">
                  <h5 class="mb-0 text-end sub-total-price">
                    {{ subTotal }} MAD
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btns-group d-flex flex-wrap gap-3">
            <p>
              Click 'Buy Now' to secure and complete ypur purchase for all the
              items currently in your cart
            </p>
            <span id="tooltip">
              <button
                @click="orderProducts()"
                class="btn_order"
                :class="{ 'disabled-link': !isDisabled }"
              >
                Buy Now
              </button>
              <span class="w-100" v-if="!isDisabled" id="tooltiptext"
                >Please change your Profile and add your address and your phone
                number
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <h3>My orders</h3>
    <div class="card mb-4" id="section-2">
      <table
        class="table tt-footable border-top footable footable-1 breakpoint-lg"
        data-use-parent-width="true"
        style=""
      >
        <thead>
          <tr class="footable-header">
            <th
              class="text-center footable-first-visible"
              style="display: table-cell"
            >
              #
            </th>
            <th style="display: table-cell">Product Name</th>
            <th data-breakpoints="xs sm" style="display: table-cell">
              Placed On
            </th>
            <th data-breakpoints="xs sm" style="display: table-cell">
              Quantity
            </th>
            <th data-breakpoints="xs sm" style="display: table-cell">
              T.Price
            </th>
            <th data-breakpoints="xs sm" style="display: table-cell">
              Payment
            </th>
            <th data-breakpoints="xs sm" style="display: table-cell">Status</th>
          </tr>
        </thead>
        <tbody v-for="(product, index) in myOrders" :key="index">
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
                  <img :src="`${product.productID.picture} `" />
                </div>
                <h6 class="fs-sm mb-0 ms-2">
                  {{ product.productID.name }}
                </h6>
              </div>
            </td>
            <td style="display: table-cell">
              <span>{{ product.date }}MAD</span>
            </td>
            <td style="display: table-cell">
              <div class="tt-tb-price fs-sm">
                <span> {{ product.quantity }}</span>
              </div>
            </td>
            <td style="display: table-cell">
              <div class="tt-tb-price fs-sm">
                <span class="text-accent">
                  {{ product.productID.price * product.quantity }}MAD
                </span>
              </div>
            </td>

            <td style="display: table-cell">
              <div class="tt-tb-price fs-sm">
                <span class="text-accent badge rounded-pill bg-secondary">
                  {{ product.paymentStatus }}
                </span>
              </div>
            </td>

            <td style="display: table-cell">
              <div class="tt-tb-price fs-sm">
                <span class="text-accent badge rounded-pill bg-secondary">
                  {{ product.deliveryStatus }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const myOrders = computed(() => store.getters["moduleUser/getOrders"]);
const isDisabled = ref(false);
if (user.value.address && user.value.phone) {
  isDisabled.value = true;
}
let subTotal = computed(() => {
  return myItems.value.reduce((total, item) => {
    return total + item.productID.price * item.quantity;
  }, 0);
});
const orderSuccess = ref(false);
const cartData = ref({
  userID: user.value._id,
  productID: null,
});
const cart = ref(null);
const myItems = ref([]);

const itemRemoved = ref(false);
const orderItem = ref(false);
const removeFromCart = async (productID) => {
  try {
    cartData.value.productID = productID;
    await store.dispatch("moduleUser/removeFromCart", cartData.value);
    itemRemoved.value = true;
  } catch (error) {
    console.log(error);
  }
};

const fetchCart = async () => {
  try {
    await store.dispatch("moduleUser/fetchCart", user.value._id);
    myItems.value = cart.value && cart.value.items ? cart.value.items : [];
  } catch (error) {
    console.error(error);
  }
};

const fetchOrders = async () => {
  try {
    await store.dispatch("moduleUser/fetchOrders", user.value._id);
  } catch (error) {
    console.error(error);
  }
};

const orderData = ref({
  userID: user.value._id,
  paymentStatus: "unpaid",
  deliveryStatus: "Processing",
  productID: null,
  quantity: null,
});

const orderProducts = async () => {
  try {
    for (let i = 0; i < myItems.value.length; i++) {
      orderData.value.productID = myItems.value[i].productID._id;
      orderData.value.quantity = myItems.value[i].quantity;
      await store.dispatch("moduleUser/orderProducts", orderData.value);

      const removeCartData = {
        userID: user.value._id,
        productID: myItems.value[i].productID._id,
      };

      await store.dispatch("moduleUser/removeFromCart", removeCartData);
    }
    orderItem.value = true;
    orderSuccess.value = true;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCart();
  fetchOrders();
});

watchEffect(async () => {
  cart.value = store.getters["moduleUser/getCart"];
  if (itemRemoved.value) {
    await fetchCart();
    itemRemoved.value = false;
  }

  if (orderItem.value) {
    await fetchOrders();
    await fetchCart();
    orderItem.value = false;
  }
});
</script>

<style scoped>
/* Tooltip container */
#tooltip {
  position: relative;
  width: 100%;
}

/* Tooltip text */
#tooltip #tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 14%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
#tooltip #tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
#tooltip:hover #tooltiptext {
  visibility: visible;
  opacity: 1;
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
#section-1 {
  margin-left: 10%;
}
h3 {
  margin-top: 3%;
  font-weight: 600;
  color: #191d28;
  text-align: center;
}
thead th {
  text-align: center;
  background-color: #cbdce5;
  padding: 18px 10px;
  color: var(--blue);
  border-right: 2px solid #fff;
}
.dropdown-item {
  cursor: pointer;
}

.cart-summery td {
  color: var(--blue);
}
.btn_order {
  border: 2px solid var(--pink);
  border-radius: 3px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
  padding: 8px 13px;
  margin-top: 7px;
  font-weight: 500;
  width: 100%;
}

.btn_order:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}

.content {
  width: 99%;
}
.disabled-link {
  pointer-events: none;
  opacity: 0.5;
}
#section-2 {
  width: 87%;
  margin-left: 8%;
  margin-top: 5%;
}

@media (max-width: 886px) {
  .col-4 {
    margin-left: 9%;
    width: 67%;
  }
  .col-8 {
    width: 100%;
  }
}
</style>
