<template>
  <form @submit.prevent="addProduct" id="model" enctype="multipart/form-data">
    <i class="bi bi-x-lg close" @click="close"></i>
    <h4>add new product</h4>
    <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
    <div v-if="!errorMessage" class="done message">
      {{ doneMessage }}
    </div>

    <div class="row mb-3" style="margin-top: 4%">
      <label for="inputNumber" class="col-sm-2 col-form-label"
        >picture Upload</label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          name="picture"
          type="file"
          id="picture"
          @change="handleFileChange"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputText" class="col-sm-2 col-form-label"
        >Product Name</label
      >
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          v-model="productData.name"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputNumber" class="col-sm-2 col-form-label">Price</label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          v-model="productData.price"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Category</label>
      <div class="col-sm-10">
        <select class="form-select" v-model="productData.category" required>
          <option value="" selected>choose the category</option>
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
    <div class="row mb-3"></div>
    <div class="row mb-3">
      <label for="inputPassword" class="col-sm-2 col-form-label"
        >Description</label
      >
      <div class="col-sm-10">
        <textarea
          class="form-control"
          style="height: 100px"
          v-model="productData.description"
          required
        ></textarea>
      </div>
    </div>
    <button class="bi bi-floppy save" type="submit">
      <span style="margin-left: 9px">save product</span>
    </button>
  </form>
</template>

<script setup>
//eslint-disable-next-line
const props = defineProps({
  userId: String,
  close: Function,
});
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const errorMessage = computed(
  () => store.getters["moduleSeller/getErrorMessage"]
);
const categories = computed(() => store.getters["getCategory"]);
const doneMessage = ref("");

const productData = ref({
  name: "",
  sellerID: props.userId,
  picture: null,
  price: "",
  description: "",
  category: "",
  salesCount: 0,
});

const handleFileChange = (event) => {
  productData.value.picture = event.target.files[0];
};

const addProduct = async () => {
  try {
    await store.dispatch("moduleSeller/addProduct", productData.value);
    if (!errorMessage.value)
      doneMessage.value = "product is added successfuly ... ";
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
label {
  color: var(--blue);
  font-weight: bold;
  font-size: 0.8203125rem;
  font-family: "Inter", sans-serif;
}

h4 {
  font-weight: bold;
  color: var(--blue);
}
input,
select,
textarea {
  border-color: var(--blue);
}

.tags {
  display: flex;
}

.tags input {
  margin-left: 3%;
}

#model {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 662px;
  padding: 30px;
  margin-left: 8%;
  margin-top: 8%;
  border-radius: 4px;
}

.save {
  padding: 7px 10px;
  width: 24%;
  margin-top: 1%;
  margin-left: 48%;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  background-color: green;
}

.save:hover {
  background: #056605;
}

.message {
  color: red;
  font-weight: bold;
  margin-left: 5%;
  font-size: 18px;
}

.done {
  color: green !important;
}

.close {
  color: var(--pink);
  font-size: 25px;
  margin-left: 94%;
  margin-top: -2%;
  cursor: pointer;
}
</style>
