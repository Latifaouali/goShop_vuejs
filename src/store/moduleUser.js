import Api from "../Api.js";
const fetchUserInformation = async (userId) => {
  try {
    const userData = await Api.get(`/api/users/${userId}`);
    return userData.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
export default {
  namespaced: true,
  state: {
    reviews: [],
    whishlist: [],
    cart: [],
    orders: [],
    errorMessage: null,
  },
  getters: {
    getReviews: (state) => state.reviews,
    getErrorMessage: (state) => state.errorMessage,
    getWhishlist: (state) => state.whishlist,
    getCart: (state) => state.cart,
    getOrders: (state) => state.orders,
  },
  actions: {
    async fetchReviews({ commit }) {
      try {
        const data = await Api.get("/api/reviews");
        const reviews = await Promise.all(
          data.data.map(async (review) => {
            const user = await fetchUserInformation(review.userID);
            return {
              ...review,
              user,
            };
          })
        );
        commit("SET_REVIEWS", reviews);
      } catch (error) {
        console.log(error);
      }
    },
    async addReview({ commit }, reviewData) {
      try {
        //..
        const reponse = await Api.post("/api/reviews", reviewData);
        if (!reponse.data) throw new Error("Failed to add review.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async removeReview({ commit }, reviewID) {
      try {
        const reponse = await Api.delete(`/api/reviews/${reviewID}`);
        if (!reponse.data)
          throw new Error("Failed to delete item from reviews.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async addToWishlist({ commit }, whislistData) {
      try {
        const reponse = await Api.post(`/api/whishlist`, whislistData);
        if (!reponse.data) throw new Error("Failed to add item to whishlist.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async removeFromwishlist({ commit }, { userID, productID }) {
      try {
        const reponse = await Api.delete(
          `/api/whishlist/${userID}/${productID}`
        );
        if (!reponse.data)
          throw new Error("Failed to delete item from wishlist.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async fetchWhishlist({ commit }, userID) {
      try {
        const response = await Api.get(`/api/whishlist/${userID}`);
        if (response.data) {
          commit("SET_WHISLIST", response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async addToCart({ commit }, cartData) {
      try {
        const reponse = await Api.post(`/api/carts`, cartData);
        if (!reponse.data) throw new Error("Failed to add item to cart.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async removeFromCart({ commit }, { userID, productID }) {
      try {
        const reponse = await Api.delete(`/api/carts/${userID}/${productID}`);
        if (!reponse.data) throw new Error("Failed to delete item from cart.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async removeCart({ commit }, cartID) {
      try {
        const response = await Api.delete(`/api/carts/${cartID}`);
        if (!response.data) throw new Error("Failed to delete item from cart.");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async fetchCart({ commit }, userID) {
      try {
        const response = await Api.get(`/api/carts/${userID}`);
        if (response.data) {
          commit("SET_CART", response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async UpdateProfile({ commit }, userData) {
      try {
        const response = await Api.put(
          `/api/users/${userData.userID}`,
          {
            userName: userData.userName,
            picture: userData.picture,
            address: userData.address,
            phone: userData.phone,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const updatedUser = JSON.stringify(response.data);
        commit("moduleAuth/SET_USER", updatedUser, { root: true });
        commit("SET_ERRORMESSAGE", "");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    async fetchOrders({ commit }, userID) {
      try {
        const reponse = await Api.get(`/api/orders/${userID}`);
        commit("FETCH_ORDERS", reponse.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else console.log(error);
      }
    },
    async orderProducts({ commit }, orderData) {
      try {
        await Api.post("/api/orders", orderData);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else console.log(error);
      }
    },
    async sendMessage({ commit }, contactData) {
      try {
        await Api.post("/api/contacts", contactData);
        commit("SET_ERRORMESSAGE", "");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    SET_ERRORMESSAGE(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    SET_WHISLIST(state, whishlist) {
      state.whishlist = whishlist;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    FETCH_ORDERS(state, orders) {
      state.orders = orders;
    },
  },
};
