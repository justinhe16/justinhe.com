import Link from 'next/link';
import { Github, Linkedin, FileText } from 'lucide-react';
import { projectsData } from '@/data/projectsData';

/**
 * v2 "Deep Research" homepage.
 * Extremely plain, straight to the point. Three colors only:
 *   alabaster #EAE3DD (bg) · carbon #222222 (text) · wisteria #758ECD (hover)
 */

const muted = 'color-mix(in srgb, var(--carbon) 58%, transparent)';

// Set to an image path when a portrait is ready; null hides the portrait entirely.
const portraitSrc: string | null = null;

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinhe16/', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/justinhe16', Icon: Github },
  { label: 'Resume', href: '/justin_he_resume_2026.pdf', Icon: FileText },
];

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-8 py-16 lg:px-10">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[170px_1fr] lg:gap-20">
          {/* ── Left column: portrait (optional) + name ── */}
          <aside className="flex flex-col items-start">
            {portraitSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portraitSrc}
                alt="Justin He"
                className="mb-5 aspect-[3/4] w-[150px] rounded-[2px] object-cover"
              />
            )}
            <h1 className="text-[1.35rem] font-normal leading-tight">Justin He</h1>
            <p className="section-label mt-1">Engineer</p>
          </aside>

          {/* ── Right column: sections ── */}
          <div className="flex flex-col gap-16 pt-1">
            {/* Projects */}
            <section>
              <h2 className="section-label mb-6">Projects</h2>
              <ul className="flex flex-col gap-7">
                {projectsData.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="wisteria-link group block"
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <div>
                          <span className="text-[1.3rem] leading-snug">{project.title}</span>
                          <span
                            className="mt-1 block font-sans text-[0.9rem]"
                            style={{ color: muted }}
                          >
                            {project.caption}
                          </span>
                        </div>
                        {project.date && (
                          <span
                            className="shrink-0 whitespace-nowrap font-sans text-[0.82rem]"
                            style={{ color: muted }}
                          >
                            {project.date}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Links */}
            <section>
              <div className="flex flex-wrap gap-3">
                {links.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bubble-link"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                    {label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
