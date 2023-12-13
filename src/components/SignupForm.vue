<template>
  <main>
    <div class="justify-content-center">
      <div class="mb-3">
        <div class="card-body">
          <div class="pt-4 pb-2"></div>
          <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
          <div v-if="!errorMessage" class="done message">
            {{ doneMessage }}
          </div>

          <form class="row g-3 needs-validation" @submit.prevent="registerUser">
            <!-- <div class="col-12 d-flex">
                  <label for="userType">You Are:</label>
                  <div class="form-check d-flex">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="false"
                      v-model="userData.isSeller"
                      checked
                    />
                    <label class="form-check-label" for="client">Client</label>
                  </div>
                  <div class="form-check d-flex">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="true"
                      v-model="userData.isSeller"
                    />
                    <label class="form-check-label" for="seller">Seller</label>
                  </div>
                </div> -->

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
              <label for="yourUsername" class="form-label">Username</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">@</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="userData.userName"
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <label for="yourUsername" class="form-label">Password</label>
              <div class="input-group has-validation">
                <span
                  :class="`input-group-text ${
                    showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'
                  }`"
                  id="inputGroupPrepend"
                  @click="passwordVisibility"
                ></span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  v-model="userData.password"
                  required
                />
              </div>
            </div>

            <div class="col-12">
              <button class="btn" type="submit">Create Account</button>
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
  userName: "",
  picture: "default.png",
  email: "",
  address: null,
  phone: null,
  password: "",
  isSeller: false,
});
const showPassword = ref(false);
const doneMessage = ref("");

const registerUser = async () => {
  try {
    await store.dispatch("moduleAuth/registerUser", userData.value);
    if (!errorMessage.value)
      doneMessage.value = "your account is created successfully ... ";
    userData.value = "";
  } catch (error) {
    console.error(error);
  }
};

const passwordVisibility = () => {
  showPassword.value = !showPassword.value;
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
.form-check-label {
  color: black !important;
  font-weight: 500 !important;
  margin-left: 2%;
}
.form-check-input {
  margin-left: 4% !important;
}
.message {
  color: red;
  font-weight: bold;
  margin-left: 5%;
  font-size: 18px;
}

.done {
  color: green !important;
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
</style>
