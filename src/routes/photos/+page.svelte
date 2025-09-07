<script lang="ts">
  import { onMount } from "svelte";
  import type { Photo } from "$lib/types";
  import SEO from "$lib/components/SEO.svelte";
  import PhotoModal from "$lib/components/PhotoModal.svelte";
  import waterImg from "$lib/assets/images/photos/water.jpg?enhanced";
  import bridgeImg from "$lib/assets/images/photos/bridge.jpg?enhanced";
  import hairpinImg from "$lib/assets/images/photos/hairpin.jpg?enhanced";
  import poolImg from "$lib/assets/images/photos/pool.jpg?enhanced";

  function countPhotoClick(photoTitle: string) {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent(`photo_view_${photoTitle.toLowerCase().replace(/\s+/g, "_")}`);
    }
  }

  const photos: Photo[] = [
    {
      id: 1,
      src: waterImg,
      title: "Faraglioni Islets",
      location: "Capri, Italy",
    },
    {
      id: 2,
      src: bridgeImg,
      title: "Ponte Vecchio",
      location: "Florence, Italy",
    },
    {
      id: 3,
      src: hairpinImg,
      title: "Hairpin",
      location: "Amalfi Coast, Italy",
    },
    {
      id: 4,
      src: poolImg,
      title: "Seaside Resort",
      location: "Amalfi Coast, Italy",
    },
  ];

  let mounted = $state(false);
  let selectedPhotoIndex = $state<number | null>(null);

  function openModal(index: number) {
    selectedPhotoIndex = index;
    countPhotoClick(photos[index].title);
  }

  function closeModal() {
    selectedPhotoIndex = null;
  }

  function nextPhoto() {
    if (selectedPhotoIndex !== null) {
      selectedPhotoIndex = (selectedPhotoIndex + 1) % photos.length;
    }
  }

  function prevPhoto() {
    if (selectedPhotoIndex !== null) {
      selectedPhotoIndex = (selectedPhotoIndex - 1 + photos.length) % photos.length;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (selectedPhotoIndex === null) return;
    if (event.key === "ArrowRight") {
      nextPhoto();
    } else if (event.key === "ArrowLeft") {
      prevPhoto();
    } else if (event.key === "Escape") {
      closeModal();
    }
  }

  onMount(() => {
    mounted = true;
  });
</script>

<SEO
  title="Photos - Zaahir Moolla"
  description="Some photos I've taken while traveling!"
  url="https://zaahir.ca/photos"
/>

<svelte:window onkeydown={handleKeydown} />

<div class="px-6 py-20">
  <div class="mx-auto max-w-6xl">
    <div class="transition-all duration-600 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
      <h2 class="group mb-16 cursor-default text-center text-4xl font-bold md:text-5xl">
        <span class="transition-colors duration-500 ease-out group-hover:text-accent"> Photos </span>
      </h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each photos as photo, index (photo.id)}
          <button
            onclick={() => openModal(index)}
            aria-label="View photo: {photo.title}"
            class="group cursor-pointer break-inside-avoid transition-all duration-600 hover:scale-[1.02] {mounted
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'} border-none bg-transparent p-0 text-left"
            style="transition-delay: {index * 100}ms;"
          >
            <div
              class="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div class="overflow-hidden">
                <enhanced:img
                  src={photo.src}
                  alt={photo.title}
                  class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-sm font-medium">{photo.title}</p>
                    <p class="text-xs text-muted-foreground">{photo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

{#if selectedPhotoIndex !== null}
  <PhotoModal photo={photos[selectedPhotoIndex]} onClose={closeModal} onNext={nextPhoto} onPrev={prevPhoto} />
{/if}
