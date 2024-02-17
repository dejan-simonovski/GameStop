<template>
  <div class="controls">
    <label>Border:</label>
    <button @click="toggleBorder" class="button">{{ borderButtonText }}</button>
    <label>Speed:</label>
    <button @click="toggleSpeed" class="button">{{ gameSpeedButtonText }}</button>
    <button @click="togglePause" class="button">{{ isPaused ? 'Resume' : 'Pause' }}</button>
  </div>
</template>

<script>
export default {
  props: {
    isPaused: {
      type: Boolean,
      required: true
    },
    borderStyle: {
      type: String,
      required: true
    }
  },
  data() {
  return {
    speedOptions: ['Low', 'Mid', 'High'],
    speed: [200, 150, 50],
    currentSpeedIndex: 1
  };
},
  computed: {
    gameSpeedButtonText() {
      return this.speedOptions[this.currentSpeedIndex];
    },
    borderButtonText() {
      return this.borderStyle === 'solid' ? 'Solid' : 'Passthrough'
    }
  },
  methods: {
    toggleBorder() {
      this.$emit('toggle-border');
    },
    togglePause() {
      this.$emit('toggle-pause');
    },
    toggleSpeed() {
      this.currentSpeedIndex = (this.currentSpeedIndex + 1) % 3;
      this.$emit('toggle-speed', this.speed[this.currentSpeedIndex]);
    }
  }
};
</script>

<style scoped>
.controls {
  margin-bottom: 10px;
}

.button {
    display: inline-block;
    padding: 1px;
    margin-right: 5px;
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
</style>
