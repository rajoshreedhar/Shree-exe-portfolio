import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/profile";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found — Rajoshree Dhar" };
  return {
    title: `${project.title} — Case Study | Rajoshree Dhar`,
    description: project.oneLiner,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/15 bg-porcelain/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/portfolio#the-quests"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink hover:text-burgundy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shree.exe
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rajoshree Dhar on GitHub"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/85 hover:text-burgundy"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rajoshree Dhar on LinkedIn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/85 hover:text-burgundy"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20"
      >
        <div className="space-y-6 pb-10 border-b border-ink/15">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-pixel text-[11px] px-2.5 py-1 bg-ink text-porcelain tabular-nums">
              {project.questCode}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-burgundy text-porcelain">
              {project.status}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-text tabular-nums">
              {project.year}
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl leading-[1.03] text-ink">
            {project.title}
          </h1>
          <p className="font-editorial italic text-xl sm:text-2xl text-burgundy max-w-2xl">
            {project.tagline}
          </p>
          <p className="text-base sm:text-lg text-ink/85 leading-relaxed max-w-[60ch]">
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-porcelain-soft border border-ink/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 bg-ink text-porcelain text-xs font-semibold hover:bg-burgundy transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="my-10">
          <ProjectVisual variant={project.visualVariant} />
          <p className="mt-3 text-xs text-stone-text flex items-center gap-2">
            <PixelStarIcon size={13} />
            {project.honestNote}
          </p>
        </div>

        <div className="space-y-12 max-w-[65ch]">
          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              The problem: what I was trying to solve
            </h2>
            <p className="text-base leading-relaxed text-ink/85">
              {caseStudy.problem}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              Why it matters: who benefits and why
            </h2>
            <p className="text-base leading-relaxed text-ink/85">
              {caseStudy.whyItMatters}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              Approach: what I decided to build
            </h2>
            <p className="text-base leading-relaxed text-ink/85">
              {caseStudy.approach}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-3xl text-ink">
              Architecture: how the pieces fit together
            </h2>
            <p className="text-base leading-relaxed text-ink/85">
              {caseStudy.architecture.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {caseStudy.architecture.steps.map((step) => (
                <div
                  key={step.label}
                  className="p-4 bg-porcelain-soft pixel-window-frame space-y-2"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-burgundy block">
                    {step.label}
                  </span>
                  <p className="text-xs sm:text-sm text-ink/85 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              Technical decisions &amp; trade-offs
            </h2>
            <ul className="space-y-2.5 list-disc pl-5 text-base text-ink/85 leading-relaxed">
              {caseStudy.technicalDecisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              Challenges &amp; revisions
            </h2>
            <ul className="space-y-2.5 list-disc pl-5 text-base text-ink/85 leading-relaxed">
              {caseStudy.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              Demonstrable results
            </h2>
            <ul className="space-y-2.5 list-disc pl-5 text-base text-ink/85 leading-relaxed">
              {caseStudy.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-3xl text-ink">
              What I learned &amp; next steps
            </h2>
            <ul className="space-y-2.5 list-disc pl-5 text-base text-ink/85 leading-relaxed">
              {caseStudy.whatILearned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/portfolio#the-quests"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-3 bg-ink text-porcelain text-xs font-semibold uppercase tracking-wider hover:bg-burgundy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Quests
          </Link>
          <Link
            href="/portfolio#the-next-level"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-3 border border-ink bg-porcelain-soft text-ink text-xs font-semibold uppercase tracking-wider hover:bg-powder-pink/40 transition-colors"
          >
            Contact Rajoshree →
          </Link>
        </div>
      </main>
    </div>
  );
}
