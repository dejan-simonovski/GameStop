<template>
    <div class="container">
      <span v-if="currentUser">Logged in as: {{ currentUser.username }}</span>
      <button v-if="currentUser" @click="logout" class="button" style="padding:0.2em; margin:0.2em">Logout</button>
    </div>
    <div class="container">
      <div class="game-container">
        <img src="../assets/snake.png" alt="SNAKE">
        <router-link to="/snake" class="button-link">
          <button class="button">Snake</button>
        </router-link>
      </div>
      <div class="game-container">
        <img src="../assets/breakout.png" alt="BREAKOUT">
        <router-link to="/breakout" class="button-link">
          <button class="button">Breakout</button>
        </router-link>
      </div>
      <div class="game-container">
        <img src="../assets/tic-tac-toe.png" alt="TIC-TAC-TOE">
        <router-link to="/tictactoe" class="button-link">
          <button class="button">Tic Tac Toe</button>
        </router-link>
      </div>
    </div>
    <div class="container">
      <div class="game-container">
        <img src="../assets/hangman.png" alt="HANGMAN">
        <router-link to="/hangman" class="button-link">
          <button class="button">Hangman</button>
        </router-link>
      </div>
    </div>
  </template>
  
<script>
import { getCurrentUser, logout } from '@/auth'; 

export default {
  data() {
    return {
      currentUser: null
    };
  },
  created() {
    this.currentUser = getCurrentUser();
  },
  methods: {
    logout() {
      logout();
      this.$router.push('/login');
    }
  }
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
  
  .container div {
    margin-right: 10px;
  }
  
.button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1em 5em 1em 5em;
    background-color: rgb(255, 83, 53);
    border-radius: 5px;
    text-decoration: none;
    color: #ffffff;
    font-size: 1em;
    font-weight: bold;
}
  
.button:hover {
    background-color: red;
}
  
.button-link {
    text-decoration: none;
    color: white;
    margin: 1em;
}

img {
    width: 15em;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5em;
}

</style>
  