<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<Nav {segment} />

<main
  class="flex-auto flex"
  class:items-stretch={segment === undefined}
  class:relative={segment === undefined}>
  <slot />
</main>

<Footer {segment} />
