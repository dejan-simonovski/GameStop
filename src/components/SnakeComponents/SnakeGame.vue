<template>
  <div>
    <div class="board">
      <div class="tile" v-for="i in 225" :key="i" :id="`tile-${i}`"></div>
    </div>
  </div>
  <SnakeControls :isPaused="isPaused" @toggle-border="toggleBorder" @toggle-pause="togglePause" @toggle-speed="toggleSpeed"/>
</template>

<script>
import SnakeControls from './SnakeControls.vue';

export default {
  components: {
    SnakeControls
  },
  data: () => ({
    tiles: [],
    snakeHeadIndex: 112,
    snakeTailIndex: [114, 113, 112],
    gameSpeed: 150,
    direction: 'left',
    isPaused: true,
    border: 'solid'
  }),
  methods: {
    setRandomAppleTile() {
      const randomAppleTile = (Math.floor(Math.random() * 225)) + 1;
      if (this.tiles[randomAppleTile]) {
          this.setRandomAppleTile();
          return;
      }
      this.setTileValue(randomAppleTile, 'apple');
    },
    toggleBorder(border) {
      this.border = border;
    },
    togglePause() {
      if (this.isPaused) {
        this.interval = setInterval(this.moveSnake, this.gameSpeed);
      } else {
        clearInterval(this.interval);
      }
      this.isPaused = !this.isPaused;
    },
    toggleSpeed(newSpeed) {
      this.gameSpeed = newSpeed;
    },

    resetGame() {
      location.reload();
    },

    handleSnakeDeath() {
      this.$emit('snakeDied');
      this.resetGame();
    },

    paintTile(tile, color) {
      const element = document.getElementById(`tile-${tile}`);
      if (element) {
        element.classList.remove('tile-with-apple');
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
      let isDead;

      const checkBorderCollision = () => {
        if (this.border === 'solid' && !isDead) {
          this.$emit('snakeDied');
          this.handleSnakeDeath();
          isDead = true;
          return true;
        }
        return false;
      };

      switch (this.direction) {
        case 'left':
          nextSnakeHeadIndex = this.snakeHeadIndex - 1;
          if (nextSnakeHeadIndex % 15 === 0) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex += 15;
          }
        break;
        case 'right':
          nextSnakeHeadIndex = this.snakeHeadIndex + 1;
          if (nextSnakeHeadIndex %  15 === 1) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex -= 15;
          }
          break;
        case 'up':
          nextSnakeHeadIndex = this.snakeHeadIndex - 15;
          if (nextSnakeHeadIndex < 1) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex += 225;
          }
          break;
        case 'down':
          nextSnakeHeadIndex = this.snakeHeadIndex + 15;
          if (nextSnakeHeadIndex > 225) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex -= 225;
          }
          break;
        default:
          break;
        }

        if(!isDead)
          this.snakeHeadIndex = nextSnakeHeadIndex;

        isDead=false;

        this.setTileValue(this.snakeTailIndex[0], null);
        this.snakeTailIndex.shift();

  
        if (this.tiles[this.snakeHeadIndex] === 'snake') {
          this.setTileValue(this.snakeHeadIndex, 'snake');
          this.$emit('snakeDied');
          this.handleSnakeDeath();
        }
  
        if (this.tiles[this.snakeHeadIndex] === 'apple') {
          this.snakeTailIndex.push(this.snakeTailIndex.slice(-1));
          this.setRandomAppleTile();
          this.$emit('onAppleEaten');
        }
  
        this.setTileValue(this.snakeHeadIndex, 'snake');
        this.snakeTailIndex.push(this.snakeHeadIndex);
    }
  },
  mounted() {
    this.setSnakeInitialPosition();
    this.setRandomAppleTile();
  },
  unmounted(){
    this.handleSnakeDeath();
  },
  created() {
      document.addEventListener('keydown', (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && this.isPaused) {
            this.togglePause();
        }

        if (['Escape', 'p', 'P'].includes(event.key)) {
            this.togglePause();
        }

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

.tile-with-apple {
  background-color: rgb(233, 54, 54);
}

.tile-with-snake {
  background-color: rgb(66, 209, 66);
}
</style>
