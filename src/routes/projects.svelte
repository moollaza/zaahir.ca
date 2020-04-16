<script>
  const projects = [
    {
      url: "https://reporemover.xyz",
      name: "Repo Remover",
      description: "The fastest way to archive or delete multiple GitHub repos."
    },
    {
      url: "https://quickbudget.xyz",
      name: "QuickBudget",
      description:
        "A free, simple, and completely private budget calculator designed to help you quickly review your monthly expenses."
    },
    {
      url: "https://playuncovr.xyz",
      name: "Uncovr",
      description: "A simple word-based guessing game."
    }
  ];
</script>

<svelte:head>
  <title>Projects | Zaahir Moolla - Personal Website</title>
</svelte:head>

<section class="m-auto max-w-full md:max-w-6xl">
  <h1>Projects</h1>

  <hr class="spacer" />

  <div
    class="w-full mt-12 grid gap-6 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">

    {#each projects as project}
      <div class="flex-1 h-full p-4 md:p-6 rounded-lg border shadow text-left">

        <div class="flex items-center mb-2 md:mb-4">
          <h2
            class="text-xl md:text-2xl font-bold leading-6 text-gray-800 mr-auto">
            {project.name}
          </h2>
          <a
            href={project.url}
            class="flex items-center text-blue-500 hover:text-blue-700 text-smm">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-5 h-5">
              <path
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14
                4h6m0 0v6m0-6L10 14" />
              <span class="pl-1 font-medium">Website</span>
            </svg>
          </a>
        </div>

        <p>{project.description}</p>
      </div>
    {/each}
  </div>
</section>
