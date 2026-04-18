<script lang="ts">
  import { page } from "$app/stores";
  import SEO from "$lib/components/SEO.svelte";
</script>

<SEO
  title="Page not found — Zaahir Moolla"
  description="The page you're looking for doesn't exist."
  url={`https://zaahir.ca${$page.url.pathname}`}
/>

<div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
  <p class="text-6xl font-bold md:text-8xl">{$page.status}</p>
  <p class="mt-6 text-xl text-muted-foreground md:text-2xl">
    {$page.error?.message ?? "Page not found"}
  </p>
  <a href="/" class="mt-8 text-accent underline underline-offset-4 hover:text-accent/80" aria-label="Go back to home">
    Go home
  </a>
</div>
