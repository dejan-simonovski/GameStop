<template>
    <div>
      <div v-if="gameOver">Game Over!</div>
      <div>
        <div v-for="(card, index) in cards" :key="index" class="card" @click="flipCard(index)">
          {{ card.flipped ? card.value : '' }}
        </div>
      </div>
      <button @click="restart">Restart Game</button>
    </div>
  </template>
  
  <script>
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  export default {
    data() {
      return {
        cards: [],
        flippedCards: [],
        gameOver: false,
        values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      };
    },
    created() {
      this.initializeGame();
    },
    methods: {
      initializeGame() {
        const doubledValues = this.values.concat(this.values);
        const shuffledValues = shuffleArray(doubledValues);
        this.cards = shuffledValues.map(value => ({
          value,
          flipped: false,
          matched: false,
        }));
      },
      flipCard(index) {
        if (!this.cards[index].flipped && this.flippedCards.length < 2) {
          this.cards[index].flipped = true;
          this.flippedCards.push(index);
          if (this.flippedCards.length === 2) {
            setTimeout(this.checkMatch, 1000);
          }
        }
      },
      checkMatch() {
        const [firstIndex, secondIndex] = this.flippedCards;
        if (this.cards[firstIndex].value === this.cards[secondIndex].value) {
          this.cards[firstIndex].matched = true;
          this.cards[secondIndex].matched = true;
          if (this.cards.every(card => card.matched)) {
            this.gameOver = true;
          }
        } else {
          this.cards[firstIndex].flipped = false;
          this.cards[secondIndex].flipped = false;
        }
        this.flippedCards = [];
      },
      restart() {
        this.initializeGame();
        this.gameOver = false;
      },
    },
  };
  </script>
  
  <style>
  .card {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    margin: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  