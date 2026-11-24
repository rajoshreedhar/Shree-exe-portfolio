import React from "react";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS, type ProjectStatus } from "@/data/projects";
import { PROFILE } from "@/data/profile";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

function projectStatusStyle(status: ProjectStatus): string {
  switch (status) {
    case "Built":
      return "bg-ink text-porcelain border-ink";
    case "In Progress":
      return "bg-burgundy text-porcelain border-burgundy";
    case "Prototype":
      return "bg-powder-pink/45 text-ink border-ink/30";
  }
}

export function ProjectsChapter() {
  return (
    <section
      id="the-quests"
      aria-labelledby="projects-heading"
      className="bg-porcelain paper-grain border-b border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel
              chapterNumber="04"
              label="The quests · Selected projects"
            />
            <h2
              id="projects-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] text-ink"
            >
              {PROFILE.microcopy.projects}
            </h2>
          </div>

          <div className="space-y-2 max-w-md">
            <p className="text-sm text-ink/82 leading-relaxed">
              Large editorial case studies with honest statuses, technical
              decisions, and lessons learned. Every repository lives on GitHub.
            </p>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-burgundy hover:underline"
            >
              <Github className="w-4 h-4" />
              Browse repositories at github.com/rajoshreedhar
            </a>
          </div>
        </div>

        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={project.slug}
                className="group bg-porcelain-soft pixel-window-frame overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div
                    className={`lg:col-span-6 p-5 sm:p-6 bg-porcelain border-b lg:border-b-0 ${
                      isEven
                        ? "lg:order-2 lg:border-l border-ink/15"
                        : "lg:border-r border-ink/15"
                    }`}
                  >
                    <div className="h-full transition-transform duration-300 group-hover:scale-[1.012]">
                      <ProjectVisual variant={project.visualVariant} />
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 ${
                      isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-burgundy tabular-nums">
                            {project.questCode}
                          </span>
                          <span className="text-xs text-stone-text font-semibold tabular-nums">
                            {project.year}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 border uppercase tracking-wide ${projectStatusStyle(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-editorial text-3xl sm:text-4xl text-ink">
                          {project.title}
                        </h3>
                        <p className="font-editorial italic text-lg text-burgundy mt-1">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-sm sm:text-[15px] text-ink/85 leading-relaxed max-w-[54ch]">
                        {project.oneLiner}
                      </p>

                      <p className="text-xs sm:text-[13px] text-ink/80 bg-porcelain border border-ink/15 px-3.5 py-2.5 max-w-[56ch]">
                        <strong className="text-ink">Role:</strong>{" "}
                        {project.role} — {project.honestNote}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium bg-porcelain border border-ink/20 text-ink"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 bg-ink text-porcelain hover:bg-burgundy transition-colors"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          View Case Study
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs font-semibold text-ink border border-ink/25 hover:border-burgundy hover:text-burgundy transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
