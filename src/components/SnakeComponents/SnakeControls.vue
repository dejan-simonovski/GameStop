<template>
  <div class="controls">
    <label>Border:</label>
    <select v-model="selectedBorder" @change="changeBorder" :disabled="!isPaused">
      <option value="solid">Solid</option>
      <option value="passthrough">Passthrough</option>
    </select>
    <label>Speed:</label>
    <select v-model="selectedSpeed" @change="changeSpeed" :disabled="!isPaused">
      <option v-for="(speedOption, index) in speedOptions" :key="index" :value="speed[index]">{{ speedOption }}</option>
    </select>
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
      selectedSpeed: 150, // Default to Mid speed
      selectedBorder: 'solid' // Default to solid border
    };
  },
  computed: {
    gameSpeedButtonText() {
      return this.speedOptions[this.currentSpeedIndex];
    },
    borderButtonText() {
      return this.selectedBorder === 'solid' ? 'Solid' : 'Passthrough';
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
    },
    changeSpeed() {
      this.$emit('toggle-speed', this.selectedSpeed);
    },
    changeBorder() {
      this.$emit('toggle-border', this.selectedBorder);
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
