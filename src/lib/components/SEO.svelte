<script lang="ts">
  interface Props {
    title: string;
    description: string;
    url: string;
    image?: string;
    type?: string;
  }

  let { title, description, url, image, type = "website" }: Props = $props();

  const siteName = "Zaahir Moolla";

  // Generate dynamic OG image URL if no custom image provided
  const ogImage =
    image ||
    `https://zaahir.ca/og?${new URLSearchParams({
      title,
      description,
    }).toString()}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>
