<template>
  <div class="board">
      <div class="tile" v-for="i in 225" :key="i" :id="`tile-${i-1}`"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
      tiles: [],
      snakeHeadIndex: 112,
      snakeTailIndex: [114, 113, 112],
      gameSpeed: 150,
      direction: 'left',
  }),
  methods: {
    setRandomFoodTile() {
        const randomFoodTile = (Math.floor(Math.random() * 225)) + 1;
        if (this.tiles[randomFoodTile]) {
            this.setRandomFoodTile();
            return;
        }
  
        this.setTileValue(randomFoodTile, 'food');

    },
    paintTile(tile, color) {
        const element = document.getElementById(`tile-${tile-1}`);
        if (element) {
            element.classList.remove('tile-with-food');
            element.classList.remove('tile-with-snake');
            element.classList.add(`tile-with-${color}`);
        }
    },
    setTileValue(tile, value) {
      this.tiles[tile] = value;
      this.paintTile(tile, value);
    },
    setSnakeInitialPosition() {
      this.setTileValue(112, 'snake');
      this.setTileValue(113, 'snake');
      this.setTileValue(114, 'snake');
    },
    moveSnake() {
      let nextSnakeHeadIndex;

      switch (this.direction) {
        case 'left':
          nextSnakeHeadIndex = this.snakeHeadIndex - 1;
          if (nextSnakeHeadIndex % 15 === 0) {
            nextSnakeHeadIndex += 15;
          }
        break;
        case 'right':
          nextSnakeHeadIndex = this.snakeHeadIndex + 1;
          if (nextSnakeHeadIndex %  15 === 1) {
            nextSnakeHeadIndex -= 15;
          }
          break;
        case 'up':
          nextSnakeHeadIndex = this.snakeHeadIndex - 15;
          if (nextSnakeHeadIndex < 1) {
            nextSnakeHeadIndex += 225;
          }
          break;
        case 'down':
          nextSnakeHeadIndex = this.snakeHeadIndex + 15;
          if (nextSnakeHeadIndex > 225) {
            nextSnakeHeadIndex -= 225;
          }
          break;
        default:
          break;
        }

        this.snakeHeadIndex = nextSnakeHeadIndex;

        this.setTileValue(this.snakeTailIndex[0], null);
        this.snakeTailIndex.shift();

  
        if (this.tiles[this.snakeHeadIndex] === 'snake') {
          this.setTileValue(this.snakeHeadIndex, 'snake');
          clearInterval(this.interval);
        }
  
        if (this.tiles[this.snakeHeadIndex] === 'food') {
          this.snakeTailIndex.push(this.snakeTailIndex.slice(-1));
          this.setRandomFoodTile();
          this.$emit('onFoodEaten');
        }
  
        this.setTileValue(this.snakeHeadIndex, 'snake');
        this.snakeTailIndex.push(this.snakeHeadIndex);
    }
  },
  mounted() {
      this.setSnakeInitialPosition();
      this.setRandomFoodTile();

      this.interval = setInterval(this.moveSnake, this.gameSpeed);
  },
  created() {
      document.addEventListener('keydown', (event) => {
          switch (event.key) {
              case 'ArrowUp':
                  if (this.direction === 'down' || this.direction === 'up') return;
                  this.direction = 'up';
                  break;
              case 'ArrowDown':
                  if (this.direction === 'down' || this.direction === 'up') return;
                  this.direction = 'down';
                  break;
              case 'ArrowLeft':
                  if (this.direction === 'left' || this.direction === 'right') return;
                  this.direction = 'left';
                  break;
              case 'ArrowRight':
                  if (this.direction === 'left' || this.direction === 'right') return;
                  this.direction = 'right';
                  break;
              default: break;
          }
      });
  },
};
</script>

<style scoped>
.board {
  display: grid;
  border-style: 1px solid black;
  grid-template-columns: repeat(15, 20px);
  grid-template-rows: repeat(15, 20px);
  /* grid-gap: 1px; */
  padding: 2px;
  border: 1px solid black;
}

.tile {
  width: 20px;
  height: 20px;
  background-color: rgb(255, 255, 253);
}

.tile-with-food {
  background-color: rgb(233, 54, 54);
}

.tile-with-snake {
  background-color: rgb(66, 209, 66);
}
</style>
