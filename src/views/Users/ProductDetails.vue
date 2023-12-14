<template>
  <NavBar />
  <div v-show="showModel" class="overlay">
    <AddReview v-if="user" :close="close" :productID="id" :userID="user._id" />
  </div>
  <main id="main1" v-if="!showModel">
    <div class="card card_product_detail">
      <div class="wrapper row">
        <div class="preview col-md-6">
          <div class="preview-pic tab-content">
            <div class="tab-pane active" id="pic-1">
              <img
                v-if="product && product.picture"
                :src="`https://goshop-3bs3.onrender.com/${product.picture}`"
              />
            </div>
          </div>
        </div>
        <div class="details col-md-6">
          <div class="title">
            <h4 class="product-title">{{ product.name }}</h4>
          </div>
          <div class="title" style="margin-top: 0.5rem; color: var(--orange)">
            <h5 class="price">{{ product.price }} MAD</h5>
          </div>
          <div class="widget-title d-flex mt-4">
            <h6 class="mb-1 flex-shrink-0">Description</h6>
            <span
              class="hr-line position-relative d-block align-self-end ms-1"
            ></span>
          </div>
          <p class="product-description">
            {{ product.description }}
          </p>
          <div class="title" style="margin-top: 5%">
            <h6 class="price">
              Category: <span>{{ product.category }}</span>
            </h6>
          </div>
          <div class="d-flex align-items-center gap-3 flex-wrap mt-5">
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
            <div
              v-if="!isIncart"
              class="product-qty qty-increase-decrease d-flex align-items-center"
            >
              <button type="button" class="decrease" @click="decrease">
                -
              </button>
              <input
                type="text"
                readonly=""
                :value="quantity"
                min="1"
                class="quantity"
              />
              <button type="button" class="increase" @click="increase">
                +
              </button>
            </div>
            <div id="tooltip">
              <button
                v-if="!isIncart"
                @click="addToCart"
                :class="{ 'disabled-link': isDisabled }"
                class="btn btn-secondary btn-md add-to-cart-btn"
              >
                <span class="bi bi-bag me-2"></span>
                Add to Cart
              </button>
              <button
                v-else
                @click="removeFromCart"
                :class="{ 'disabled-link': isDisabled }"
                class="btn btn-secondary btn-md add-to-cart-btn"
              >
                <span class="bi bi-bag me-2"></span>
                Rempove from Cart
              </button>
              <span v-if="isDisabled" id="tooltiptext">{{ message }} </span>
            </div>
            <div id="tooltip">
              <button
                v-if="!isInwishlist"
                class="btn btn-primary btn-md heart"
                @click="addToWhishlist"
                :class="{ 'disabled-link': isDisabled }"
              >
                <i class="bi bi-heart"></i>
              </button>
              <button
                v-else
                class="btn btn-primary btn-md heart"
                @click="RemoveFromWishlist"
                :class="{ 'disabled-link': isDisabled }"
              >
                <i class="bi bi-heart-fill"></i>
              </button>
              <span v-if="isDisabled" id="tooltiptext">{{ message }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card-body d-lg-flex align-items-center justify-content-lg-between"
      style="width: 96%; margin-left: 2%; margin-top: 7%"
    >
      <div class="tt-page-title">
        <h3 class="mb-lg-0">Comments</h3>
      </div>
      <div class="tt-action" id="tooltip">
        <button
          class="bi bi-plus-lg btn btn-outline"
          @click="showModel = true"
          :class="{ 'disabled-link': isDisabled }"
        >
          Add Comment
        </button>
        <span v-if="isDisabled" id="tooltiptext">{{ message }} </span>
      </div>
    </div>
    <ReviewComponent :productID="id" />
  </main>
  <FooterComponent v-if="!showModel" />
</template>

<script setup>
import ReviewComponent from "@/components/ReviewComponent.vue";
import AddReview from "@/components/AddReview.vue";
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
import { ref, onMounted, computed, watchEffect } from "vue";
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const isDisabled = ref(null);
const message = ref(null);
const isInwishlist = ref(false);
const isIncart = ref(false);
const product = computed(() => store.getters["getProduct"]);
const route = useRoute();
const { id } = route.params;
const showModel = ref(false);
const quantity = ref(1);
const close = () => {
  showModel.value = false;
};
const decrease = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
const increase = () => {
  quantity.value++;
};
const whishlistData = ref({
  userID: null,
  productID: id,
});
const cartData = ref({
  userID: null,
  productID: id,
  quantity: null,
});
if (user.value) {
  whishlistData.value.userID = user.value._id;
  cartData.value.userID = user.value._id;
}
const doneMessage = ref("");
const deleteMessage = ref("");
const addToWhishlist = async () => {
  try {
    await store.dispatch("moduleUser/addToWishlist", whishlistData.value);
    doneMessage.value = "the item is added to your wishlist successfully";
    isInwishlist.value = true;
  } catch (error) {
    console.log(error);
  }
};

const RemoveFromWishlist = async () => {
  try {
    await store.dispatch("moduleUser/removeFromwishlist", whishlistData.value);
    deleteMessage.value = "the item is deleted from your wishlist successfully";
    isInwishlist.value = false;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async () => {
  try {
    cartData.value.quantity = quantity.value;
    await store.dispatch("moduleUser/addToCart", cartData.value);
    doneMessage.value = "the item is added to your cart successfully";
    isIncart.value = true;
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = async () => {
  try {
    await store.dispatch("moduleUser/removeFromCart", whishlistData.value);
    deleteMessage.value = "the item is deleted from your cart successfully";
    isIncart.value = false;
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => {
  if (user.value) {
    isDisabled.value = false;
    message.value = "add to whishlist";
  } else {
    isDisabled.value = true;
    message.value = "Please log in to access this feature.";
  }
});
onMounted(async () => {
  await store.dispatch("getProductById", id);
});

if (user.value) {
  onMounted(async () => {
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
        (item) => item.productID._id === id
      );
    } else {
      isInwishlist.value = false;
    }

    if (cart.value && cart.value.items && cart.value.items.length > 0) {
      isIncart.value = cart.value.items.some(
        (item) => item.productID._id === id
      );
    } else {
      isIncart.value = false;
    }
  });
}
</script>

<style scoped>
/* Tooltip container */
#tooltip {
  position: relative;
}

/* Tooltip text */
#tooltip #tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
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

/* Show the tooltip text when you mouse over the tooltip container */
#tooltip:hover #tooltiptext {
  visibility: visible;
  opacity: 1;
}
#main1 {
  margin-top: 60px;
  transition: all 0.3s;
  background: white;
  width: 84%;
  margin-left: 8%;
  border-radius: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
}

.disabled-link {
  pointer-events: none;
  opacity: 0.5;
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

.card_product_detail {
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
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #191d28;
}
h3 {
  margin-top: 7%;
  font-weight: 600;
  color: #191d28;
}
.widget-title .hr-line {
  height: 2px;
  background-color: var(--orange);
  transform: translateY(-10px);
  width: 20px;
}
p {
  color: #5d6374;
}
.btn {
  border: 2px solid var(--pink);
  border-radius: 3px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
  padding: 11px 16px;
  margin-top: 7px;
  font-weight: 500;
}

.btn:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}
.heart {
  background: white;
  color: var(--pink);
  margin-left: 17px;
}

.add-to-cart-btn {
  border: 2px solid var(--blue);
  background: var(--blue);
  color: white;
}
.add-to-cart-btn:hover {
  box-shadow: 0 0 2px 2px #29346294;
}

.quantity {
  width: 52px;
  height: 48px;
  padding: 12px 3px;
  text-align: center;
  border: 1px solid #29346294;
  border-left: 0;
  border-right: 0;
  font-weight: 700;
}
.product-qty button {
  width: 40px;
  height: 48px;
  border: 1px solid #29346294;
  border-radius: 4px 0 0 4px;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  background: rgba(0, 0, 0, 0);
}
.overlay {
  background-color: rgba(9, 8, 8, 0.37);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px;
}
</style>
