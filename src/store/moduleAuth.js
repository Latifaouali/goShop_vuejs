import router from "@/router/index";
import Api from "../Api.js";
export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    errorMessage: null,
    isTokenValid: true,
  },
  getters: {
    getErrorMessage: (state) => state.errorMessage,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getIsTokenValid: (state) => state.isTokenValid,
  },
  actions: {
    async checkTokenValidity({ commit, dispatch, state }) {
      try {
        await Api.get("/api/users/me", {
          headers: {
            "x-auth-token": state.token,
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ISTOKENVALID", false);
          await dispatch("logout");
        }
      }
    },
    async registerUser({ commit }, userData) {
      try {
        const response = await Api.post("/api/users", userData);

        if (!response.data) throw new Error("Failed to register user.");

        const user = response.data;
        commit("SET_USER", user);
        commit("SET_ERRORMESSAGE", "");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },

    async login({ commit }, userData) {
      try {
        const response = await Api.post("/api/auth", userData);
        if (!response.data) throw new Error("Failed to log user.");
        else {
          commit("SET_USER", JSON.stringify(response.data.user));
          commit("SET_TOKEN", response.data.token);
          if (response.data.user.isSeller) {
            router.push({ name: "sellerIndex" });
          } else {
            router.push({ name: "userHome" });
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          commit("SET_ERRORMESSAGE", error.response.data.error);
        } else {
          console.error(error.message);
        }
      }
    },
    logout() {
      localStorage.removeItem("vuex");
      window.location.href="/";
      location.reload();
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ERRORMESSAGE(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    SET_ISTOKENVALID(state, isTokenValid) {
      state.isTokenValid = isTokenValid;
    },
  },
};
