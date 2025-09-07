<script lang="ts">
  import { Mail, Github, AtSign } from "lucide-svelte";
  import { onMount } from "svelte";
  import SEO from "$lib/components/SEO.svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "@zaahir.ca",
      href: "mailto:info@zaahir.ca",
      description: "Send me an email",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@moollaza",
      href: "https://github.com/moollaza",
      description: "Check out my code",
    },
    {
      icon: AtSign,
      label: "Bluesky",
      value: "@zmoolla",
      href: "https://bsky.app/profile/zmoolla.bsky.social",
      description: "Follow me on Bluesky",
    },
  ];
</script>

<SEO
  title="Contact - Zaahir Moolla"
  description="Want to get in touch? Drop me a line! Reach me via email, GitHub, and online."
  url="https://zaahir.ca/contact"
/>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-20">
  <div class="mx-auto max-w-2xl text-center">
    <div class="transition-all duration-600 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
      <h2 class="group mb-8 cursor-default text-4xl font-bold md:text-5xl">
        <span class="transition-colors duration-500 ease-out group-hover:text-accent">Get in touch</span>
      </h2>
      <p class="mb-12 text-lg leading-relaxed text-muted-foreground">Send me an email, or find me online.</p>

      <div class="mx-auto grid max-w-lg grid-cols-1 gap-4 md:grid-cols-3">
        {#each contactMethods as method, index (method.href)}
          <a
            href={method.href}
            target={method.href.startsWith("mailto:") ? "_self" : "_blank"}
            rel={method.href.startsWith("mailto:") ? "" : "noopener noreferrer"}
            class="group flex flex-col items-center justify-center gap-3 rounded-lg border border-accent/20 bg-accent/5 p-6 transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-accent/10 {mounted
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'}"
            style="transition-delay: {(index + 2) * 100}ms;"
          >
            {#if method.icon === Mail}
              <Mail class="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
            {:else if method.icon === Github}
              <Github class="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
            {:else if method.icon === AtSign}
              <AtSign class="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
            {/if}
            <div class="text-center">
              <div class="mb-1 text-lg font-medium text-accent">{method.label}</div>
              <div class="text-sm break-all text-muted-foreground">
                {method.value}
              </div>
            </div>
          </a>
        {/each}
      </div>

      <div
        class="mt-12 transition-all delay-500 duration-600 {mounted
          ? 'translate-y-0 opacity-100'
          : 'translate-y-5 opacity-0'}"
      ></div>
    </div>
  </div>
</div>
