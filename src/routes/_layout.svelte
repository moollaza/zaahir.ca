<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<Nav {segment} />

<main class="flex-grow flex">
  <slot />
</main>

<Footer {segment} />
