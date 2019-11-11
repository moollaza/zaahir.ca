<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
