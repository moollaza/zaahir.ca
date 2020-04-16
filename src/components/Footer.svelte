<script>
  export let segment;

  $: showIconsCred = segment === "about" || segment === "contact";
</script>

<footer
  class:text-white={!segment}
  class:absolute={!segment}
  class:bottom-0={!segment}
  class="mt-auto text-xs md:text-base w-full flex items-center justify-center
  p-2">
  <span>© 2019 Zaahir Moolla</span>

  {#if showIconsCred}
    <span class="px-2">|</span>
    <span>
      Icons by
      <a href="https://icons8.com" class="underline">Icons8</a>
    </span>
  {/if}

  {#if !segment}
    <span class="px-2">|</span>
    <span>Photos by Zaahir Moolla</span>
  {/if}
</footer>
