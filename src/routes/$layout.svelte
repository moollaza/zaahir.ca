<script>
	import { page, navigating } from '$app/stores';

	import '../app.postcss';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';

	$: path = $page.path;
	$: isHome = path === '/';
</script>

<svelte:head>
	<!-- Custom Tags -->
	<meta
		name="description"
		content="Personal Website of Zaahir Moolla. Frontend Developer at DuckDuckGo."
	/>

	<!-- Google / Search Engine Tags -->
	<meta itemprop="name" content="Zaahir Moolla - Personal Website" />
	<meta
		itemprop="description"
		content="Personal Website of Zaahir Moolla. Frontend Developer at DuckDuckGo."
	/>
	<meta itemprop="image" content="social.png" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://zaahir.ca" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Zaahir Moolla - Personal Website" />
	<meta
		property="og:description"
		content="Personal Website of Zaahir Moolla. Frontend Developer at DuckDuckGo."
	/>
	<meta property="og:image" content="social.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Zaahir Moolla - Personal Website" />
	<meta
		name="twitter:description"
		content="Personal Website of Zaahir Moolla. Frontend Developer at DuckDuckGo."
	/>
	<meta name="twitter:image" content="social.png" />
	<!-- // End Custom Tags -->
</svelte:head>

<Nav {path} />

<main class="flex-auto flex" class:items-stretch={isHome} class:relative={isHome}>
	<slot />
</main>

<Footer {isHome} />

<style style lang="postcss">
:global {
	html {
		@apply antialiased text-center text-base text-gray-500;
		font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	}
	
	/* For About, Contact */
	section {
		@apply flex-shrink-0 px-4;

		h1 {
			@apply m-auto text-5xl text-gray-800 font-bold uppercase;
		}

		.spacer {
			width: 100px;
			height: 2px;
			@apply block mx-auto bg-orange-500 my-6 border-none;
		}

		p {
			@apply text-gray-700;

			a {
				@apply text-orange-500;
			}
		}

		img {
			@apply inline-block;
		}
	}
}
</style>