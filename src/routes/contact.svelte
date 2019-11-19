<style>
  img {
    width: 75px;
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

<svelte:head>
  <title>Contact</title>
</svelte:head>

<section class="m-auto">
  <h1>Contact</h1>

  <span class="spacer" />

  <p>Send me an email, or find me online</p>

  <p>
    <a href="mailto:info@zaahir.ca" class="hvr-float">
      <img src="/icons/email.png" alt="at symbol" />
    </a>
    <a href="https://twitter.com/zmoolla" class="hvr-float">
      <img src="/icons/twitter.png" alt="Twitter logo" />
    </a>
    <a href="https://github.com/moollaza" class="hvr-float">
      <img src="/icons/github.png" alt="GitHub logo" />
    </a>
  </p>
</section>
