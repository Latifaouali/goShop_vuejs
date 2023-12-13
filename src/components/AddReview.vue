<template>
  <form @submit.prevent="addReview" id="model" enctype="multipart/form-data">
    <i class="bi bi-x-lg close" @click="close"></i>
    <h4>add new comment</h4>
    <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
    <div v-if="!errorMessage" class="done message">
      {{ doneMessage }}
    </div>

    <div class="row mb-3">
      <div class="star-rating">
        <label
          v-for="rating in ratings"
          :key="rating"
          class="star"
          @click="selectRating(rating)"
        >
          <i
            class="bi bi-star-fill"
            :class="{ selected: rating <= selectedRating }"
          ></i>
        </label>
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword" class="col-sm-2 col-form-label">Comment</label>
      <div class="col-sm-10">
        <textarea
          v-model="reviewData.comment"
          class="form-control"
          style="height: 100px"
          required
        ></textarea>
      </div>
    </div>
    <button class="bi bi-floppy save" type="submit">
      <span style="margin-left: 9px">send</span>
    </button>
  </form>
</template>

<script setup>
//eslint-disable-next-line
const props = defineProps({
  close: Function,
  userID: String,
  productID: String,
});
import { ref, computed } from "vue";
import { useStore } from "vuex";
const errorMessage = computed(
  () => store.getters["moduleUser/getErrorMessage"]
);
const doneMessage = ref("");
const store = useStore();
const reviewData = ref({
  userID: props.userID,
  productID: props.productID,
  rating: null,
  comment: "",
});
const selectedRating = ref(null);
const ratings = [1, 2, 3, 4, 5];

const selectRating = (rating) => {
  selectedRating.value = rating;
  reviewData.value.rating = selectedRating.value;
};

const addReview = async () => {
  try {
    await store.dispatch("moduleUser/addReview", reviewData.value);
    if (!errorMessage.value)
      doneMessage.value = "your review is added successfully ... ";
  } catch (error) {
    console.error(error);
  }
};

const closeHandler = () => {
  doneMessage.value = "";
  reviewData.value.rating = "";
  reviewData.value.comment = "";
};

const close = () => {
  closeHandler();
  props.close();
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
textarea {
  border-color: var(--blue);
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
.star-rating {
  display: inline-block;
  font-size: 0;
}

.star-rating .star {
  font-size: 1.5rem;
  margin: 0.1rem;
  cursor: pointer;
}

.star-rating .star .bi-star-fill {
  color: rgb(80, 78, 78); /* Selected star color */
  transition: color 0.2s;
}

.star-rating .star .bi-star-fill.selected {
  color: #f1c40f; /* Highlighted star color when selected */
}
</style>
