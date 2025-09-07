<script lang="ts">
  import { ExternalLink, Github } from "lucide-svelte";
  import { onMount } from "svelte";
  import SEO from "$lib/components/SEO.svelte";
  import type { ImageSource } from "$lib/types";
  import repoRemoverImg from "$lib/assets/images/projects/repo-remover.png?enhanced";
  import quickBudgetImg from "$lib/assets/images/projects/quick-budget.png?enhanced";
  import howManyRakatsImg from "$lib/assets/images/projects/how-many-rakats.png?enhanced";
  import uncovrImg from "$lib/assets/images/projects/uncovr.png?enhanced";

  function countProjectClick(projectTitle: string, linkType: "demo" | "github") {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent(`project_${linkType}_${projectTitle.toLowerCase().replace(/\s+/g, "_")}`);
    }
  }

  interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
    github?: string;
    tech: string;
    image: ImageSource;
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Repo Remover",
      description: "Quickly clean up your GitHub by archiving or deleting multiple repositories instantly.",
      url: "https://reporemover.xyz",
      github: "https://github.com/moollaza/repo-remover",
      tech: "Vue.js, Buefy, GitHub API",
      image: repoRemoverImg,
    },
    {
      id: 2,
      title: "Quick Budget",
      description: "Quick and easy budgeting tool that helps keep your spending in check.",
      url: "https://quickbudget.xyz",
      tech: "Svelte, Sapper, Tailwind, Immer",
      image: quickBudgetImg,
    },
    {
      id: 3,
      title: "How Many Rakats",
      description: "A simple reference guide for the five daily prayers in Islam.",
      url: "https://howmanyrakats.com",
      tech: "SvelteKit, Tailwind",
      image: howManyRakatsImg,
    },
    {
      id: 4,
      title: "Personal Website",
      description: "The website you are on right now, my little corner of the internet.",
      url: "https://zaahir.ca",
      github: "https://github.com/moollaza/zaahir.ca",
      tech: "SvelteKit, Tailwind",
      image: uncovrImg, // Temporary using uncovr image until we have personal website screenshot
    },
    {
      id: 5,
      title: "Uncovr",
      description: "A simple game. Can you guess the hidden word?",
      url: "https://playuncovr.xyz/",
      tech: "Svelte, Sapper, Tailwind",
      image: uncovrImg,
    },
  ];

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<SEO
  title="Projects - Zaahir Moolla"
  description="Things I've built! Privacy tools, web apps, and fun side projects. Check out the code and try the demos."
  url="https://zaahir.ca/projects"
/>

<div class="px-6 py-20">
  <div class="mx-auto max-w-6xl">
    <div class="transition-all duration-600 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
      <h2 class="group mb-16 cursor-default text-center text-4xl font-bold md:text-5xl">
        <span class="transition-colors duration-500 ease-out group-hover:text-accent"> Projects </span>
      </h2>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {#each projects as project, index (project.id)}
          <div
            class="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style="transition-delay: {index * 100}ms;"
            class:opacity-100={mounted}
            class:translate-y-0={mounted}
            class:opacity-0={!mounted}
            class:translate-y-8={!mounted}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onclick={() => countProjectClick(project.title, "demo")}
              aria-label="View {project.title} project"
            >
              <enhanced:img src={project.image} alt={project.title} class="h-64 w-full object-cover object-top" />
            </a>
            <div class="p-6">
              <div class="mb-3 flex items-start justify-between">
                <h3 class="text-xl font-bold">{project.title}</h3>
                <div class="flex gap-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onclick={() => countProjectClick(project.title, "demo")}
                    aria-label="View {project.title} demo"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
                  >
                    <ExternalLink class="h-3 w-3" />
                  </a>
                  {#if project.github}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onclick={() => countProjectClick(project.title, "github")}
                      aria-label="View {project.title} source code on GitHub"
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
                    >
                      <Github class="h-3 w-3" />
                    </a>
                  {/if}
                </div>
              </div>
              <p class="mb-4 leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div class="text-sm font-medium text-muted-foreground">
                {project.tech}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
