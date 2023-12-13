<template>
  <router-view />
</template>

<script setup>

</script>

<style>
:root{
  --blue:#293462;
  --pink:#D61C4E;
  --yellow:#FFF80A;
  --orange:#FEB139;
}
.save{
  color: green;
  padding: 7px 10px;
  width: 24%;
  margin-top: 1%;
  margin-left: 48%;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid  green; 
}

.save:hover{
  color:white;
  background-color:green
}
</style>
