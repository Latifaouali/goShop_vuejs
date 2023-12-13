<template>
  <div class="card info-card sales-card">
    <div class="card-body">
      <h5 class="card-title">{{ cardInfo.title }} <span></span></h5>

      <div class="d-flex align-items-center">
        <div
          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
          :style="
            'background :' + cardInfo.color + ';color:' + cardInfo.icon_color
          "
        >
          <!-- <img :src="`../icons/${cardInfo.icon}.png`"/> -->
          <i :class="cardInfo.icon"></i>
        </div>
        <div class="ps-3">
          <h6>{{ cardInfo.number }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
//eslint-disable-next-line
const props = defineProps({
  cardInfo: Object,
});
</script>
<style scoped>
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
}

.card-header,
.card-footer {
  border-color: #ebeef4;
  background-color: #fff;
  color: #798eb3;
  padding: 15px;
}

.card-title {
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.card-title span {
  color: #899bbd;
  font-size: 14px;
  font-weight: 400;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.info-card {
  padding-bottom: 10px;
}

.info-card h6 {
  font-size: 28px;
  color: #012970;
  font-weight: 700;
  margin: 0;
  padding: 0;
}

.card-icon {
  font-size: 32px;
  line-height: 0;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  flex-grow: 0;
}
.card-icon img {
  width: 45px;
  height: 49px;
}

.filter {
  position: absolute;
  right: 0px;
  top: 15px;
}
.filter .icon {
  color: #aab7cf;
  padding-right: 20px;
  padding-bottom: 5px;
  transition: 0.3s;
  font-size: 16px;
  cursor: pointer;
}

.filter .icon:hover,
.filter .icon:focus {
  color: var(--pink);
}

.filter .dropdown-header {
  padding: 8px 15px;
}

.filter .dropdown-header h6 {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #aab7cf;
  margin-bottom: 0;
  padding: 0;
}

.filter .dropdown-item {
  padding: 8px 15px;
}
</style>
