<template>
  <div id="container">
    <div class="row gx-3">
      <div class="col-lg-11">
        <div class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div
              v-for="(groupe, index) in visibleProducts"
              :key="index"
              :class="['carousel-item', { active: currentIndex === index }]"
            >
              <div class="row">
                <div
                  v-for="product in groupe"
                  :key="product.id"
                  class="product"
                >
                  <ProductCard :product="product._id" />
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev d-none d-lg-block"
            @click="prevSlide"
            :disabled="isPrevDisabled"
          >
            &lt;
          </button>
          <button
            class="carousel-control-next d-none d-lg-block"
            @click="nextSlide"
            :disabled="isNextDisabled"
          >
            >
          </button>
        </div>
      </div>
    </div>
    <!-- row //end -->
  </div>
</template>
<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { ref, computed, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
let products = ref([]);

const itemPerSlide = ref(5);
const currentIndex = ref(0);
const visibleProducts = ref([]);

const isNextDisabled = computed(() => {
  return currentIndex.value >= products.value.length - itemPerSlide.value;
});
const isPrevDisabled = computed(() => {
  return currentIndex.value <= 0;
});

const prevSlide = () => {
  if (!isPrevDisabled.value) {
    currentIndex.value =
      (currentIndex.value - 1 + products.value.length) % products.value.length;
  }
};

const nextSlide = () => {
  if (!isNextDisabled.value) {
    currentIndex.value = (currentIndex.value + 1) % products.value.length;
  }
};
onMounted(async () => {
  await store.dispatch("fetchPopulareProducts");
  const getProducts = computed(() => {
    return store.getters["getPopularProducts"];
  });
  products.value = getProducts.value;
});

watchEffect(() => {
  if (products.value.length > 0) {
    let start = currentIndex.value;
    visibleProducts.value.push(
      products.value.slice(start, start + itemPerSlide.value)
    );
  }
});
</script>

<style scoped>
#container {
  width: 99%;
}

.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product {
  text-align: center;
}

button {
  border-radius: 100%;
  padding: 9px 19px;
  color: white;
  background-color: #bdbdbd;
  border: none;
  height: 13%;
  text-align: center;
  margin-top: 12%;
  width: 7%;
}

.carousel-control-prev.d-none.d-lg-block {
  margin-left: -4%;
}
.carousel-control-next.d-none.d-lg-block {
  margin-right: -4%;
}

@media (max-width: 477px) {
  .product {
    width: 87%;
    margin-left: 5%;
    margin-top: 15px;
  }
  .col-lg-11 {
    margin-left: 0%;
  }
}

@media (min-width: 477px) {
  .product {
    width: 47%;
    margin-top: 15px;
    margin-left: 10px;
  }
}
@media (min-width: 563px) {
  .product {
    width: 40%;
    margin-left: 0;
  }
  .col-lg-11 {
    margin-left: 8%;
  }
  .gx-3 {
    width: 94%;
  }
}
@media (min-width: 768px) {
  .product {
    width: 28%;
    margin-left: 0;
  }
  .col-lg-11 {
    margin-left: 9%;
    width: 91%;
  }
  .gx-3 {
    width: 101%;
  }
}

@media (min-width: 992px) {
  .product {
    width: 20%;
  }
  .col-lg-11 {
    margin-left: 4%;
  }
}
@media (min-width: 1200px) {
  .product {
    width: 18%;
  }
  .col-lg-11 {
    margin-left: 8%;
  }
  .carousel-control-prev.d-none.d-lg-block {
    margin-left: -6%;
  }
  .carousel-control-next.d-none.d-lg-block {
    margin-right: 4%;
  }
}
</style>
