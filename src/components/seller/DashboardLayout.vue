<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        @click="toggleSidebar"
      >
        <span><img class="menu_icon" src="../../icons/menu.png" /></span>
      </button>
      <router-link to="/seller/index" class="navbar-brand"
        ><img src="../../logo2.png" id="logo" />
        <span style="color: #293462">go</span
        ><strong style="color: #d61c4e">Shop</strong>
      </router-link>
      <a class="tt-toggle-sidebar">
        <span data-v-b4642dde=""
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
            data-v-b4642dde=""
          >
            <polyline
              points="15 18 9 12 15 6"
              data-v-b4642dde=""
            ></polyline></svg></span
      ></a>
    </div>
    <!-- End Logo -->

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown pe-3">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="`${user.picture}`"
              alt="Profile"
              class="rounded-circle"
            />
            <span class="d-none d-md-block dropdown-toggle ps-2">{{
              user.userName
            }}</span> </a
          ><!-- End Profile Iamge Icon -->

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
            style=""
          >
            <li class="dropdown-header">
              <h6>{{ user.userName }}</h6>
              <span>{{ user.email }}</span>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="users-profile.html"
              >
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                @click="logout"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>

  <aside class="sidebar" v-if="!isOpen" id="my-div">
    <ul class="sidebar-nav flex-column" id="sidebar-nav">
      <li class="nav-item" v-for="item in menu" :key="item.title">
        <router-link
          class="nav-link"
          :to="{ name: item.link }"
          active-class="active"
        >
          <span :class="item.icon"
            ><span style="margin-left: 13px"> {{ item.title }} </span></span
          >
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script setup>
//eslint-disable-next-line
const props = defineProps({
  user: Object,
});
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const menu = ref([
  {
    title: "Home",
    link: "userHome",
    icon: "bi bi-house",
  },
  {
    title: "Dashboard",
    link: "sellerIndex",
    icon: "bi bi-pie-chart",
  },
  {
    title: "Products",
    link: "sellerProducts",
    icon: "bi bi-bag",
  },
  {
    title: "Orders",
    link: "sellerOrders",
    icon: "bi bi-cart",
  },
]);
const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const logout = async () => {
  try {
    await store.dispatch("moduleAuth/logout");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.tt-brand .tt-toggle-sidebar[data-v-b4642dde] {
  position: absolute;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  left: 15rem;
  border-radius: 50%;
  cursor: pointer;
  background: #4eb529;
  color: #fff;
}
/*--------------------------------------------------------------
# header
--------------------------------------------------------------*/
#logo {
  width: 60px;
}
.menu_icon {
  width: 35px;
  height: 31px;
  background-size: cover;
  display: inline-block;
}
.header {
  transition: all 0.5s;
  z-index: 997;
  height: 60px;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
  padding-left: 20px;
}

.header-nav > ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.header-nav .nav-profile {
  color: #012970;
}

.header-nav .nav-profile img {
  max-height: 36px;
}

.header-nav .nav-profile span {
  font-size: 14px;
  font-weight: 600;
}

.header-nav .profile .dropdown-header h6 {
  font-size: 18px;
  margin-bottom: 0;
  font-weight: 600;
  color: #444444;
}

.header-nav .profile .dropdown-header span {
  font-size: 14px;
}

.header-nav .profile .dropdown-item {
  font-size: 14px;
  padding: 10px 15px;
  transition: 0.3s;
}

.header-nav .profile .dropdown-item i {
  margin-right: 10px;
  font-size: 18px;
  line-height: 0;
}

.header-nav .profile .dropdown-item:hover {
  background-color: #f6f9ff;
}

/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 996;
  transition: all 0.3s;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0 0 1px 1px var(--bs-border-color-translucent) !important;
  background: white;
}
.sidebar.show {
  width: 250px;
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-item {
  margin-bottom: 5px;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #637381;
  transition: 0.3;
  padding: 10px 15px;
  border-radius: 4px;
}

.active {
  background-color: #cbdce5;
  color: var(--blue) !important;
}
</style>
