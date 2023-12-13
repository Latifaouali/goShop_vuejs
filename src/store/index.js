import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Api from "../Api.js";
import moduleAuth from "./moduleAuth";
import moduleSeller from "./moduleSeller";
import moduleUser from "./moduleUser";
export default createStore({
  state: {
    category: [
      "Clothing and Fashion",
      "Electronics",
      "Furniture and Home",
      "Cars and Bikes",
      "Arts and Crafts",
      "Sports and Entertainment",
      "Health and Beauty",
      "Books and Literature",
    ],
    product: "",
    Products: [],
    populareProducts: [],
    Orders: [],
  },
  getters: {
    // getUsers: (state) => state.products,
    getCategory: (state) => state.category,
    getProduct: (state) => state.product,
    getProducts: (state) => state.Products,
    getOrders: (state) => state.Orders,
    getPopularProducts: (state) => state.populareProducts,
  },

  actions: {
    async getProductById({ commit }, productId) {
      try {
        const reponse = await Api.get(`/api/products/${productId}`);
        commit("SET_PRODUCT", reponse.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProducts({ commit }) {
      try {
        const data = await Api.get("/api/products");
        const Products = data.data;
        commit("SET_PRODUCTS", Products);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPopulareProducts({ commit }) {
      const reponse = await Api.get("/api/products/popularProducts");
      commit("SET_POPRODUCTS", reponse.data);
    },
    async fetchOrders({ commit }) {
      try {
        const reponse = await Api.get("/api/orders");
        commit("SET_ORDERS", reponse.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserData({ commit }) {
      try {
        const response = await Api.get("/api/users/me");
        const user = response.data;
        if (user) {
          console.log(user);
          commit("SET_USER", user);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mutations: {
    SET_PRODUCTS(state, Products) {
      state.Products = Products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_ORDERS(state, Orders) {
      state.Orders = Orders;
    },
    SET_POPRODUCTS(state, populareProducts) {
      state.populareProducts = populareProducts;
    },
  },
  modules: {
    moduleAuth,
    moduleSeller,
    moduleUser,
  },
  plugins: [
    createPersistedState({
      paths: ["moduleAuth.user", "moduleAuth.token"],
    }),
  ],
});
