<template>
  <div
    class="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
    role="alert"
    v-if="doneMessage"
  >
    {{ doneMessage }}
    <button
      type="button"
      class="btn-close btn-close-white"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  <div class="reviews" style="margin-top: 6%">
    <div class="row">
      <div class="review-card" v-for="review in reviews" :key="review._id">
        <div class="card mb-3">
          <div v-if="review.user._id === user._id" class="top-icons">
            <span
              @click="removeReview(review._id)"
              class="rounded-btn bi bi-x-lg close"
            ></span>
          </div>
          <div class="d-flex flex-start">
            <img
              class="rounded-circle shadow-1-strong me-3"
              :src="`../../user/${review.user.picture}`"
              alt="avatar"
              width="60"
              height="60"
            />
            <div>
              <h6 class="fw-bold mb-1">{{ review.user.userName }}</h6>
              <div class="d-flex align-items-center mb-3">
                <p class="mb-0">{{ review.date }}</p>
                <div style="color: #f1c40f">
                  {{ generateStarRating(review.rating) }}
                </div>
              </div>
              <p class="mb-0">
                {{ review.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
//eslint-disable-next-line
const props = defineProps({
  productID: String,
});
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const reviews = ref([]);
const doneMessage = ref("");
const removedItem = ref(false);
const generateStarRating = (rating) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return fullStars + emptyStars;
};
const Reviews = ref(null);
const fetchReviews = async () => {
  await store.dispatch("moduleUser/fetchReviews");
  Reviews.value = store.getters["moduleUser/getReviews"];
};

watchEffect(() => {
  if (Reviews.value) {
    reviews.value = Reviews.value.filter(
      (review) => review.productID === props.productID
    );
  }

  if (removedItem.value) {
    fetchReviews();
    removedItem.value = false;
  }
});
const removeReview = async (reviewID) => {
  try {
    await store.dispatch("moduleUser/removeReview", reviewID);
    doneMessage.value = "the review is deleted successfully !";
    removedItem.value = true;
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchReviews);
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 2%;
  padding: 12px 10px;
}
p {
  color: #5d6374;
}
.top-icons {
  cursor: pointer;
  font-size: 17px;
  margin-left: 97%;
}
.top-icons.rounded-btn {
  background: #2934620d;
  border-radius: 50%;
  padding: 3px 5px;
  font-size: 16px;
  margin-left: 57%;
  color: var(--pink);
}
.top-icons.rounded-btn:hover {
  color: white !important;
  background-color: var(--pink);
}
</style>
