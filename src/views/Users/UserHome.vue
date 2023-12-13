<template>
  <NavBar />
  <TopSection />
  <div class="WhyChooseUs">
    <h1><span style="color: var(--pink)"> Why </span>Choose Us</h1>
    <div class="WhyChooseUs_cards">
      <WhyChooseUs />
    </div>
  </div>
  <div class="exclusive_products">
    <h1>Exclusive <span style="color: var(--pink)"> Products</span></h1>
    <ExclusiveProducts />
  </div>

  <div class="latest">
    <LatestProducts />
  </div>
  <!-- <div class="details">
    
    <HowitWorks /> 
    </div> -->

  <!-- <div class="about">
      <AboutUs />
    </div>  -->

  <div class="popular-items">
    <h1>Popular <span style="color: var(--pink)"> Products</span></h1>
    <PopularItems />
  </div>

  <FooterComponent />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
import NavBar from "@/components/NavBar.vue";
import TopSection from "@/components/TopSection.vue";
import ExclusiveProducts from "@/components/ExclusiveProducts.vue";
import PopularItems from "@/components/PopularItems.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import WhyChooseUs from "@/components/WhyChooseUs.vue";
import LatestProducts from "@/components/LatestProducts.vue";

const user = computed(() => {
  try {
    const userData = store.getters["moduleAuth/getUser"];
    return JSON.parse(userData) || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
});
const isTokenValid = computed(() => store.getters["moduleAuth/isTokenValid"]);
if (localStorage.getItem("token")) {
  onMounted(async () => {
    await store.dispatch("fetchUserData");
  });
}

const checkTokenValidity = async () => {
  try {
    await store.dispatch("moduleAuth/checkTokenValidity");
  } catch (error) {
    console.error("Error in checkTokenValidity:", error);
  }
};

onMounted(async () => {
  if (user.value) {
    await checkTokenValidity();
    if (!isTokenValid.value) {
      return;
    }
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 598;
  font-family: "Quicksand", sans-serif;
  line-height: 1.2;
  margin-bottom: 40px;
  margin-top: 40px;
}
.WhyChooseUs_cards {
  margin-top: 25px;
  margin-left: 10%;
}

/* .categories_cards{
  margin-top:25px;
  margin-left:10%;
} */
.exclusive_products,
.popular-items,
.latest {
  margin-top: 6%;
}

.details {
  margin-top: 6%;
  /* background-color:#f0f1f4; */
}

.about {
  margin-top: 8%;
  width: 99%;
  background: var(--blue);
}
@media (min-width: 563px) and (max-width: 991px) {
  /* .categories_cards{
    margin-left:0%;
  } */
  .WhyChooseUs_cards {
    margin-left: 0%;
  }
}
</style>
