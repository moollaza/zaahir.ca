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
  .carousel {
    z-index: -2;

    &__image {
      transition: all 2000ms ease 0s;
    }

    &__overlay {
      background: rgba(0, 0, 0, 0.1);
      z-index: -1;

      h1,
      h2 {
        text-shadow: 0px 2px 3px black;
      }

      h1 {
        font-weight: 700;
      }

      h2 {
        font-weight: 600;
      }
    }
  }

  .active {
    @apply visible opacity-100;
  }
</style>

<div class="carousel-wrap">
  <div class="carousel absolute inset-0">
    {#each images as image, i}
      <div
        class:active={currentNumber === i}
        class="carousel__image absolute inset-0 opacity-0 invisible bg-center
        bg-cover bg-no-repeat"
        style="background-image: url('/carousel/{image}.jpg')" />
    {/each}
  </div>

  <div
    class="carousel__overlay absolute inset-0 flex flex-col justify-center
    items-center text-white">
    <slot name="title" class="text-6xl" />
    <slot name="subtitle" class="text-4xl" />
  </div>
</div>
