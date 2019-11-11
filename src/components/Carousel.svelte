<script>
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

<style type="text/postcss">
  .carousel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;

    &__image {
      width: 100%;
      height: 100%;
      position: absolute;
      background: center center no-repeat;
      background-size: cover;
      opacity: 0;
      visibility: hidden;
      transition: all 2000ms ease 0s;
    }

    &__overlay {
      position: absolute;
      display: flex;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      background: rgba(0, 0, 0, 0.1);
      z-index: -1;

      h1,
      h2 {
        text-shadow: 0px 2px 3px black;
      }
    }
  }

  .active {
    visibility: visible;
    opacity: 1;
  }
</style>

<div class="carousel-wrap">
  <div class="carousel">
    <div
      v-for="(image, index) in images"
      class="carousel__image"
      class:active={currentNumber === index}
      style="backgroundImage: url('/carousel/{image}.jpg')" />
  </div>

  <div class="carousel__overlay">
    <h1>ZAAHIR MOOLLA</h1>
    <h2>
      <i>moollaza</i>
    </h2>
  </div>
</div>
