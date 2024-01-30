<template>
  <div class="logo-container">
    <img src="./assets/logo.png" alt="GAMESTOP" class="logo">
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

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
