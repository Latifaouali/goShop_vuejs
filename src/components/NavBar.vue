<template>
  <header>
    <p>Welcome to goShop</p>
    <p><i class="bi bi-envelope"></i> goshop@support.com</p>
    <p><i class="bi bi-person-fill person" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
        aria-expanded="false"></i>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" v-if="user">
        <li class="dropdown-header">
          <h6>{{user.userName}}</h6>
          <span>{{user.email}}</span>
        </li>
        <li>
          <router-link :to="{ name:'sellerIndex' }"
          v-if="user.isSeller"
          class="dropdown-item d-flex align-items-center" >
            <i class="bi bi-pie-chart"></i>
            <span>Dashboard</span>
        </router-link>

          <router-link :to="{ name: 'userProfile' }"
          v-else
          class="dropdown-item d-flex align-items-center" >
            <i class="bi bi-person"></i>
            <span>My profile</span>
          </router-link>

        </li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li>
          <span class="dropdown-item d-flex align-items-center logout" @click="logout">
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </span>
        </li>
      </ul>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-else>
      <li>
        <router-link :to="{ name: 'user_auth' }" class="dropdownitem">
          get started <i class="bi bi-arrow-right"></i>
        </router-link>
      </li>
    </ul>
    </p>
  </header>

  <nav class="navbar navbar-expand-lg" id="navbar">
    <div class="container-fluid">
      <span  class="navbar-brand"><img src="../../logo2.png" id="logo" />
        <span style="color: #293462">go</span><strong style="color: #D61C4E">Shop</strong>
      </span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'userHome' }" active-class="active" class="nav-link "
              >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'userProducts'}" active-class="active" class="nav-link ">
              Products</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'userAbout'}" active-class="active" class="nav-link ">
              About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'userContact'}" active-class="active" class="nav-link ">
              Contact Us</router-link>
          </li>
        </ul>
    <div class="header-icon d-flex" v-if="user">
      <router-link :to="{name:'userWishlist'}" active-class="active" class="icon">
      <span class="bi bi-heart" id="tooltip">
        <span  id="tooltiptext">check your wishlist </span>
      </span>
    </router-link>
    <router-link  :to="{name:'userReviews'}" active-class="active" class="icon">
      <span class="bi bi-chat-dots" id="tooltip">
        <span  id="tooltiptext">check your reviews </span>
      </span>
    </router-link>
      <router-link :to="{name:'userCart'}" active-class="active" class="icon">
      <span class="bi bi-bag" id="tooltip">
        <span  id="tooltiptext">check your cart </span>
      </span>
    </router-link>
    </div> 


      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex';
import {computed} from 'vue';
const store=useStore();
const user = computed(() => {
  try {
    const userData = store.getters["moduleAuth/getUser"];
    return JSON.parse(userData) || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
});

if(!user.value){
  localStorage.removeItem('vuex');
}

const logout=async()=>{
  try{
    await store.dispatch('moduleAuth/logout');
  }
  catch(error){console.log(error)}
}

</script>

<style scoped>
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
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 14px;
}

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

#tooltip:hover #tooltiptext {
  visibility: visible;
  opacity: 1;
}
#navbar #logo {
  width: 60px;
}

#navbar .nav-link {
  font-size: 15px;
  font-weight: 600;
}

.navbar-nav.me-auto.mb-2.mb-lg-0 {
  margin-left: 21% !important;
}

.nav-item {
  margin-left: 17px !important;
}

.nav-link:hover,
.active {
  color: var(--blue) !important;
}

header {
  background-color: var(--blue);
  max-width: 100.8%;
  display: flex;
  justify-content: space-between;
}

.header-icon{
  margin-right: 17%;
  justify-content: space-between;
  width: 103px;
  font-size: 21px;
}
.icon{
  color: #595959;
}
.icon:hover{
  color:var(--blue);
  cursor: pointer;
}
p {
  color: white;
  margin-left: 2%;
  margin-top: 1%;
  font-weight: 100;
  font-size: 16px;
  margin-right: 30px
}

p i {
  font-size: 20px !important;
  vertical-align: middle;
}

.dropdownitem {
  padding: 0.25rem 1rem;
  text-decoration: none;
  color: #1e293b;
  white-space: nowrap;
  font-weight: 400;
}

.dropdownitem:hover {
  color: var(--blue);
}
.person:hover{
  color:var(--pink);
  box-shadow: 0 0 2px 2px #d61c4e6a;
}
nav{
  box-shadow: 0px 14px 20px rgba(0, 4, 94, 0.04);
}

.logout{
  cursor:pointer;
}
@media (max-width:991px){
  .header-icon {
  margin-left: 19%;
  justify-content: space-between;
  width: 152px;
  font-size: 26px;
  margin-top: 2%;
}
}
</style>
