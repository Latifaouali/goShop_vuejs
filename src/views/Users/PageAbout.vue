<template>
  <NavBar />
  <main class="main" id="main">
    <div
      class="container align-center"
      style="
        background-image: url(../about-header.jpg);
        background-size: cover;
        max-width: 1343px;
        min-height: 419px;
      "
    >
      <div
        class="row justify-content-center"
        style="
          background: rgba(23, 23, 26, 0.57);
          height: 419px;
          padding: 10px 10px;
          text-align: center;
          color: white;
        "
      >
        <div class="mbr-white col-md-12 col-lg-9 top">
          <h2
            class="mbr-section-title mbr-white mbr-bold pb-3 mbr-fonts-style display-1"
          >
            Welcome to goShop
          </h2>
          <p>
            where every purchase tells a story. Discover unique finds and
            support passionate sellers. Join our vibrant community today!
          </p>
          <router-link :to="{ name: 'user_auth' }"
            ><button type="button" class="btn aboutUs">
              Get Started <i class="bi bi-arrow-right"></i></button
          ></router-link>
        </div>
      </div>
    </div>
    <h1>Our <span style="color: var(--pink)"> Mission</span></h1>

    <div class="row inner_content_area">
      <div
        v-for="(mission, index) in missions"
        :key="index"
        class="col-lg-3 col-md-6 col-sm-12 pb-1"
      >
        <div class="card inner_art_div">
          <div class="image_bar">
            <img :src="mission.image" />
          </div>

          <div class="text_part_div">
            <h3>{{ mission.title }}</h3>

            <div class="inner_desc_part">
              <p>{{ mission.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row inner_content_area" style="margin-top: 7%">
      <div class="col-lg-6 col-md-6 col-sm-12 pb-1 Who_we_are">
        <img src="../who.jpg" />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 pb-1">
        <h4><span style="color: var(--pink)">Who</span> we are</h4>
        <p>
          Welcome to goShop, where passion meets commerce. At goShop, we are
          more than just a platform – we are a community of individuals driven
          by a shared love for unique products and seamless shopping
          experiences. goShop is not just a marketplace; it's a vibrant hub
          where sellers and buyers connect over a diverse range of products. Our
          platform is designed to be user-friendly, making the journey from
          exploration to purchase smooth and enjoyable.
        </p>
      </div>
    </div>
    <h1>What Sets Us <span style="color: var(--pink)">Apart</span></h1>
    <div class="row inner_content_area">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="col-lg-3 col-md-6 col-sm-12 pb-1"
      >
        <div class="card inner_art_div" id="feature">
          <span :class="feature.icon"></span>

          <div class="text_part_div">
            <h3>{{ feature.title }}</h3>

            <div class="inner_desc_part">
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-md-6 col-sm-12 pb-1 feature-img">
        <img src="../apart.png" />
      </div>
    </div>
    <h1>
      Join the <span style="color: var(--blue)">go</span
      ><strong style="color: var(--pink)">Shop</strong> Community
    </h1>
    <div class="container bottom_section">
      <p>
        Whether you're a seller looking to expand your reach or a buyer in
        search of one-of-a-kind items, we invite you to be a part of the goShop
        community. Together, let's redefine the way we buy and sell online.
      </p>
      <router-link :to="{ name: 'user_auth' }"
        ><button type="button" class="btn aboutUs">
          Get Started <i class="bi bi-arrow-right"></i></button
      ></router-link>
    </div>
  </main>
  <FooterComponent />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { ref } from "vue";
const missions = ref([
  {
    image: "../mission 1.jpg",
    title: "Elevating Entrepreneurship",
    description:
      "Fostering a community where sellers can thrive by showcasing their products to a global audience.",
  },
  {
    image: "../mission 2.jpg",
    title: "Enhancing Shopper Experience",
    description:
      "Creating a platform that delivers a enjoyable shopping journey for buyers with curated selections and user-friendly features.",
  },
  {
    image: "../mission 3.jpg",
    title: "Innovative Commerce",
    description:
      "Pioneering new ways of online buying and selling, integrating cutting-edge technologies for a modern and efficient marketplace",
  },
  {
    image: "../mission 4.jpg",
    title: "Sustainable Commerce",
    description:
      "Committing to eco-friendly practices, promoting sustainable products, and contributing to a greener, more responsible future.",
  },
]);

const features = ref([
  {
    icon: "bi bi-person-fill",
    title: "User-Friendly Interface",
    description:
      " Our website is designed with simplicity in mind. Enjoy a hassle-free shopping experience with intuitive navigation and a clean, modern design.",
  },
  {
    icon: "bi bi-shield-lock",
    title: "Secure Transactions",
    description:
      "Your security is our priority. We implement robust measures to ensure that your transactions on goShop are safe and secure.",
  },
]);
</script>

<style scoped>
.top h2 {
  font-family: "Nunito", sans-serif;
  font-size: 3rem;
  line-height: 1.1;
  margin-top: 54px;
}

.btn {
  border: 2px solid var(--pink);
  border-radius: 3px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
  padding: 11px 16px;
  margin-top: 38px;
  font-weight: 500;
}

.btn:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}

.top p {
  font-size: 18px;
  letter-spacing: 1px;
}

h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 598;
  font-family: "Quicksand", sans-serif;
  line-height: 1.2;
  margin-bottom: 40px;
  margin-top: 7%;
}

.image_bar {
  width: 148px;
  margin: 0 auto 24px;
}

.image_bar img {
  border-radius: 50%;
  width: 130px;
  height: 130px;
}

h3 {
  font-size: 16px;
  line-height: 35px;
  margin-bottom: 7px;
  font-weight: 700;
  text-align: center;
  color: var(--blue);
}

.inner_content_area p {
  color: #595959;
  font-size: 15px;
  font-weight: 600;
}

.inner_content_area {
  width: 90%;
  margin-left: 5%;
}

.card {
  padding: 10px 10px;
  margin-left: 10px;
  border: 1px dashed var(--pink);
  text-align: center;
}

.Who_we_are {
  margin-top: 40px;
}

.Who_we_are img {
  max-width: 85%;
  border-radius: 15px;
}

h4 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 84px;
}

#feature {
  height: 245px;
  border: none;
  box-shadow: 0px 14px 20px #29346212;
}

#feature h3 {
  color: var(--blue);
}

#feature span {
  font-size: 46px;
  color: var(--blue);
}

.feature-img img {
  width: 89%;
  margin-left: 14%;
  border-radius: 15px;
  box-shadow: 0px 14px 20px #29346212;
}
.bottom_section {
  font-size: 18px;
  text-align: center;
  padding: 10px 10px;
  box-shadow: 0px 14px 20px #29346212;
}
@media (min-width: 768px) {
  .card {
    height: 300px;
  }
}

@media (min-width: 992px) {
  .card {
    height: 400px;
  }
}

@media (min-width: 1277px) {
  .card {
    height: 340px;
  }
}
</style>
