<template>
  <section class="pt-3">
    <div id="container">
      <div class="row gx-3">
        <main class="col-lg-9">
          <div
            class="card-banner p-5 rounded-5"
            style="
              min-height: 350px;
              background-image: url(../left-banner-image2.jpg);
            "
          >
            <div
              style="
                background: rgba(41, 52, 98, 0.37);
                padding: 10px 10px;
                border-radius: 10px;
              "
            >
              <h1 class="text-white">
                The Best Place To Sell or Buy <br />
                <img src="../icons/2.png" class="icon" /> Amazing Products
              </h1>
              <br />
              <p class="text-white">
                Welcome to goShop, where shopping and selling meet convenience
                and quality.
              </p>
              <div class="d-flex align-items-center">
                <router-link :to="{ name: 'user_auth' }"
                  ><button type="button" class="btn">
                    Get Started <i class="bi bi-arrow-right"></i></button
                ></router-link>
                <router-link :to="{ name: 'user_auth' }"
                  ><button type="button" class="btn aboutUs">
                    About Us <i class="bi bi-arrow-right"></i></button
                ></router-link>
              </div>
            </div>
          </div>
        </main>
        <aside class="col-lg-3">
          <div class="card-banner h-100 rounded-5">
            <div class="card-body text-center pb-5 slideshow">
              <transition name="fade" mode="out-in">
                <div :key="currentIndex" class="slide">
                  <img :src="slides[currentIndex]" class="slider" />
                </div>
              </transition>
            </div>
          </div>
        </aside>
      </div>
      <!-- row //end -->
    </div>
    <!-- container end.// -->
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const slides = ref([
  "../../3.png",
  "../../4.png",
  "../../1.png",
  "../../2.png",
]);
const currentIndex = ref(0);
const interValid = ref(null);
const interValidDuration = ref(2000);

const startAutoSlide = () => {
  interValid.value = setInterval(nextSlide, interValidDuration.value);
};

const stopAutoSlide = () => {
  clearInterval(interValid.value);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

onMounted(startAutoSlide);
onBeforeUnmount(stopAutoSlide);
</script>

<style scoped>
.icon {
  width: 57px;
  animation: moveDown 0.5s ease-in-out infinite alternate;
}

@keyframes moveDown {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(9px);
  }
}

.row.gx-3 {
  width: 90%;
  margin-left: 1%;
}
.btn {
  border: 2px solid var(--pink);
  border-radius: 3px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
  padding: 11px 16px;
  margin-top: 7px;
  font-weight: 500;
}

.btn:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}

.aboutUs {
  margin-left: 16px;
  background-color: var(--blue) !important;
  border: 2px solid var(--blue);
}

.aboutUs:hover {
  box-shadow: 0 0 2px 2px #29346294;
}

.card-body img {
  width: 390px;
  border-radius: 20px;
  height: 350px;
}

@media (max-width: 480px) {
  .icon {
    width: 0px;
  }
  .card-banner.p-5.bg-primary.rounded-5 {
    height: auto !important;
  }

  .card-body img {
    margin-top: 3%;
    width: 250px;
  }
}

@media screen and (min-width: 481px) and (max-width: 593px) {
  .icon {
    width: 0px;
  }

  .card-body img {
    margin-top: 3%;
    width: 470px;
  }
}

@media screen and (min-width: 593px) and (max-width: 767px) {
  .card-body img {
    margin-top: 3%;
    width: 470px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .card-body img {
    margin-top: 3%;
    width: 470px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .card-banner.p-5.bg-primary.rounded-5 {
    width: 86%;
  }

  .col-lg-9 {
    width: 63%;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1270px) {
  .card-banner.p-5.bg-primary.rounded-5 {
    width: 95%;
  }

  .col-lg-3 {
    margin-left: -2%;
  }
}
h1 {
  font-weight: 500;
}
</style>
