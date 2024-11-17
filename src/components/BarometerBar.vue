<template>
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ height: `${score}%` }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BarometerBar',
    props: {
      score: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .progress-bar-container {
    position: fixed;
    top: 20%;
    left: 20px;
    width: 40px;
    height: 60vh;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .progress-bar {
    width: 100%;
    height: 100%;
    background-color: orange;
    opacity: 0.6;
    border-radius: 10px;
    position: relative;
  }
  
  .progress-bar-fill {
    width: 100%;
    background-color: rgba(134, 87, 0, 0.808);
    transition: height 0.5s ease;
    position: absolute;
    bottom: 0;
  }
  </style>
  