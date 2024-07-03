<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Scramble from './Scramble.svelte';
  
	let timerObject = {
	  interval: undefined as number | undefined,
	  value: 0, // centiseconds
	  inspection: 0, // seconds
	  mode: 'idle' as 'idle' | 'inspection' | 'solving' | 'ready',
	  color: 'white' as 'white' | 'red' | 'green',
	  holdStartTime: 0,
	  isHolding: false,
	  solves: [] as number[], // Store solving times
	};
  
	// Start inspection phase
	const startInspection = () => {
	  clearInterval(timerObject.interval);
	  timerObject.mode = 'inspection';
	  timerObject.color = 'red';
	  timerObject.inspection = 15;
	  timerObject.interval = setInterval(() => {
		timerObject.inspection--;
	  }, 1000);
	};
  
	// Start solving phase
	const startTimer = () => {
	  timerObject.mode = 'solving';
	  timerObject.value = 0;
	  clearInterval(timerObject.interval);
	  timerObject.interval = setInterval(() => {
		timerObject.value++;
	  }, 10);
	};
  
	// Handle key press events
	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === ' ') {

		console.log(timerObject.mode);
		if(!timerObject.isHolding) {
			timerObject.holdStartTime = Date.now();
			timerObject.isHolding = true;
		}
		switch (timerObject.mode) {
			case 'idle':
				startInspection();
				break;
			case 'inspection':
				if(timerObject.isHolding && (Date.now() - timerObject.holdStartTime >= 550)){
					timerObject.mode = 'ready';
					timerObject.color = 'green';
				}
				break;
			case 'solving':
				clearInterval(timerObject.interval);
				timerObject.mode = 'idle';
				timerObject.solves.push(timerObject.value);
				break;
			}
		}
	};
  
	// Handle key up events
	const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === ' ' && timerObject.isHolding) {
		timerObject.isHolding = false;
		if (timerObject.mode === 'inspection' && Date.now() - timerObject.holdStartTime >= 550) {
			timerObject.mode = 'ready';
			timerObject.color = 'green';
		} else if (timerObject.mode === 'ready') {
			clearInterval(timerObject.interval);
			timerObject.color = 'white';
			startTimer();
		}
	}};

	onMount(() => {
		window.addEventListener('keypress', handleKeyPress);
		window.addEventListener('keyup', handleKeyUp);
	});
  
	onDestroy(() => {
		window.removeEventListener('keypress', handleKeyPress);
		window.removeEventListener('keyup', handleKeyUp);
		clearInterval(timerObject.interval);
	});
  </script>

  
<main class="timer-container">
	<Scramble />
	<div class="timer" style="color: {timerObject.color};">
		{#if timerObject.mode === 'inspection' || timerObject.mode === 'ready'}
			{timerObject.inspection > 0 ? timerObject.inspection : 'GO!'}
		{:else}
			{(timerObject.value / 100).toFixed(2)}
		{/if}
	</div>
	<div class="solves">
		{#each timerObject.solves as solve}
			<div>{(solve / 100).toFixed(2)}</div>
		{/each}
	</div>
</main>
