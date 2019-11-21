<script>
  import { onMount } from "svelte";

  let images = ["water", "record-player", "hairpin", "hotel-pool"];
  let currentNumber = 0;
  let timer = null;

  function startRotation() {
    timer = setInterval(loop, 5000);
  }

  function stopRotation() {
    clearTimeout(timer);
    timer = null;
  }

  function loop() {
    currentNumber += 1;
    if (currentNumber === 4) currentNumber = 0;
  }

  onMount(() => {
    startRotation();
  });
</script>

<style>
  .carousel-image {
    transition: all 2000ms ease 0s;
    z-index: -1;
  }

  .carousel-overlay {
    background: rgba(0, 0, 0, 0.1);
  }

  .carousel-title,
  .carousel-subtitle {
    text-shadow: 0px 2px 3px black;
  }

  .carousel-title {
    font-weight: 700;
  }
  .carousel-subtitle {
    font-weight: 600;
  }

  .active {
    @apply visible opacity-100;
  }
</style>

{#each images as image, i}
  <div
    class:active={currentNumber === i}
    class="carousel-image absolute inset-0 opacity-0 invisible bg-center
    bg-cover bg-no-repeat"
    style="background-image: url('/carousel/{image}.jpg')" />
{/each}

<div
  class="carousel-overlay flex-auto flex flex-col justify-center items-center
  text-white">
  <h1 class="carousel-title text-6xl">
    <slot name="title" />
  </h1>
  <h2 class="carousel-subtitle text-4xl">
    <i>
      <slot name="subtitle" />
    </i>
  </h2>
</div>
