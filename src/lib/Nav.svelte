<script>
	export let path;
</script>

<nav class="flex items-center justify-center flex-wrap bg-gray-500 p-4 shadow">
	<div class="w-full sm:w-2/4 md:w-auto flex justify-around items-center">
		<a href="/" sveltekit:prefetch class="flex-1 md:w-20" class:selected={path === '/'}>Home</a>
		<a href="/about" sveltekit:prefetch class="flex-1 md:w-20" class:selected={path === '/about'}>
			About
		</a>
		<a
			href="/contact"
			sveltekit:prefetch
			class="flex-1 md:w-20"
			class:selected={path === '/contact'}
		>
			Contact
		</a>
	</div>
</nav>

<style style lang="postcss">
	nav {
		background-color: rgba(255, 255, 255, 0.85);
	}

	a {
		@apply text-sm uppercase font-bold text-gray-700;
		transition: 0.3s all;
	}

	a.selected,
	a:hover {
		@apply text-orange-600;
	}
</style>
