<template>
  <div id="container">
    <DashboardLayout v-if="user" :user="user" />
    <!-- add new product form -->
    <div v-show="showModel" class="overlay">
      <AddProductVue :userId="user._id" :close="close" />
    </div>
    <main class="main" id="main" v-show="!showModel">
      <div class="card tt-page-header">
        <div
          class="card-body d-lg-flex align-items-center justify-content-lg-between"
        >
          <div class="tt-page-title">
            <h2 class="h5 mb-lg-0">Products</h2>
          </div>
          <div class="tt-action">
            <button
              class="bi bi-plus-lg btn btn-outline"
              id="add"
              @click="showModel = true"
            >
              Add product
            </button>
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
                        placeholder="Search"
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
                      v-model="selectedCategory"
                    >
                      <option value="" selected>Select category</option>
                      <option
                        v-for="(category, index) in categories"
                        :key="index"
                        :value="category"
                      >
                        {{ category }}
                      </option>
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
                    class="text-end footable-last-visible"
                    style="display: table-cell"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-for="(product, index) in filteredProducts" :key="index">
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
                        <img :src="`${product.picture} `" />
                      </div>
                      <h6 class="fs-sm mb-0 ms-2">{{ product.name }}</h6>
                    </div>
                  </td>
                  <td style="display: table-cell">
                    <span class="badge rounded-pill bg-secondary">{{
                      product.category
                    }}</span>
                  </td>
                  <td style="display: table-cell">
                    <div class="tt-tb-price fs-sm">
                      <span class="text-accent"> {{ product.price }} MAD </span>
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
                          class="bi bi-pen dropdown-item"
                          :to="`/seller/productView/${product._id}`"
                        >
                          <span style="margin-left: 10px">Edit</span>
                        </router-link>

                        <button
                          class="bi bi-trash3 dropdown-item"
                          @click="removeProduct(product._id)"
                        >
                          <span style="margin-left: 10px"> Remove </span>
                        </button>
                      </div>
                    </div>
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
import AddProductVue from "@/components/seller/AddProduct.vue";
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const showModel = ref(false);
const productRemoved = ref(false);

const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const myProducts = computed(() => store.getters["moduleSeller/getMyProducts"]);
const categories = computed(() => store.getters["getCategory"]);
const close = () => {
  showModel.value = false;
};

const search = ref("");
const selectedCategory = ref("");
const searchProduct = (query) => {
  return myProducts.value.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};
const filteredProducts = computed(() => {
  let result = myProducts.value;

  if (selectedCategory.value) {
    result = result.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  if (search.value) {
    result = searchProduct(search.value, result);
  }

  return result;
});

const removeProduct = async (productID) => {
  try {
    await store.dispatch("moduleSeller/deleteProduct", productID);
    productRemoved.value = true;
  } catch (error) {
    console.log(error);
  }
};
const fetchProducts = async () => {
  await store.dispatch("moduleSeller/fetchMyProducts", user.value._id);
};

watchEffect(() => {
  if (productRemoved.value) {
    fetchProducts();
    productRemoved.value = false;
  }
});
onMounted(fetchProducts);
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
.tt-tb-price.fs-sm {
  color: var(--blue);
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
</style>
