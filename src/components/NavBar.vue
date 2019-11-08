<template>
  <nav class="flex items-center justify-center flex-wrap bg-gray-500 p-6">
    <div class="block ml-auto md:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-orange-500 border-orange-700 hover:text-gray-500 hover:border-gray-700"
        @click="hideMenu = !hideMenu"
      >
        <!-- Hamburger icon -->
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      class="w-full block flex-grows md:flex md:items-center md:w-auto"
      :class="{ hidden: hideMenu }"
    >
      <div class="text-center">
        <router-link
          to="/"
          class="block mt-4 md:inline-block md:mt-0 text-orange-500 hover:text-gray-700 md:w-20"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="block mt-4 md:inline-block md:mt-0 text-orange-500 hover:text-gray-700 md:w-20"
          >About</router-link
        >
        <router-link
          to="/contact"
          class="block mt-4 md:inline-block md:mt-0 text-orange-500 hover:text-gray-700 md:w-20"
          >Contact</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      hideMenu: true
    };
  }
};
</script>

<style scoped lang="scss">
nav {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
