<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Scramble from './Scramble.svelte';
  
  let time = 0;
  let inspectionWarning: string = "";
  let interval: number | undefined;
  let timerColor = 'white';
  let keyPressTime = 0;
  let isKeyPressed: boolean = false;
  let inspectionTime = 0;
  let inspectionInterval: number | undefined;
  let keyPressInterval: number | undefined;
  let status: 1 | 2 | 3 | 4 = 1;
  // 1 = no key pressed
  // 2 = spacebar pressed
  // 3 = inspection
  // 4 = timing

  const startTimer = () => {
    time = 0;
    interval = setInterval(() => {
      time += 1;
    }, 10);
    status = 4;
    timerColor = 'white';
  };

  const stopTimer = () => {
    clearInterval(interval);
    interval = undefined;
    status = 1;
  };

  const toggleTimer = () => {
    if (status === 4) {
      stopTimer();
    } else if (status === 3) {
      startTimer();
    }
  };

  const startInspection = () => {
    time = 0;
    status = 3;
  }

  // set inspection timer and update inspection warning
  $: {
    if (status === 3){
      clearInterval(inspectionInterval);
      inspectionInterval = setInterval(() => {
        inspectionTime += 1;
      }, 1000)
      switch (inspectionTime) {
        case 15:
          inspectionWarning = "+2";
          break;
        case 17: 
          inspectionWarning = "DNF";
          break;
        case 12:
          inspectionWarning = "12s";
          break;
        case 8: 
          inspectionWarning = "8s";
          break;
      }
    } else {
      inspectionTime = 0;
      inspectionWarning = "";
      clearInterval(inspectionInterval);
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      switch(status){
        case 2: 
          isKeyPressed = false;
          startInspection();
          break;
        case 3:
          isKeyPressed = false;
          if (keyPressTime >= 55) {
            toggleTimer();
          }
          break;
        case 4: 
          isKeyPressed = false;
          break;
        default: 
          isKeyPressed = false;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' && (status === 1)) {
      status = 2;
      isKeyPressed = true;
    } else if (event.code === 'Space' && (status === 3)) {
      isKeyPressed = true;
    } else if (event.code === 'Space' && (status === 4)) {
      isKeyPressed = true;
      toggleTimer();
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
      // timerColor = 'red';
      if (status === 1) {
        timerColor = "white";
        clearInterval(keyPressInterval);
        keyPressInterval = setInterval(() => {
        keyPressTime += 1;
      }, 10);
      }
      else if (status === 3) {
        timerColor = "red";
        clearInterval(keyPressInterval);
        keyPressInterval = setInterval(() => {
          keyPressTime += 1;
        }, 10);
        if (keyPressTime >= 55) {
          timerColor = "green";
        }
      } else {
        keyPressTime = 0;
        clearInterval(keyPressInterval);
      }
    } else {
      keyPressTime = 0;
    }
  }
</script>


<main class="timer-container">
  <Scramble />
  <div class="timer" style="color: {timerColor}">
    inspection time: {15 - inspectionTime} <br>
    {(time / 100).toFixed(2)} <br>
    {inspectionWarning} <br>
  </div>
</main>
