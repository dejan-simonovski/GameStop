<template>
  <div class="game">
    <span class="score">High score: {{ highScore.username }}, {{ highScore.score }}</span>
    <span class="score">Score: {{ score }}</span>
    <snake @onFoodEaten="increaseScore()" @snakeDied="save()"></snake>
  </div>
</template>

<script>
import Snake from './SnakeComponents/SnakeGame.vue';
import { addHighScore, getHighestScoreForGame, getCurrentUser } from '@/auth'

export default {
  name: 'SnakeGame',
  components: {
    Snake
  },
  methods: {
    increaseScore() {
      this.score++;
    },
    save() {
      const currentUser = getCurrentUser();
      addHighScore("Snake", currentUser.username, this.score);
      this.score = 0;
    },
  },
  computed: {
    highScore() {
      return getHighestScoreForGame("Snake");
    },
  },
  data: () => ({
    score: 0,
  }),
};
</script>

<style>
html,body {
  padding: 0 !important;
  margin: 0 !important;
  /* height: 100vh; */
}

.game {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.score {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
}
</style>