<script lang="ts">
  import { onMount } from 'svelte';
  import { boardingCard } from './store.js';

  let canvasElement;

  let boardingCard_value;

  const unsubscribe = boardingCard.subscribe((value) => {
    boardingCard_value = value;
    draw();
  });

  onMount(() => {
    draw();
  });

  function draw() {
    if (canvasElement) {
      setDpi();

      const ctx = canvasElement.getContext('2d');
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.fillStyle = 'green';
      ctx.fillRect(10, 10, 150, 100);

      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.fillText(boardingCard_value.host, 10, 20);
      ctx.fillText(boardingCard_value.guest, 10, 40);
      ctx.fillText(boardingCard_value.location, 10, 60);
      ctx.fillText(boardingCard_value.phone, 10, 80);
    }
  }

  function setDpi() {
    let dpi = window.devicePixelRatio;
    canvasElement.setAttribute('width', 794 * dpi);
    canvasElement.setAttribute('height', 360 * dpi);
  }

  function print() {
    const dataURL = canvasElement.toDataURL();
    console.log(dataURL);
    console.log(boardingCard_value);
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    max-width: 130px;
  }

  canvas {
    width: 794px;
    height: 360px;
    border: 1px solid lightgrey;
  }
</style>

<section>
  <canvas bind:this={canvasElement} />

  <button color="primary" title="Simple button" on:click={print}>Print</button>
</section>
