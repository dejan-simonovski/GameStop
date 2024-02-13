<template>
  <div class="logo-container">
    <img src="./assets/logo.png" alt="GAMESTOP" class="logo">
  </div>
  <router-view></router-view>
</template>

<style>
.logo-container {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.logo {
  transform: scale(0.3);
  transition: transform 0.3s ease;
}
</style>
