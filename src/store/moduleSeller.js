import Api from "../Api.js";
export default {
  namespaced: true,
  state: {
    myProducts: [],
    errorMessage: null,
    Orders: [],
    order: null,
    totalSales: null,
    totalMoney: null,
  },
  getters: {
    getErrorMessage: (state) => state.errorMessage,
    getMyProducts: (state) => state.myProducts,
    getOrders: (state) => state.Orders,
    getOrder: (state) => state.order,
    gettotalSales: (state) => state.totalSales,
    gettotalMoney: (state) => state.totalMoney,
  },
  actions: {
    async fetchMyProducts({ commit }, sellerID) {
      try {
        const data = await Api.get("/api/products");
        const myProducts = data.data.filter(
          (product) => product.sellerID === sellerID
        );
        commit("SET_MYPRODUCTS", myProducts);
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct({ commit }, productData) {
      try {
        const response = await Api.post("/api/products", productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!response.data) throw new Error("Failed to add product.");
        commit("SET_ERRORMESSAGE", "");
        location.reload();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async updateProduct({ commit }, productData) {
      try {
        await Api.put(
          `/api/products/${productData.id}`,
          {
            labelToUpdate: productData.labelToUpdate,
            newValue: productData.newValue,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        location.reload();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else console.log(error);
      }
    },
    async deleteProduct({ commit }, productID) {
      try {
        const reponse = await Api.delete(`/api/products/${productID}`);
        if (!reponse.data) throw new Error("failde to delete product");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async fetchOrders({ commit }, sellerID) {
      try {
        const response = await Api.get(`/api/orders/seller/${sellerID}`);
        commit("SET_ORDERS", response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async getOrderById({ commit }, orderID) {
      try {
        const reponse = await Api.get(`/api/orders/order/${orderID}`);
        commit("SET_ORDER", reponse.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async updateOrder({ commit }, orderData) {
      try {
        const reponse = await Api.put(
          `/api/orders/order/${orderData.orderID}`,
          {
            paymentStatus: orderData.paymentStatus,
            deliveryStatus: orderData.deliveryStatus,
          }
        );
        commit("SET_ORDER", reponse.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async salesSummary({ commit }) {
      const reponse = await Api.get("/api/products/sales-summary");
      commit("SET_TOTALSALES", reponse.data.totalSales);
      commit("SET_TOTALMONEY", reponse.data.totalMoney);
    },
  },
  mutations: {
    SET_MYPRODUCTS(state, myProducts) {
      state.myProducts = myProducts;
    },
    SET_ERRORMESSAGE(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    SET_ORDERS(state, Orders) {
      state.Orders = Orders;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    SET_TOTALSALES(state, totalSales) {
      state.totalSales = totalSales;
    },
    SET_TOTALMONEY(state, totalMoney) {
      state.totalMoney = totalMoney;
    },
  },
};
