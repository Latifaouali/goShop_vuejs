<template>
  <div id="container">
    <DashboardLayout v-if="user" :user="user" />
    <!-- update forms -->
    <div v-for="editElement in editInfo" :key="editElement.title">
      <div v-if="editElement.isEdit" class="overlay">
        <EditComponent
          :editInfo="editElement"
          :id="id"
          :close="closeEditComponent"
        />
      </div>
    </div>
    <main
      class="main"
      id="main"
      v-if="
        !editInfo[0].isEdit &
        !editInfo[1].isEdit &
        !editInfo[2].isEdit &
        !editInfo[3].isEdit &
        !editInfo[4].isEdit
      "
    >
      <div class="card mb-3">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img
                  v-if="product && product.picture"
                  :src="`${product.picture}`"
                />
              </div>
              <button
                class="bi bi-pen edit btn btn-outline mt-2"
                style="width: 82%"
                @click="editInfo[0].isEdit = true"
              >
                Edit picture
              </button>
            </div>
          </div>
          <div class="details col-md-6">
            <div class="title">
              <h4 class="product-title">{{ product.name }}</h4>
              <button
                class="bi bi-pen edit btn btn-outline"
                @click="editInfo[1].isEdit = true"
                id="tooltip"
              >
                <span id="tooltiptext">Edit name </span>
              </button>
            </div>
            <div class="title" style="margin-top: 0.5rem; color: var(--orange)">
              <h5 class="price">{{ product.price }} MAD</h5>
              <button
                class="bi bi-pen edit btn btn-outline"
                @click="editInfo[3].isEdit = true"
                id="tooltip"
              >
                <span id="tooltiptext">Edit price </span>
              </button>
            </div>
            <p class="bi bi-star-fill" style="color: #f0ea08e5">
              <span style="color: black">({{ calculateRating }})</span>
            </p>
            <div class="widget-title d-flex mt-4">
              <h6 class="mb-1 flex-shrink-0">Description</h6>
              <span
                class="hr-line position-relative d-block align-self-end ms-1"
              ></span>
            </div>
            <p class="product-description">
              {{ product.description }}
            </p>
            <button
              class="bi bi-pen edit btn btn-outline"
              @click="editInfo[2].isEdit = true"
            >
              Edit description
            </button>
            <div class="title" style="margin-top: 5%">
              <h6 class="price">
                Category: <span>{{ product.category }}</span>
              </h6>
              <button
                class="bi bi-pen edit btn btn-outline"
                @click="editInfo[4].isEdit = true"
                id="tooltip"
              >
                <span id="tooltiptext">Edit category </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Comments</h1>

      <ReviewComponent :productID="id" />
    </main>
  </div>
</template>

<script setup>
import DashboardLayout from "@/components/seller/DashboardLayout.vue";
import EditComponent from "@/components/EditComponent.vue";
import ReviewComponent from "@/components/ReviewComponent.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
import { ref, onMounted, computed, watchEffect } from "vue";
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const product = computed(() => store.getters["getProduct"]);
const Reviews = ref(null);
const reviews = ref([]);
const calculateRating = computed(() => {
  let result = 0;
  if (reviews.value.length > 0) {
    for (let i = 0; i < reviews.value.length; i++) {
      result = result + reviews.value[i].rating;
    }
    return result / reviews.value.length;
  } else {
    return 0;
  }
});

const route = useRoute();
const closeEditComponent = (editElement) => {
  editElement.isEdit = false;
};
const { id } = route.params;
const editInfo = ref([
  {
    title: "picture",
    label: "picture",
    type: "file",
    isEdit: false,
  },
  {
    title: "name",
    label: "name",
    type: "text",
    isEdit: false,
  },
  {
    title: "description",
    label: "description",
    type: "textarea",
    isEdit: false,
  },
  {
    title: "price",
    label: "price",
    type: "number",
    isEdit: false,
  },
  {
    title: "category",
    label: "category",
    type: "select_category",
    isEdit: false,
  },
]);
const fetchReviews = async () => {
  await store.dispatch("moduleUser/fetchReviews");
  Reviews.value = store.getters["moduleUser/getReviews"];
};

watchEffect(() => {
  if (Reviews.value) {
    reviews.value = Reviews.value.filter((review) => review.productID === id);
  }
});
onMounted(async () => {
  await store.dispatch("getProductById", id);
  await fetchReviews();
});
</script>

<style scoped>
#tooltip {
  position: relative;
}

#tooltip #tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

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

#tooltip:hover #tooltiptext {
  visibility: visible;
  opacity: 1;
}
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

.edit {
  font-size: 12px;
  border: 1px solid var(--blue);
  color: var(--blue);
  font-weight: bold;
}
.edit:hover {
  color: white;
  background: var(--blue);
}
.title {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 27px;
  font-weight: 598;
  color: var(--blue);
  margin-bottom: 34px;
}

.overlay {
  background-color: rgba(9, 8, 8, 0.37);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.tab-content {
  overflow: hidden;
}
.tab-content img {
  width: 82%;
  height: auto;
}

.card {
  margin-bottom: 30px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
  margin-top: 50px;
  padding: 3em;
  line-height: 1.5em;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: flex;
  }
}

.details {
  display: flex;
  flex-direction: column;
}

.product-title,
.price {
  font-weight: bold;
}

.checked,
.price span {
  color: var(--orange);
}

.rating_circle {
  width: 100px;
  height: 100px;
  border-radius: 70px;
  border: 1px none;
  font-size: 35px;
  color: white;
  background: var(--pink);
}
i {
  color: var(--pink);
}
p {
  color: #5d6374;
}
</style>
