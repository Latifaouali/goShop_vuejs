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

  <div
    class="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show"
    role="alert"
    v-if="deleteMessage"
  >
    {{ deleteMessage }}
    <button
      type="button"
      class="btn-close btn-close-white"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>

  <div class="card">
    <div class="wish-icon">
      <router-link
        :to="{ name: 'productDetails', params: { id: product._id } }"
        class="rounded-btn eye"
      >
        <i class="bi bi-eye"></i>
      </router-link>

      <span id="tooltip" v-if="!isInwishlist">
        <span
          @click="addToWhishlist(product._id)"
          :class="{ 'disabled-link': isDisabled }"
          class="rounded-btn"
        >
          <i class="bi bi-heart"></i>
        </span>
        <span id="tooltiptext">{{ message }} </span>
      </span>
      <span id="tooltip" v-else>
        <span
          @click="RemoveFromWishlist(product._id)"
          :class="{ 'disabled-link': isDisabled }"
          class="rounded-btn"
        >
          <i class="bi bi-heart-fill"></i>
        </span>
        <span id="tooltiptext">remove from wishlist </span>
      </span>
    </div>
    <img :src="`${product.picture}`" class="product-imag" />
    <div class="card-body">
      <div class="card_title">
        <h5>{{ product.name }}</h5>
      </div>
      <div class="price_stars">
        <p>{{ product.price }}MAD</p>
        <p class="bi bi-star-fill">
          <span>({{ calculateRating }})</span>
        </p>
      </div>
    </div>
    <span id="tooltip">
      <button
        class="buy"
        v-if="!isIncart"
        @click="addToCart(product._id)"
        :class="{ 'disabled-link': isDisabled }"
      >
        <span class="bi bi-cart me-2"></span>Add to cart
      </button>
      <button
        class="buy remove"
        v-else
        @click="removeFromCart(product._id)"
        :class="{ 'disabled-link': isDisabled }"
      >
        <span class="bi bi-bag-dash-fill me-2"></span>remove from cart
      </button>
      <span v-if="isDisabled" id="tooltiptext2">{{ message }} </span>
    </span>
  </div>
</template>
<script setup>
//eslint-disable-next-line
const props = defineProps({
  product: Object,
});
import { ref, computed, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const reviews = ref([]);

const isInwishlist = ref(false);
const isIncart = ref(false);
const isDisabled = ref(null);
const message = ref(null);

const Reviews = ref(null);
const fetchReviews = async () => {
  await store.dispatch("moduleUser/fetchReviews");
  Reviews.value = store.getters["moduleUser/getReviews"];
};

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
watchEffect(() => {
  if (user.value) {
    isDisabled.value = false;
    message.value = "add to whishlist";
  } else {
    isDisabled.value = true;
    message.value = "Please log in to access this feature.";
  }

  if (Reviews.value) {
    reviews.value = Reviews.value.filter(
      (review) => review.productID === props.product._id
    );
  }
});

const whishlistData = ref({
  userID: null,
  productID: null,
});

const cartData = ref({
  userID: null,
  productID: null,
  quantity: 1,
});

if (user.value) {
  whishlistData.value.userID = user.value._id;
  cartData.value.userID = user.value._id;
}

const doneMessage = ref("");
const deleteMessage = ref("");

const addToWhishlist = async (productID) => {
  try {
    whishlistData.value.productID = productID;
    await store.dispatch("moduleUser/addToWishlist", whishlistData.value);
    doneMessage.value = "the item is added to your wishlist successfully";
    isInwishlist.value = true;
  } catch (error) {
    console.log(error);
  }
};

const RemoveFromWishlist = async (productID) => {
  try {
    whishlistData.value.productID = productID;
    await store.dispatch("moduleUser/removeFromwishlist", whishlistData.value);
    deleteMessage.value = "the item is deleted from your wishlist successfully";
    isInwishlist.value = false;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (productID) => {
  try {
    cartData.value.productID = productID;
    await store.dispatch("moduleUser/addToCart", cartData.value);
    doneMessage.value = "the item is added to your cart successfully";
    isIncart.value = true;
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = async (productID) => {
  try {
    whishlistData.value.productID = productID;
    await store.dispatch("moduleUser/removeFromCart", whishlistData.value);
    deleteMessage.value = "the item is deleted from your cart successfully";
    isIncart.value = false;
  } catch (error) {
    console.log(error);
  }
};

if (user.value) {
  onMounted(async () => {
    try {
      await store.dispatch("moduleUser/fetchWhishlist", user.value._id);
      await store.dispatch("moduleUser/fetchCart", user.value._id);
      const wishlist = computed(() => store.getters["moduleUser/getWhishlist"]);
      const cart = computed(() => store.getters["moduleUser/getCart"]);
      if (
        wishlist.value &&
        wishlist.value.items &&
        wishlist.value.items.length > 0
      ) {
        isInwishlist.value = wishlist.value.items.some(
          (item) => item.productID._id === props.product._id
        );
      } else {
        isInwishlist.value = false;
      }

      if (cart.value && cart.value.items && cart.value.items.length > 0) {
        isIncart.value = cart.value.items.some(
          (item) => item.productID._id === props.product._id
        );
      } else {
        isIncart.value = false;
      }
    } catch (error) {
      console.error(error);
    }
  });
}
onMounted(async () => {
  await fetchReviews();
});
</script>
<style scoped>
#tooltip {
  position: relative;
}
#tooltip #tooltiptext2 {
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

#tooltip #tooltiptext2::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

#tooltip:hover #tooltiptext2 {
  visibility: visible;
  opacity: 1;
}
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
  top: 100%; 
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

#tooltip #tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #555 transparent;
}

#tooltip:hover #tooltiptext {
  visibility: visible;
  opacity: 1;
}

.disabled-link {
  pointer-events: none;
  opacity: 0.5;
}
.card {
  background: #fff;
  border-radius: 6px;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  height: 305px !important;
}
.wish-icon {
  z-index: 99;
  cursor: pointer;
  font-size: 16px;
  color: #abb0b8;
}
.rounded-btn {
  background: #2934620d;
  border-radius: 50%;
  padding: 3px 5px;
  font-size: 16px;
  margin-left: 3px;
  color: var(--pink);
}
.rounded-btn:hover {
  color: white !important;
  background-color: var(--pink);
}

.bi-eye {
  font-size: 20px;
}
.eye {
  color: var(--blue);
  margin-left: 62%;
}
.eye:hover {
  color: white !important;
  background: var(--blue);
}
.product-imag {
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
  width: 100%;
  margin-top: 0%;
  height: 43%;
}

.buy {
  background-color: white;
  color: var(--pink);
  border: 2px solid var(--pink);
  border-radius: 3px;
  width: 96%;
  margin-left: 2%;
  margin-bottom: 4%;
  margin-top: -3%;
  padding: 3px;
}
.remove {
  color: white !important;
  background: var(--pink);
}
.buy:hover {
  background-color: var(--pink);
  color: white;
}
.card-body {
  text-align: left;
}

.price_stars {
  display: flex;
  justify-content: space-between;
}

.price_stars p {
  font-size: 19px;
  font-weight: bold;
}
.bi-star-fill {
  color: var(--yellow);
}
p span {
  color: #212529;
  font-size: 13px;
}
h4 {
  font-weight: bold;
}

h5 {
  font-size: 84%;
}
.card_title {
  width: 100%;
  height: 35px;
  color: var(--blue);
}

@media (max-width: 477px) {
  .card {
    margin-top: 6%;
  }
}
</style>
