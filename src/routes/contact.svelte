<svelte:head>
	<title>Contact Me | Zaahir Moolla - Personal Website</title>
</svelte:head>

<section class="m-auto">
	<h1>Contact</h1>

	<span class="spacer" />

	<p class="md:text-xl pb-6 md:pb-4">Send me an email, or find me online.</p>

	<p class="flex w-full sm:w-auto flex-no-wrap justify-center">
		<a href="mailto:info@zaahir.ca" class="hvr-float w-10 md:w-16">
			<img src="/icons/email.png" alt="at symbol" />
		</a>
		<a href="https://twitter.com/zmoolla" class="hvr-float w-10 md:w-16">
			<img src="/icons/twitter.png" alt="Twitter logo" />
		</a>
		<a href="https://github.com/moollaza" class="hvr-float w-10 md:w-16">
			<img src="/icons/github.png" alt="GitHub logo" />
		</a>
	</p>
</section>

<style style lang="postcss">
	img {
		filter: grayscale(100%);
	}
	img:hover {
		animation: colourize 0.3s linear forwards;
		animation-iteration-count: 1;
	}

	@keyframes colourize {
		to {
			filter: grayscale(0%);
		}
	}
</style>
