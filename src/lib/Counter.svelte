<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Scramble from './Scramble.svelte';
  let time = 0;
  let interval: number | undefined;
  let timerColor = 'white';
  let isTimerRunning = false;

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
      toggleTimer();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !isTimerRunning) {
      timerColor = 'green';
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
</script>


<main class="timer-container">
  <Scramble />
  <div class="timer" style="color: {timerColor}">
    {(time / 100).toFixed(2)}
  </div>
</main>
