<script lang="ts">
  import { X, ChevronLeft, ChevronRight } from "lucide-svelte";
  import type { Photo } from "../types";

  let { photo, onClose, onNext, onPrev } = $props<{
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
  }>();

  function handleBackdropClick(e: MouseEvent) {
    if (e.currentTarget === e.target) onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowLeft":
        onPrev();
        break;
      case "ArrowRight":
        onNext();
        break;
    }
  }
</script>

<div
  class="fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center border-none bg-black/85 p-4"
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
  role="dialog"
  aria-modal="true"
  tabindex="-1"
>
  <!-- Close button at top right of page -->
  <button
    onclick={onClose}
    aria-label="Close modal"
    class="fixed top-4 right-4 z-10 rounded-full bg-white/20 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95"
  >
    <X class="h-6 w-6" />
  </button>

  <!-- Photo title at top -->
  <div class="mb-4 text-center text-white">
    <h3 class="text-xl font-bold">{photo.title}</h3>
    <p class="text-sm opacity-75">{photo.location}</p>
  </div>

  <!-- Photo with navigation -->
  <div class="relative flex items-center gap-6">
    <!-- Previous button -->
    <button
      onclick={onPrev}
      aria-label="Previous photo"
      class="rounded-full bg-white/20 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95"
    >
      <ChevronLeft class="h-6 w-6" />
    </button>

    <!-- Photo -->
    <div class="relative" role="document">
      <enhanced:img src={photo.src} alt={photo.title} class="max-h-[70vh] max-w-[70vw] rounded-lg object-contain" />
    </div>

    <!-- Next button -->
    <button
      onclick={onNext}
      aria-label="Next photo"
      class="rounded-full bg-white/20 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95"
    >
      <ChevronRight class="h-6 w-6" />
    </button>
  </div>
</div>
