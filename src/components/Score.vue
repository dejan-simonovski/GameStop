<template>
  <div>
    <span class="score">High score for {{ gameName }}: {{ highScore.username }}, {{ highScore.score }}</span><br/>
    <span class="score">Score: {{ score }}</span>
  </div>
</template>

<script>
import { getHighestScoreForGame } from '@/auth';

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
