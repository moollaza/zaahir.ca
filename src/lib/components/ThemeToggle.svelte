<script lang="ts">
  import { theme, getResolvedTheme } from "$lib/stores/theme";
  import { Sun, Moon } from "lucide-svelte";

  let currentTheme = $derived($theme);

  function toggleTheme() {
    theme.toggle();
  }

  let resolvedTheme = $derived(getResolvedTheme(currentTheme));
  let isDark = $derived(resolvedTheme === "dark");
</script>

<button
  onclick={toggleTheme}
  class="relative flex h-12 w-12 items-center justify-center rounded-full bg-orange-600/10 transition-all duration-300 hover:scale-105 hover:bg-orange-600/20 dark:bg-red-600/10 dark:hover:bg-red-600/20"
  aria-label="Toggle {isDark ? 'light' : 'dark'} mode"
>
  <div class="relative transition-all duration-300 {isDark ? 'rotate-180' : 'rotate-0'}">
    {#if isDark}
      <Moon class="h-5 w-5 text-orange-600 dark:text-red-400" />
    {:else}
      <Sun class="h-5 w-5 text-orange-600 dark:text-red-400" />
    {/if}
  </div>
</button>
