<template>
  <NavBar />
  <main class="main" id="main_p">
    <div class="d-flex flex-wrap">
      <input
        type="text"
        placeholder="Search"
        v-model.trim="search"
        class="search"
      />
      <span class="bi bi-search icon"></span>
    </div>
    <h1>choose <span style="color: var(--pink)"> your category </span></h1>
    <div class="d-flex flex-wrap">
      <div
        class="card"
        @click="getAll"
        :class="{ active: activeCategory === 'all' }"
      >
        <span class="bi bi-check-all"></span>
        <p>show all products</p>
      </div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="card"
        @click="getByCategory(category)"
        :class="{ active: activeCategory === category }"
      >
        <span :class="icons[index]"></span>
        <p>{{ category }}</p>
      </div>
    </div>
    <div class="products d-flex flex-wrap">
      <div v-if="message" style="margin-left: 33%; font-size: 25px; color: red">
        {{ message }} !
      </div>
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </main>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import ProductCard from "@/components/ProductCard.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const search = ref("");
const message = ref("");
const activeCategory = ref("all");
const getProducts = computed(() => store.getters["getProducts"]);
const categories = computed(() => store.getters["getCategory"]);
const icons = ref([
  "bi bi-sunglasses",
  "bi bi-lightning-charge",
  "bi bi-house",
  "bi bi-car-front",
  "bi bi-palette",
  "bi bi-trophy",
  "bi bi-heart",
  "bi bi-book",
]);
const Products = ref([]);
onMounted(async () => {
  await store.dispatch("fetchProducts");
  Products.value = getProducts.value;
});
const searchProduct = (query) => {
  return Products.value.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};
const filteredProducts = computed(() => {
  let result = Products.value;

  if (search.value) {
    result = searchProduct(search.value, result);
  }

  return result;
});

// watchEffect(() => {
//   if (Search.value) {
//     Products.value = Products.value.filter((p) =>
//       p.name.toLowerCase().includes(Search.value.toLowerCase())
//     );
//   } else {
//     message.value = "";
//     activeCategory.value = 'all';
//     Products.value = [...getProducts.value];
//   }
// });
const getAll = () => {
  message.value = "";
  activeCategory.value = "all";
  Products.value = getProducts.value;
};

const getByCategory = (category) => {
  activeCategory.value = category;
  Products.value = getProducts.value.filter((p) => p.category === category);
  if (Products.value.length === 0) {
    message.value = "No products found in this category";
  } else {
    message.value = "";
  }
};
</script>

<style scoped>
.card {
  background-color: #f0f0f0;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1%;
  margin-left: 1%;
  width: 129px;
}

.card:hover,
.active {
  background-color: #cbdce5;
  border: 1px solid var(--blue);
  color: var(--blue);
}

#main_p {
  margin-top: 60px;
  transition: all 0.3s;
  background: white;
  margin-left: 4%;
  border-radius: 10px;
}

.products {
  margin-top: 43px;
}
.product {
  text-align: center;
  margin-top: 3%;
}

h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 598;
  font-family: "Quicksand", sans-serif;
  line-height: 1.2;
  margin-bottom: 40px;
  margin-top: 40px;
}

.icon {
  right: 27px;
  top: 10px;
  position: relative;
  color: var(--blue);
}
.card p {
  margin-top: 5px;
  margin-left: 8px;
}
.card span {
  font-size: 25px;
}

@media (max-width: 477px) {
  .product {
    width: 85%;
    margin-left: 5%;
  }
  .search {
    width: 92%;
    margin-left: 0;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    border-radius: 3px;
  }
}

@media (min-width: 477px) {
  .product {
    width: 61%;
    margin-left: 12%;
  }
  .search {
    width: 92%;
    margin-left: 0;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    border-radius: 3px;
  }
}
@media (min-width: 478px) {
  .product {
    width: 47%;
    margin-left: 1%;
  }
  .search {
    width: 92%;
    margin-left: 0;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    border-radius: 3px;
  }
}
@media (min-width: 653px) {
  .product {
    width: 30%;
    margin-left: 2%;
  }
  .search {
    width: 92%;
    margin-left: 0;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    border-radius: 3px;
  }
}
@media (min-width: 768px) {
  .product {
    width: 26%;
    margin-left: 5%;
  }
  .search {
    width: 43%;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    margin-left: 25%;
    border-radius: 3px;
  }
}

@media (min-width: 992px) {
  .product {
    width: 20%;
    margin-left: 3%;
  }
  .search {
    width: 43%;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    margin-left: 25%;
    border-radius: 3px;
  }
}
@media (min-width: 1200px) {
  .product {
    width: 16%;
    margin-left: 3%;
  }
  .search {
    width: 43%;
    padding: 9px 9px;
    border: 1px solid var(--blue);
    margin-left: 25%;
    border-radius: 3px;
  }
}
</style>
