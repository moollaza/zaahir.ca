<script>
  import { beforeUpdate, onMount } from "svelte";

  let images = ["water", "bridge", "hairpin", "pool"];
  let currentNumber = 0;
  let timer = null;
  let supportsWebP = false;
  let initialized = false;

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

  // source: https://stackoverflow.com/questions/5573096/detecting-webp-support
  function canUseWebP() {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") == 0
    );
  }

  function setBackground(node, image) {
    const fileType = supportsWebP ? "webp" : "jpg";
    node.style.backgroundImage = `url('/carousel/${image}.${fileType}')`;
  }

  beforeUpdate(() => {
    if (!initialized) {
      supportsWebP = canUseWebP();
      initialized = true;
    }
  });

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
    background: rgba(0, 0, 0, 0.2);
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
    use:setBackground={image}
    class:active={currentNumber === i}
    class="carousel-image absolute inset-0 opacity-0 invisible bg-center
    bg-cover bg-no-repeat" />
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
