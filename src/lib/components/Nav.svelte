<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { Menu, X } from "lucide-svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  function countLogoClick() {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent("logo_click");
    }
  }

  function countNavClick(label: string) {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent(`nav_${label.toLowerCase()}_click`);
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/photos", label: "Photos" },
    { href: "/contact", label: "Contact" },
  ];

  let navRef: HTMLElement;
  let mounted = $state(false);
  let underlineReady = $state(false);
  let mobileMenuOpen = $state(false);
  let underlineStyle = new Tween({ left: 0, width: 0 }, { duration: 400, easing: quintOut });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function handleMobileNavClick(label: string) {
    countNavClick(label);
    closeMobileMenu();
  }

  function updateUnderline() {
    // Only update underline on desktop (when navRef is visible)
    if (navRef && window.innerWidth >= 768) {
      const activeEl = navRef.querySelector(`a[href="${page.url.pathname}"]`) as HTMLElement;
      if (activeEl) {
        // Set position immediately without animation
        underlineStyle.set(
          {
            left: activeEl.offsetLeft,
            width: activeEl.offsetWidth,
          },
          { duration: 0 },
        );
      } else {
        // Hide underline if no active link found
        underlineReady = false;
      }
    }
  }

  onMount(() => {
    mounted = true;
    // Delay underline animation to start while nav is still sliding in
    setTimeout(() => {
      underlineReady = true;
      updateUnderline();
    }, 600); // Start earlier, during nav animation
  });

  // Use $effect to watch for page changes instead of afterUpdate
  $effect(() => {
    // Watch the page pathname
    void page.url.pathname;
    // Update underline when mounted and page changes
    if (mounted) {
      updateUnderline();
    }
  });
</script>

<nav
  class="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm transition-all duration-800 {mounted
    ? 'translate-y-0 opacity-100'
    : '-translate-y-full opacity-0'}"
>
  <div class="mx-auto max-w-6xl px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-lg font-bold text-accent">
        <a href="/" onclick={() => countLogoClick()}>ZM</a>
      </div>

      <!-- Desktop Navigation -->
      <div class="relative hidden gap-8 md:flex" bind:this={navRef}>
        {#each navItems as item (item.href)}
          {@const isActive = page.url.pathname === item.href}
          <a
            href={item.href}
            onclick={() => countNavClick(item.label)}
            class="relative px-4 py-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] {isActive
              ? 'text-accent'
              : 'text-muted-foreground hover:text-foreground'}"
          >
            {item.label}
          </a>
        {/each}

        <div
          class="absolute bottom-0 h-0.5 bg-accent transition-all duration-700 ease-out"
          style="left: {underlineStyle.current.left + underlineStyle.current.width / 2}px; width: {underlineReady
            ? underlineStyle.current.width
            : 0}px; transform: translateX(-50%); opacity: {underlineReady ? 1 : 0};"
        ></div>
      </div>

      <!-- Desktop Theme Toggle and Mobile Menu Button -->
      <div class="flex items-center gap-4">
        <div class="hidden md:block">
          <ThemeToggle />
        </div>
        <button
          onclick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 transition-all duration-300 hover:scale-105 hover:bg-accent/20 md:hidden"
        >
          {#if mobileMenuOpen}
            <X class="h-5 w-5 text-accent" />
          {:else}
            <Menu class="h-5 w-5 text-accent" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  <div
    class="absolute top-full right-0 left-0 origin-top overflow-hidden border-b border-border bg-background transition-all duration-300 ease-out md:hidden {mobileMenuOpen
      ? 'scale-y-100 opacity-100'
      : 'pointer-events-none scale-y-0 opacity-0'}"
  >
    <div class="mx-auto max-w-6xl px-6 py-4">
      <div class="flex flex-col gap-2">
        {#each navItems as item, index (item.href)}
          {@const isActive = page.url.pathname === item.href}
          <a
            href={item.href}
            onclick={() => handleMobileNavClick(item.label)}
            class="rounded-lg px-4 py-3 text-left transition-all duration-200 hover:bg-accent/10 active:scale-[0.98] {isActive
              ? 'bg-accent/20 font-medium text-accent'
              : 'text-muted-foreground hover:text-foreground'} {mobileMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-4 opacity-0'}"
            style="transition-delay: {mobileMenuOpen ? (index + 1) * 50 : 0}ms;"
          >
            {item.label}
          </a>
        {/each}

        <!-- Theme Toggle in Mobile Menu -->
        <div
          class="mt-4 border-t border-border pt-4 transition-all duration-200 {mobileMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-4 opacity-0'}"
          style="transition-delay: {mobileMenuOpen ? (navItems.length + 1) * 50 : 0}ms;"
        >
          <div class="flex items-center justify-between px-4 py-2">
            <span class="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
