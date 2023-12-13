<template>
  <main>
    <div class="justify-content-center">
      <div class="mb-3">
        <div class="card-body">
          <div class="pt-4 pb-2"></div>
          <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
          <form class="row g-3 needs-validation" @submit.prevent="loginUser">
            <div class="col-12">
              <label for="yourEmail" class="form-label">Your Email</label>

              <input
                type="email"
                class="form-control"
                v-model="userData.email"
                required
              />
            </div>

            <div class="col-12">
              <label for="yourUsername" class="form-label">Password</label>
              <div class="input-group has-validation">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control bi bi-envelope"
                  v-model="userData.password"
                  required
                />
                <span
                  :class="`input-group-text ${
                    showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'
                  }`"
                  id="inputGroupPrepend"
                  @click="passwordVisibility"
                ></span>
              </div>
            </div>

            <div class="col-12">
              <button class="btn" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const errorMessage = computed(
  () => store.getters["moduleAuth/getErrorMessage"]
);
const userData = ref({
  email: "",
  password: "",
});
const showPassword = ref(false);

const passwordVisibility = () => {
  showPassword.value = !showPassword.value;
};
const loginUser = async () => {
  try {
    await store.dispatch("moduleAuth/login", userData.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped>
label {
  color: grey;
}
input {
  border-color: var(--blue);
}
#inputGroupPrepend {
  border-color: var(--blue);
}

.btn {
  margin-top: 12%;
  margin-left: 26%;
  border-radius: 92px;
  width: 42%;
  padding: 10px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
}

.btn:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}
.message {
  color: red;
  font-weight: bold;
  margin-left: 5%;
  font-size: 18px;
}
</style>
