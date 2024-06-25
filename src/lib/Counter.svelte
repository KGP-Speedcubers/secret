<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Scramble from './Scramble.svelte';
  
  let time = 0;
  let interval: number | undefined;
  let timerColor = 'white';
  let isTimerRunning = false;
  let isKeyPressed = false;
  let keyPressTime = 0;
  let keyPressInterval: number | undefined;

  const startTimer = () => {
    time = 0;
    interval = setInterval(() => {
      time += 1;
    }, 10);
    isTimerRunning = true;
    timerColor = 'white';
  };

  const stopTimer = () => {
    clearInterval(interval);
    interval = undefined;
    isTimerRunning = false;
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      if (keyPressTime >= 55 || isTimerRunning){
        toggleTimer();
      }
      isKeyPressed = false;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !isTimerRunning) {
      isKeyPressed = true;
    }
  };

  onMount(() => {
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('keydown', handleKeyDown);
    if (interval) {
      clearInterval(interval);
    }
  });

  $: {
    if (isKeyPressed) {
      timerColor = 'red';
      clearInterval(keyPressInterval);
      keyPressInterval = setInterval(() => {
        keyPressTime += 1;
      }, 10)
      if (keyPressTime >= 55) {
        timerColor = 'green';
      }
    } else {
      timerColor = 'white';
      clearInterval(keyPressInterval);
      keyPressTime = 0;
    }
  }
</script>


<main class="timer-container">
  <Scramble />
  <div class="timer" style="color: {timerColor}">
    {(time / 100).toFixed(2)}
  </div>
</main>
