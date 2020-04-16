<script>
  export let segment;

  const links = [
    {
      segment: undefined,
      href: ".",
      name: "Home"
    },
    {
      segment: "about",
      href: "/about",
      name: "About"
    },
    {
      segment: "projects",
      href: "/projects",
      name: "Projects"
    },
    {
      segment: "contact",
      href: "/contact",
      name: "Contact"
    }
  ];
</script>

<style>
  nav {
    background-color: rgba(255, 255, 255, 0.85);
  }

  a {
    @apply text-sm uppercase font-bold text-gray-700;
    transition: 0.3s all;

    &.selected {
      @apply text-orange-500;
    }
  }
</style>

<nav class="flex items-center justify-center flex-wrap bg-gray-500 shadow">
  <div class="w-full sm:w-2/4 md:w-auto flex justify-center items-center">
    {#each links as link}
      <a
        class="text-xs sm:text-sm md:text-lg px-2 md:px-4 py-4
        hover:text-orange-500"
        class:selected={segment === link.segment}
        href={link.href}
        rel="prefetch">
        {link.name}
      </a>
    {/each}
  </div>
</nav>
