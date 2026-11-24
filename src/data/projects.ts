export type ProjectStatus = "Built" | "In Progress" | "Prototype";

export interface ProjectCaseStudyData {
  slug: string;
  questCode: string;
  title: string;
  tagline: string;
  oneLiner: string;
  role: string;
  status: ProjectStatus;
  year: string;
  technologies: string[];
  repoUrl: string;
  liveUrl?: string;
  visualVariant: "skytxt" | "pixel-world" | "lab-ledger";
  honestNote: string;
  caseStudy: {
    problem: string;
    whyItMatters: string;
    approach: string;
    architecture: {
      summary: string;
      steps: { label: string; detail: string }[];
    };
    technicalDecisions: string[];
    challenges: string[];
    results: string[];
    whatILearned: string[];
  };
}

export const PROJECTS: ProjectCaseStudyData[] = [
  {
    slug: "skytxt",
    questCode: "QUEST 01",
    title: "SKYTXT",
    tagline: "Text-first atmospheric clarity without bloated weather dashboards.",
    oneLiner:
      "A lightweight, text-driven weather and sky-briefing interface designed to stay readable, fast, and useful even on constrained connections.",
    role: "Creator — Architecture, Interface & Implementation",
    status: "Built",
    year: "2025–2026",
    technologies: ["TypeScript", "Python", "REST APIs", "Responsive UI", "Text Formatting"],
    repoUrl: "https://github.com/rajoshreedhar",
    visualVariant: "skytxt",
    honestNote:
      "Built as a focused personal software project — prioritizing clean text parsing, clarity, and low-overhead delivery over decorative widgets.",
    caseStudy: {
      problem:
        "Most modern weather interfaces bury simple, actionable information beneath heavy animations, ad scripts, and crowded radar widgets. Checking whether you need an umbrella or when conditions shift shouldn't require loading megabytes of visual clutter.",
      whyItMatters:
        "People checking forecasts on slow mobile networks, quick terminals, or minimal devices benefit from concise, human-readable summaries that answer practical questions immediately.",
      approach:
        "I designed SKYTXT around a structured text-first briefing model: fetch normalized atmospheric data, distill it into clear scannable signals (current feel, short-horizon shifts, and plain-language advice), and present it in an uncluttered editorial-terminal layout.",
      architecture: {
        summary:
          "A three-stage pipeline keeps external data parsing cleanly decoupled from presentation formatting so the briefing logic stays testable.",
        steps: [
          {
            label: "01 / Query & Normalize",
            detail:
              "Accepts location input, fetches structured weather fields, and normalizes units and missing keys safely.",
          },
          {
            label: "02 / Briefing Synthesizer",
            detail:
              "Applies deterministic rules to summarize temperature trends, precipitation likelihood, and wind conditions into concise text.",
          },
          {
            label: "03 / Minimalist Renderer",
            detail:
              "Outputs a crisp, high-contrast card or plain-text digest with zero heavy media assets and graceful offline/error fallbacks.",
          },
        ],
      },
      technicalDecisions: [
        "Separated data normalization from text generation so formatting rules can be tested independently without live API calls.",
        "Chose semantic, high-contrast typography over animated canvas weather graphics to keep load time and battery use low.",
        "Designed explicit empty and fallback states for ambiguous city queries or temporary upstream API failures.",
      ],
      challenges: [
        "Translating raw hourly arrays into concise human-sounding summaries without losing important edge cases like sudden evening rain.",
        "Balancing brevity with accuracy so the text briefing never feels vague or overly robotic.",
      ],
      results: [
        "Produces an instant, readable sky summary in a compact layout that stays legible on narrow mobile screens.",
        "Demonstrates clean separation between data ingestion, deterministic formatting logic, and UI rendering.",
      ],
      whatILearned: [
        "Good text design is interface design — removing clutter often requires more thought than adding components.",
        "Next iteration: add side-by-side multi-day comparison digests and automated snapshot tests for tricky weather edge cases.",
      ],
    },
  },
  {
    slug: "shree-exe-world",
    questCode: "QUEST 02",
    title: "Shree.exe — Digital World",
    tagline: "Pixel Chic editorial portfolio with a canonical interactive companion.",
    oneLiner:
      "A chapter-based personal web world uniting editorial typography, custom pixel-art character states, and accessible keyboard-first navigation.",
    role: "Design Direction & Full-Stack Frontend Build",
    status: "Built",
    year: "2026",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Pixel Art Pipeline", "Accessibility"],
    repoUrl: "https://github.com/rajoshreedhar",
    visualVariant: "pixel-world",
    honestNote:
      "The site you are exploring right now — built with strict accessibility guardrails, reduced-motion fallbacks, and zero third-party animation bloat.",
    caseStudy: {
      problem:
        "Conventional developer portfolios often feel interchangeable, while heavily gamified sites frequently sacrifice readability, speed, and keyboard accessibility.",
      whyItMatters:
        "A personal site should reflect genuine personality and taste while still allowing recruiters, engineers, and collaborators to evaluate projects in seconds.",
      approach:
        "I paired a strict editorial design system (Porcelain, Ink, Burgundy, Playfair Display + Manrope) with a consistent canonical pixel companion (Shree.exe) who reacts to chapters, answers taps with brief dialogue, and can be minimized without breaking any content.",
      architecture: {
        summary:
          "Static-first Next.js App Router pages backed by typed chapter/project data modules, IntersectionObserver chapter tracking, and CSS-stepped sprite animation.",
        steps: [
          {
            label: "01 / Typed Content Layer",
            detail:
              "All chapters, skills, lab notes, and case studies live in clean TypeScript modules for honest, maintainable updates.",
          },
          {
            label: "02 / Canonical Avatar Engine",
            detail:
              "Extracted the master avatar with flood-fill alpha transparency and layered pose states, chapter reactions, and session-aware hint dismissal.",
          },
          {
            label: "03 / Accessible Shell",
            detail:
              "Focus-trapped full-screen Chapter Index, keyboard shortcuts, semantic landmarks, and full prefers-reduced-motion support.",
          },
        ],
      },
      technicalDecisions: [
        "Used native CSS transitions and stepped keyframes instead of heavy runtime physics libraries to keep bundle size tiny and frame rates steady.",
        "Never gated navigation behind scroll-jacking or intro preloaders — Projects, About, LinkedIn, GitHub, and Contact stay one click away.",
        "Replaced mobile floating overlays with a non-obstructive docked companion pattern so content is never covered on small viewports.",
      ],
      challenges: [
        "Preserving crisp pixel-art edges from a raster source on both light porcelain and dark ink surfaces without halo artifacts.",
        "Ensuring the companion feels delightful and alive while staying completely respectful of users who dismiss hints or prefer reduced motion.",
      ],
      results: [
        "Fast static-friendly production build with full keyboard navigation and dedicated case-study routes.",
        "Cohesive visual identity across 8 distinct chapters with zero reliance on copyrighted imagery.",
      ],
      whatILearned: [
        "Restraint is what makes playful details memorable — a single well-timed pose change beats ten floating gradients.",
        "Designing mobile and keyboard flows early makes the desktop experience cleaner too.",
      ],
    },
  },
  {
    slug: "signal-notebook",
    questCode: "QUEST 03",
    title: "Curiosity & ML Study Ledger",
    tagline: "Structured experiments comparing classical baselines and error patterns.",
    oneLiner:
      "An ongoing technical notebook and evaluation template for documenting datasets, model hypotheses, failure slices, and honest takeaways.",
    role: "Researcher & Developer",
    status: "In Progress",
    year: "2026",
    technologies: ["Python", "Pandas", "Scikit-learn", "PyTorch", "Markdown Specs"],
    repoUrl: "https://github.com/rajoshreedhar",
    visualVariant: "lab-ledger",
    honestNote:
      "Explicitly labeled In Progress — an active learning and experimentation workspace rather than a claimed production ML service.",
    caseStudy: {
      problem:
        "Early machine learning projects often stop at a single headline accuracy score, hiding data leakage, class imbalance, or why specific inputs failed.",
      whyItMatters:
        "Developing disciplined evaluation habits early builds real engineering judgment and makes experiments genuinely reproducible when revisited months later.",
      approach:
        "I created a lightweight experiment ledger format in Python that logs dataset checks, baseline vs. candidate metrics, confusion slices, and written hypotheses before tuning hyperparameters.",
      architecture: {
        summary:
          "Modular notebook + helper script workflow that enforces consistent data splits and structured markdown experiment summaries.",
        steps: [
          {
            label: "01 / Data Sanity Audit",
            detail:
              "Checks missingness, target distribution, duplicates, and potential leakage columns before modeling.",
          },
          {
            label: "02 / Baseline First",
            detail:
              "Trains a fast interpretable Scikit-learn baseline as an honest benchmark to beat.",
          },
          {
            label: "03 / Error Slice Review",
            detail:
              "Inspects the highest-loss examples qualitatively to inform feature engineering or data cleanup.",
          },
        ],
      },
      technicalDecisions: [
        "Standardized fixed random seeds and stratified splits across experiments so comparisons stay fair.",
        "Kept outputs as readable plain-text tables and lightweight plots so findings can be version-controlled cleanly on GitHub.",
      ],
      challenges: [
        "Resisting the urge to jump straight into complex neural models before thoroughly inspecting the underlying features.",
        "Designing a template detailed enough to be rigorous without becoming tedious to maintain.",
      ],
      results: [
        "Provides a repeatable personal framework for coursework and independent AI/ML exploration.",
        "Ongoing work: expanding helper utilities for PyTorch training-loop diagnostics and small NLP datasets.",
      ],
      whatILearned: [
        "Inspecting ten misclassified examples often teaches more than ten rounds of blind hyperparameter tuning.",
        "Documenting what failed is just as valuable as documenting what worked.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudyData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
