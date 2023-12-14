<template>
  <NavBar />
  <div class="main">
    <h3>
      My reviews (<span style="color: var(--pink)"
        >{{ myReviews.length }} items </span
      >)
    </h3>
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
        <div
          class="review-card"
          v-for="(review, index) in myReviews"
          :key="index"
        >
          <div class="card mb-3">
            <div class="top_icons d-flex flax-wrap">
              <router-link
                :to="{
                  name: 'productDetails',
                  params: { id: review.productID },
                }"
                class="rounded-btn bi bi-eye"
              >
              </router-link>
              <span
                @click="removeReview(review._id)"
                class="rounded-btn bi bi-x-lg close"
              ></span>
            </div>
            <div class="d-flex flex-start">
              <img
                class="rounded-circle shadow-1-strong me-3"
                :src="`https://goshop-3bs3.onrender.com/${review.user.picture}`"
                alt="avatar"
                width="60"
                height="60"
              />
              <div style="max-wdith: 100%">
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
const reviews = ref(null);
const myReviews = ref([]);
const doneMessage = ref("");
const itemRemoved = ref(false);
const generateStarRating = (rating) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return fullStars + emptyStars;
};
const fetchMyReviews = async () => {
  try {
    await store.dispatch("moduleUser/fetchReviews");
  } catch (error) {
    console.error(error);
  }
};
const removeReview = async (reviewID) => {
  try {
    await store.dispatch("moduleUser/removeReview", reviewID);
    itemRemoved.value = true;
    doneMessage.value = "the review is deleted successfully !";
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => {
  reviews.value = store.getters["moduleUser/getReviews"];
  if (reviews.value) {
    myReviews.value = reviews.value.filter((r) => r.userID === user.value._id);
  }

  if (itemRemoved.value) {
    fetchMyReviews();
    itemRemoved.value = false;
  }
});
onMounted(fetchMyReviews);
</script>

<style scoped>
h3 {
  margin-top: 3%;
  font-weight: 600;
  color: #191d28;
  text-align: center;
}
.card {
  margin: 2%;
  padding: 12px 10px;
}
p {
  color: #5d6374;
}

.top_icons {
  cursor: pointer;
  font-size: 17px;
  margin-left: 90%;
}
.rounded-btn {
  background: #2934620d;
  border-radius: 50%;
  padding: 0px 5px;
  font-size: 16px;
  margin-left: 3px;
  color: var(--pink);
}
.rounded-btn:hover {
  color: white !important;
  background-color: var(--pink);
}

.bi-eye {
  font-size: 18px;
  color: var(--blue);
  margin-top: 2px;
}
.bi-eye:hover {
  color: white !important;
  background: var(--blue);
}
.row {
  width: 99%;
}
.close {
  margin-top: 5px;
}

@media (min-width: 877px) {
  .review-card[data-v-9dc5e0ca] {
    width: 76%;
    margin-left: 10%;
  }
  .reviews {
    width: 93%;
    margin-left: 5%;
  }
}

@media screen and (min-width: 684px) and (max-width: 876px) {
  .top_icons {
    margin-left: 78% !important;
  }
}
</style>
