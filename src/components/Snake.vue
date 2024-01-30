<template>
  <div class="game">
    <span class="score">Score: {{score}}</span>
    <snake @onFoodEated="increaseScore()" @onGameOver="showGameOverDialog($event)"></snake>
    <game-over :status="gameOverStatus" :show="showGameOver" :score="score"></game-over>
  </div>
</template>

<script>
import Snake from './SnakeComponents/SnakeGame.vue';
import GameOver from './SnakeComponents/GameOver.vue';

export default {
  name: 'SnakeGame',
  components: {
    Snake,
    GameOver,
  },
  methods: {
    increaseScore() {
      this.score++;
    },
    showGameOverDialog(status) {
      this.showGameOver = true;
      this.gameOverStatus = status;
    },
  },
  data: () => ({
    score: 0,
    showGameOver: false,
    gameOverStatus: '',
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
  color: white;
}
</style>