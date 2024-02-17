<template>
  <div class="logo-container">
    <router-link to="/" class="logo-link">
      <img src="./assets/logo.png" alt="GAMESTOP" class="logo">
    </router-link>
  </div>
  <router-view></router-view>
</template>

<style>
.logo-container {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
}

.logo {
  transform: scale(0.3);
  transition: transform 0.3s ease;
}

.logo-link {
  text-decoration: none;
  cursor: pointer; 
}
</style>
