<script>
  let hideMenu = true;
  export let segment;
</script>

<style>
  nav {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.85);
  }

  a {
    @apply text-sm uppercase font-bold text-gray-700;

    &.selected {
      @apply text-orange-600;
    }
  }
</style>

<nav class="flex items-center justify-center flex-wrap bg-gray-500 p-4">
  <div class="block ml-auto md:hidden">
    <button
      class="flex items-center px-3 py-2 border rounded text-orange-500
      border-orange-700 hover:text-gray-500 hover:border-gray-700"
      on:click={() => (hideMenu = !hideMenu)}>
      <!-- Hamburger icon -->
      <svg
        class="fill-current h-3 w-3"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  </div>
  <div
    class:hidden={hideMenu}
    class="w-full block md:flex md:items-center md:w-auto">
    <div class="text-center">
      <a
        class="block mt-4 hover:text-orange-600 md:inline-block md:mt-0 md:w-20"
        class:selected={segment === undefined}
        href="."
        rel="prefetch">
        Home
      </a>
      <a
        class="block mt-4 hover:text-orange-600 md:inline-block md:mt-0 md:w-20"
        class:selected={segment === 'about'}
        href="/about"
        rel="prefetch">
        About
      </a>
      <a
        class="block mt-4 hover:text-orange-600 md:inline-block md:mt-0 md:w-20"
        class:selected={segment === 'contact'}
        href="/contact"
        rel="prefetch">
        Contact
      </a>
    </div>
  </div>
</nav>
