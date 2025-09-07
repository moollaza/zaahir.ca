<script lang="ts">
  import "../app.css";

  import Nav from "$lib/components/Nav.svelte";

  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { page } from "$app/stores";

  onMount(() => {
    theme.init();
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <Nav />

  <main class="pt-16">
    {#key $page.url.pathname}
      <div
        in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}
        out:fly={{ y: -20, duration: 300, easing: quintOut }}
      >
        <slot />
      </div>
    {/key}
  </main>
</div>
