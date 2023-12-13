<template>
  <form id="model" @submit.prevent="updateLabel" enctype="multipart/form-data">
    <i class="bi bi-x-lg close" @click="close"></i>
    <h4>change {{ editInfo.title }}</h4>
    <div class="row mb-3">
      <label for="inputText" class="col-sm-2 col-form-label">{{
        editInfo.label
      }}</label>
      <div class="col-sm-10" v-if="editInfo.type === 'textarea'">
        <textarea
          class="form-control"
          style="height: 100px"
          v-model="productData.newValue"
        ></textarea>
      </div>
      <div class="col-sm-10" v-else-if="editInfo.type === 'select_category'">
        <div class="col-sm-10">
          <select class="form-select" v-model="productData.newValue" required>
            <option value="" disabled selected>choose the category</option>
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
      <div class="col-sm-10" v-else-if="editInfo.type === 'file'">
        <input
          :type="editInfo.type"
          class="form-control"
          @change="handleFileChange"
          name="picture"
          id="picture"
        />
      </div>
      <div class="col-sm-10" v-else>
        <input
          :type="editInfo.type"
          class="form-control"
          v-model="productData.newValue"
        />
      </div>
    </div>
    <button class="bi bi-save save" type="submit">save</button>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
//eslint-disable-next-line
const props = defineProps({
  editInfo: Object,
  id: String,
  close: Function,
});
const close = () => {
  props.close(props.editInfo);
};
const categories = computed(() => store.getters["getCategory"]);
const productData = ref({
  id: props.id,
  labelToUpdate: props.editInfo.label,
  newValue: null,
});

const handleFileChange = (event) => {
  productData.value.newValue = event.target.files[0];
};

const updateLabel = () => {
  store.dispatch("moduleSeller/updateProduct", productData.value);
};
</script>

<style scoped>
#model {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 662px;
  padding: 30px;
  margin-left: 8%;
  margin-top: 2%;
}
label {
  color: var(--blue);
  font-weight: bold;
  font-size: 0.8203125rem;
  font-family: "Inter", sans-serif;
}
input,
select,
textarea {
  border-color: var(--blue);
}

h4 {
  font-weight: bold;
  color: var(--blue);
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
.close {
  color: var(--pink);
  font-size: 25px;
  margin-left: 94%;
  margin-top: -2%;
  cursor: pointer;
}
</style>
