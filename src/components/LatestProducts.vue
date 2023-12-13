<template>
  <div class="container-fluid pt-5">
    <div class="row px-xl-5 pb-3">
      <h4>Latest Clothing and Fashion</h4>

      <div
        class="col-lg-3 col-md-4 col-sm-6 pb-1"
        v-for="product in latestClothes"
        :key="product.id"
      >
        <router-link
          :to="{ name: 'productDetails', params: { id: product._id } }"
        >
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img
                class="img-fluid"
                :src="`../../products/${product.picture}`"
                alt=""
              />
            </div>
            <div class="flex-fill pl-3">
              <h6>{{ product.name }}</h6>
              <small class="text-body">{{ product.price }} MAD</small>
            </div>
          </div>
        </router-link>
      </div>

      <h4>Latest Furniture and Home</h4>
      <div
        class="col-lg-3 col-md-4 col-sm-6 pb-1"
        v-for="product in latestFourniture"
        :key="product.id"
      >
        <router-link
          :to="{ name: 'productDetails', params: { id: product._id } }"
        >
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img
                class="img-fluid"
                :src="`../../products/${product.picture}`"
                alt=""
              />
            </div>
            <div class="flex-fill pl-3">
              <h6>{{ product.name }}</h6>
              <small class="text-body">{{ product.price }} MAD</small>
            </div>
          </div>
        </router-link>
      </div>

      <h4>Latest Electronics</h4>
      <div
        class="col-lg-3 col-md-4 col-sm-6 pb-1"
        v-for="product in latestElectro"
        :key="product.id"
      >
        <router-link
          :to="{ name: 'productDetails', params: { id: product._id } }"
        >
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img
                class="img-fluid"
                :src="`../../products/${product.picture}`"
                alt=""
              />
            </div>
            <div class="flex-fill pl-3">
              <h6>{{ product.name }}</h6>
              <small class="text-body">{{ product.price }} MAD</small>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
let Clothes = ref([]);
let Fourniture = ref([]);
let Electronic = ref([]);
const latestClothes = ref([]);
const latestFourniture = ref([]);
const latestElectro = ref([]);

onMounted(async () => {
  await store.dispatch("fetchProducts");
  const getProducts = computed(() => {
    return store.getters["getProducts"];
  });
  Clothes.value = getProducts.value.filter(
    (product) => product.category === "Clothing and Fashion"
  );
  latestClothes.value = Clothes.value.slice(0, 4);

  Fourniture.value = getProducts.value.filter(
    (product) => product.category === "Furniture and Home"
  );
  latestFourniture.value = Fourniture.value.slice(0, 4);

  Electronic.value = getProducts.value.filter(
    (product) => product.category === "Electronics"
  );
  latestElectro.value = Electronic.value.slice(0, 4);
});
</script>

<style scoped>
.container-fluid {
  background-color: #cbdce5;
  border: 2px dashed var(--blue);
}

.cat-item {
  border-radius: 6px;
  background-color: white;
  margin-left: 1px;
  width: 90%;
}

.img-fluid {
  max-width: 100%;
  height: 100%;
}

h4 {
  margin-bottom: 30px;
  font-weight: 599;
  color: #191d28;
}
a {
  text-decoration: none;
}
</style>
