<script lang="ts">
  import { onMount } from "svelte";
  import SEO from "$lib/components/SEO.svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<SEO
  title="Zaahir Moolla - Personal Website | Frontend Developer"
  description="Hey! I'm Zaahir, a frontend developer at DuckDuckGo who enjoys building things. Check out my projects and say hi!"
  url="https://zaahir.ca/"
/>

<div class="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
  <div class="text-center">
    <h1
      class="group relative mb-6 cursor-default text-6xl font-bold tracking-tight transition-all duration-800 md:text-8xl lg:text-9xl {mounted
        ? 'translate-y-0 opacity-100'
        : 'translate-y-12 opacity-0'}"
    >
      <span class="transition-colors duration-500 ease-out group-hover:text-accent"> Zaahir Moolla </span>
    </h1>
    <p
      class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground transition-all delay-200 duration-800 md:text-2xl {mounted
        ? 'translate-y-0 opacity-100'
        : 'translate-y-8 opacity-0'}"
    >
      Software engineer and maker of things&nbsp;🛠️
    </p>

    <div
      class="mt-8 transition-all delay-400 duration-800 {mounted
        ? 'translate-y-0 opacity-100'
        : 'translate-y-4 opacity-0'}"
    >
      <div class="mx-auto h-0.5 w-16 bg-accent"></div>
    </div>
  </div>
</div>
