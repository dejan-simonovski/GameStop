<template>
  <div class="game-body">
    <h2 class="game-status">{{ gameStatus }}</h2><br>
    <game-board :tics="tics" :OnHandleClick="OnClicked"></game-board><br><br>
    <button id="buttonRes" v-if="isResetEnabled" @click="reset">Reset</button>
  </div>
</template>
<style>
#buttonRes {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #FF7F50;
  border-radius: 5px;
  color: #FF7F50;
  background-color: white;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

/* Стилови за кога мишот ќе се премести над копчето */
#buttonRes:hover {
  background-color: #FF7F50;
  color: white;
  border-color: #ffffff;
}
</style>

<script>
import GameBoard from "./TicTacBoard.vue";

export default {
  name: "TicTacGame",
  components: {
    GameBoard
  },
  data() {
    return {
      winner: null,
      isPlayerX: true,
      tics: Array(9).fill("")
    };
  },
  computed: {
    gameStatus() {
      if (this.winner === "X" || this.winner === "O") {
        return "Winner is " + this.winner;
      }

      return this.isPlayerX ? "Next Player: X" : "Next Player: O";
    },
    isResetEnabled() {
      if (this.winner === "X" || this.winner === "O") {
        return true;
      }

      return this.tics.every((tic) => tic === "X" || tic === "O");
    }
  },
  methods: {
    calculateWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (const [a, b, c] of lines) {
        if (
          this.tics[a] &&
          this.tics[a] === this.tics[b] &&
          this.tics[b] === this.tics[c]
        ) {
          this.winner = this.tics[a];
          return;
        }
      }
    },
    OnClicked(i) {
  if (this.winner === "X" || this.winner === "O" || this.tics[i] === "X" || this.tics[i] === "O") {
    return;
  }

  this.tics[i] = this.isPlayerX ? "X" : "O";
  this.isPlayerX = !this.isPlayerX;
  this.calculateWinner();
  console.log("index " + i + " is " + this.tics[i]);
},
    reset() {
      console.log("reset");
      this.tics.fill("");
      this.winner = null;
    }
  }
};
</script>