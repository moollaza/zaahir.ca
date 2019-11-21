<script>
  export let segment;
</script>

<style>
  nav {
    background-color: rgba(255, 255, 255, 0.85);
  }

  a {
    @apply text-sm uppercase font-bold text-gray-700;
    transition: 0.3s all;

    &.selected {
      @apply text-orange-600;
    }
  }

  a:hover {
    @apply text-orange-600;
  }

  .menu-icon {
    width: 20px;
  }
</style>

<nav class="flex items-center justify-center flex-wrap bg-gray-500 p-4 shadow">
  <div class="w-full sm:w-2/4 md:w-auto flex justify-around items-center">
    <a
      class="flex-1 md:w-20"
      class:selected={segment === undefined}
      href="."
      rel="prefetch">
      Home
    </a>
    <a
      class="flex-1 md:w-20"
      class:selected={segment === 'about'}
      href="/about"
      rel="prefetch">
      About
    </a>
    <a
      class="flex-1 md:w-20"
      class:selected={segment === 'contact'}
      href="/contact"
      rel="prefetch">
      Contact
    </a>
  </div>
</nav>
