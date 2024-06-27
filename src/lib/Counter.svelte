<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Times } from "../utils/stores";
  import { displayedTime } from "../utils/timer"
  import type { inspectionObject, timerObject } from "../types/types";

  let counter = -1; // solve number

  let Timer: timerObject = {
    isKeyPressed: false,
    keyPressTime: 0,
    timerColor: "white",
    timerStatus: "idle",
  }
  
  let inspection: inspectionObject = {
    time: 0,
    warning: "",
  }


  let interval: number | undefined; // time interval
  let inspectionInterval: number | undefined;
  let keyPressInterval: number | undefined;

  const startTimer = () => {
    interval = setInterval(() => {
      $Times[counter].time += 1;
    }, 10);
    Timer.timerStatus = "solving";
    Timer.timerColor = "white";
  };

  // things that should happen on start timer?

  const stopTimer = () => {
    clearInterval(interval);
    $Times = $Times;
    interval = undefined;
    Timer.timerStatus = "idle"
    Timer.isKeyPressed = false;
    Timer.keyPressTime = 0;
  };

  // things that should happen on stop timer?
  // - add new time to $Times

  const toggleTimer = () => {
    if (Timer.timerStatus === "solving") {
      stopTimer();
    } else if (Timer.timerStatus === "inspection") {
      startTimer();
    }
  };

  const startInspection = () => {
    $Times.push({
    time: 0,
    penalty: "none",
    })
    counter++;
    Timer.timerColor = "pink";
    Timer.timerStatus = "inspection";
  };

  // things that should happen on start inspection
  // add blank time to $Times, counter++
  // add prev solve to localstorage

  // set inspection timer and update inspection warning
  $: {
    if (Timer.timerStatus === "inspection") {
      clearInterval(inspectionInterval);
      inspectionInterval = setInterval(() => {
        inspection.time += 1;
      }, 1000);
      switch (inspection.time) {
        case 15:
          $Times[counter].penalty = "+2";
          inspection.warning = "+2";
          break;
        case 17:
          $Times[counter].penalty = "DNF";
          inspection.warning = "DNF";
          break;
        case 12:
          inspection.warning = "12s";
          break;
        case 8:
          inspection.warning = "8s";
          break;
      }
    } else {
      inspection.time = 0;
      inspection.warning = "";
      clearInterval(inspectionInterval);
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      switch (Timer.timerStatus) {
        case "keyPressed":
          Timer.isKeyPressed = false;
          startInspection();
          break;
        case "inspection":
          Timer.isKeyPressed = false;
          if (Timer.keyPressTime >= 55) {
            toggleTimer();
          }
          break;
        case "solving":
          Timer.isKeyPressed = false;
          break;
        default:
          Timer.isKeyPressed = false;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" && Timer.timerStatus === "idle") {
      Timer.timerStatus = "keyPressed";
      Timer.isKeyPressed = true;
    } else if (event.code === "Space" && Timer.timerStatus === "inspection") {
      Timer.isKeyPressed = true;
    } else if (event.code === "Space" && Timer.timerStatus === "solving") {
      Timer.isKeyPressed = true;
      toggleTimer();
    }
  };

  onMount(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("keydown", handleKeyDown);
    if (interval) {
      clearInterval(interval);
    }
  });

  $: {
    if (Timer.isKeyPressed) {
      if (Timer.timerStatus === "idle") {
        Timer.timerColor = "white";
        clearInterval(keyPressInterval);
        keyPressInterval = setInterval(() => {
          Timer.keyPressTime += 1;
        }, 10);
      } else if (Timer.timerStatus === "inspection") {
        Timer.timerColor = "red";
        clearInterval(keyPressInterval);
        keyPressInterval = setInterval(() => {
          Timer.keyPressTime += 1;
        }, 10);
        if (Timer.keyPressTime >= 55) {
          Timer.timerColor = "green";
        }
      } else {
        Timer.keyPressTime = 0;
        clearInterval(keyPressInterval);
      }
    } else {
      Timer.keyPressTime = 0;
    }
  }
</script>

<main class="timer-container">
  <div class="timer" style="color: {Timer.timerColor}">
    <div class="penalty-menu">
      <button on:click={() => $Times[counter].penalty = "none"}>-</button>
      <button on:click={() => $Times[counter].penalty = "+2"}>+2</button>
      <button on:click={() => $Times[counter].penalty = "DNF"}>DNF</button>
    </div>
    <h1>
      {#if $Times[counter] !== undefined}
        {displayedTime($Times[counter])}
      {:else}
        0.00
      {/if}
    </h1>
    <h2>{15 - inspection.time}</h2>
    <h3>{inspection.warning}</h3>
  </div>
</main>

<style>
  .penalty-menu {
    font-size: 1.5rem;
    display: inline-block;
  }
</style>
