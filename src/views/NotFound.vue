<template>
  <NavBar />
  <div class="main">
    <div class="pt-5 not-found">
      <div class="bg-light shadow">
        <h2>4<i class="bi bi-bug"></i>4</h2>
        <h3 class="mt-4">Opps! Page Not Found</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped>
.not-found {
  background: #cbdce5;
  height: 80vh;
}
.bg-light h2 {
  font-size: 130px;
  color: var(--pink);
}
.bg-light h3 {
  font-size: 42px;
  color: var(--blue);
}
.bg-light {
  width: 50%;
  padding: 50px;
  text-align: center;
  border-radius: 5px;
  margin-left: 26%;
}

@media (max-width: 767px) {
  .bg-light h2 {
    font-size: 82px;
  }
  .bg-light h3 {
    font-size: 28px;
  }
}

@media (max-width: 540px) {
  .bg-light h2 {
    font-size: 47px !important;
  }
}
</style>
