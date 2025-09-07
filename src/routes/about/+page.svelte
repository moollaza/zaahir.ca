<script lang="ts">
  import { MapPin, Music, Film, Cpu } from "lucide-svelte";
  import { onMount } from "svelte";
  import SEO from "$lib/components/SEO.svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<SEO
  title="About Me - Zaahir Moolla"
  description="Hey there! I'm Zaahir. Canadian developer, musician, and tech nerd. I've been building stuff at DuckDuckGo for over a decade."
  url="https://zaahir.ca/about"
/>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-20">
  <div class="mx-auto max-w-3xl">
    <div class="transition-all duration-600 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
      <h2 class="group mb-12 cursor-default text-center text-4xl font-bold md:text-5xl">
        <span class="transition-colors duration-500 ease-out group-hover:text-accent"> About Me </span>
      </h2>

      <div class="space-y-8">
        <div class="space-y-6 text-lg leading-relaxed">
          <p
            class="transition-all delay-100 duration-600 {mounted
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'}"
          >
            Hey there! 👋 I'm a front-end developer who's spent over a decade at DuckDuckGo 🦆 working across the stack
            on everything from marketing pages to help documentation, and of course, the search results page. It's been
            great to work on an impactful product that millions of people use every day.
          </p>

          <p
            class="transition-all delay-200 duration-600 {mounted
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'}"
          >
            When I'm not working, I enjoy creating privacy-focused tools and games (check out my <a
              href="/projects"
              class="text-accent hover:text-accent-dark hover:underline">projects</a
            >!), designing 3D printed items for my
            <a href="http://thedelightfulprinter.etsy.com/" class="text-accent hover:text-accent-dark hover:underline"
              >Etsy shop</a
            >, or singing and playing guitar 🎸.
          </p>
        </div>

        <div
          class="grid grid-cols-2 gap-6 pt-6 transition-all delay-400 duration-600 md:grid-cols-4 {mounted
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'}"
        >
          <div class="text-center">
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
            >
              <MapPin class="h-5 w-5" />
            </div>
            <div class="text-sm text-muted-foreground">Canadian</div>
          </div>

          <div class="text-center">
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
            >
              <Music class="h-5 w-5" />
            </div>
            <div class="text-sm text-muted-foreground">Musician</div>
          </div>

          <div class="text-center">
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
            >
              <Film class="h-5 w-5" />
            </div>
            <div class="text-sm text-muted-foreground">Film Lover</div>
          </div>

          <div class="text-center">
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
            >
              <Cpu class="h-5 w-5" />
            </div>
            <div class="text-sm text-muted-foreground">Tech Nerd</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
