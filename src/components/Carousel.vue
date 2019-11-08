<template>
  <div class="carousel-wrap">
    <div class="carousel">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel__image"
        :class="{ active: currentNumber === index }"
        v-bind:style="{
          backgroundImage: `url('/carousel/${image}.jpg')`
        }"
      ></div>
    </div>

    <div class="carousel__overlay">
      <h1>ZAAHIR MOOLLA</h1>
      <h2><i>moollaza</i></h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: ["water", "record-player", "hairpin", "hotel-pool"],
      currentNumber: 0,
      timer: null
    };
  },

  mounted: function() {
    this.startRotation();
  },

  methods: {
    startRotation: function() {
      this.timer = setInterval(this.loop, 5000);
    },

    stopRotation: function() {
      clearTimeout(this.timer);
      this.timer = null;
    },

    loop: function() {
      this.currentNumber += 1;
      if (this.currentNumber === 4) this.currentNumber = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  &__image {
    width: 100%;
    height: 100%;
    position: absolute;
    background: center center no-repeat;
    background-size: cover;
    opacity: 0;
    visibility: hidden;
    transition: all 1000ms ease 0s;
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
