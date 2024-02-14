<template>
  <div class="game">
    <span class="score">Score: {{score}}</span>
    <snake @onFoodEated="increaseScore()"></snake>
  </div>
</template>

<script>
import Snake from './SnakeComponents/SnakeGame.vue';

export default {
  name: 'SnakeGame',
  components: {
    Snake
  },
  methods: {
    increaseScore() {
      this.score++;
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
  height: 100vh;
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