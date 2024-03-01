<template>
  <div style="margin-top: -3%;">
    <span class="score">High score: {{ highScore.username }} {{ highScore.score }}</span><br/>
    <span class="score">Personal best: {{ personalBest }}</span><br/>
    <span class="score">Score: {{ score }}</span>
  </div>
</template>

<script>
import { getHighestScoreForGame, getCurrentUserHighestScoreForGame } from '@/auth';

export default {
  name: 'ScoreDisplay',
  props: {
    score: Number,
    gameName: String,
  },
  computed: {
    highScore() {
      return getHighestScoreForGame(this.gameName);
    },
    personalBest() {
      return getCurrentUserHighestScoreForGame(this.gameName);
    }
  },
};
</script>

<style>
.score {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
}
</style>
