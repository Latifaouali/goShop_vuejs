import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
const requireSellerAccess = (to, from, next) => {
  const token = store.getters["moduleAuth/getToken"];
  const currentUser = JSON.parse(store.getters["moduleAuth/getUser"]);
  try {
    if (token && currentUser.isSeller) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    console.error(error);
  }
};
const requireAccess = (to, from, next) => {
  const token = store.getters["moduleAuth/getToken"];
  try {
    if (token) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const routes = [
  {
    path: "/",
    redirect: "/client/home",
  },
  {
    path: "/client/home",
    name: "userHome",
    component: () => import("@/views/Users/UserHome.vue"),
  },
  {
    path: "/client/products",
    name: "userProducts",
    component: () => import("@/views/Users/ProductsView.vue"),
  },
  {
    path: "/client/about",
    name: "userAbout",
    component: () => import("@/views/Users/PageAbout.vue"),
  },
  {
    path: "/client/contact",
    name: "userContact",
    component: () => import("@/views/Users/PageContact.vue"),
  },
  {
    path: "/client/wishlist",
    name: "userWishlist",
    component: () => import("@/views/Users/PageWishlist.vue"),
    beforeEnter: requireAccess,
  },
  {
    path: "/client/cart",
    name: "userCart",
    component: () => import("@/views/Users/PageCart.vue"),
    beforeEnter: requireAccess,
  },
  {
    path: "/client/reviews",
    name: "userReviews",
    component: () => import("@/views/Users/PageReviews.vue"),
    beforeEnter: requireAccess,
  },
  {
    path: "/client/profile",
    name: "userProfile",
    component: () => import("@/views/Users/PageProfile.vue"),
    beforeEnter: requireAccess,
  },
  {
    path: "/client/productDetails/:id",
    name: "productDetails",
    component: () => import("@/views/Users/ProductDetails.vue"),
  },
  {
    path: "/seller/index",
    name: "sellerIndex",
    component: () => import("@/views/Seller/IndexSeller.vue"),
    beforeEnter: requireSellerAccess,
  },
  {
    path: "/seller/orders",
    name: "sellerOrders",
    component: () => import("@/views/Seller/MyOrders.vue"),
    beforeEnter: requireSellerAccess,
  },
  {
    path: "/seller/order_details/:orderID",
    name: "order_details",
    component: () => import("@/views/Seller/OrderDetails.vue"),
    beforeEnter: requireSellerAccess,
  },
  {
    path: "/seller/products",
    name: "sellerProducts",
    component: () => import("@/views/Seller/MyProducts.vue"),
    beforeEnter: requireSellerAccess,
  },
  {
    path: "/seller/productView/:id",
    name: "productView",
    component: () => import("@/views/Seller/ProductView.vue"),
    beforeEnter: requireSellerAccess,
  },
  {
    path: "/user/authentification",
    name: "user_auth",
    component: () => import("@/views/UserAuth.vue"),
  },
  {
    path: "/user/test",
    name: "user_test",
    component: () => import("@/views/TestView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
