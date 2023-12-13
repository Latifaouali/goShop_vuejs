<template>
  <div class="main">
    <div class="card">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <router-link :to="{ name: 'userHome' }">
            <span class="bi bi-arrow-left-circle"></span>
          </router-link>
          <img src="../login.png" class="img-fluid" alt="Phone image" style="border-radius: 7px;" />
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <div class="menu">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li :class="`nav-item ${login ? 'active' : ''}`">
                <button :class="`nav-link ${login ? 'active' : ''}`" @click="login = true">
                  SIGN IN
                </button>
              </li>
              <li :class="`nav-item ${login ? '' : 'active'}`">
                <button @click="login = false" :class="`nav-link ${login ? '' : 'active'}`">
                  SIGN UP
                </button>
              </li>
            </ul>
          </div>
          <LoginForm v-if="login" />
          <SignupForm v-if="!login" />
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import SignupForm from "@/components/SignupForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import { ref } from "vue";

const login = ref(true);
</script>

<style scoped>
.main {
  background: #cbdce5;
  padding: 15px 28px;
  height: 100vh;
}

.card {
  width: 80%;
  margin-top: 4%;
  margin-left: 10%;
}

a {
  text-decoration: none;
}

.menu {
  display: flex;
  justify-content: space-between;
}

.nav-link {
  width: 100%;
  color: var(--blue);
}

.nav-item {
  width: 50%;
}

.nav-item .active {
  color: var(--pink);
  font-family: fantasy;
  font-weight: bold;
}

#myTab {
  width: 100%;
}

.bi.bi-arrow-left-circle {
  font-size: 35px;
  color: var(--pink);
  margin-left: 7%;
  cursor: pointer
}


@media (max-width: 767px) {
  .menu {
    margin-left: 27%;
    width: 45%;
  }
}

@media (max-width: 991px) {
  .main {
    height: 100% !important;
  }

  .menu {
    margin-top: 7%;
    width: 95%;
    margin-left: 3%;
  }
}
</style>
