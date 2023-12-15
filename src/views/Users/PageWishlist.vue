<template>
  <NavBar />
  <div class="main">
    <h3>
      My Wishlist (<span style="color: var(--pink)"
        >{{ myItems.length }} items </span
      >)
    </h3>
    <div class="g-4" style="margin-top: 6%">
      <div class="col-11">
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
                  Category
                </th>
                <th data-breakpoints="xs sm" style="display: table-cell">
                  Price
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
                  <span class="badge rounded-pill bg-secondary">{{
                    product.productID.category
                  }}</span>
                </td>
                <td style="display: table-cell">
                  <div class="tt-tb-price fs-sm">
                    <span class="text-accent">
                      {{ product.productID.price }} MAD
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
                        @click="RemoveFromWishlist(product.productID._id)"
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
const itemRemoved = ref(false);
const wishlistData = ref({
  userID: user.value._id,
  productID: null,
});
const whishlist = ref(null);
const myItems = ref([]);

const RemoveFromWishlist = async (productID) => {
  try {
    wishlistData.value.productID = productID;
    await store.dispatch("moduleUser/removeFromwishlist", wishlistData.value);
    itemRemoved.value = true;
  } catch (error) {
    console.log(error);
  }
};

const fetchWishlist = async () => {
  try {
    await store.dispatch("moduleUser/fetchWhishlist", user.value._id);
    myItems.value =
      whishlist.value && whishlist.value.items ? whishlist.value.items : [];
  } catch (error) {
    console.error(error);
  }
};
onMounted(fetchWishlist);

watchEffect(() => {
  whishlist.value = store.getters["moduleUser/getWhishlist"];
  if (itemRemoved.value) {
    fetchWishlist();
    itemRemoved.value = false;
  }
});
</script>

<style scoped>
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
</style>
