import Link from 'next/link';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { projectsData } from '@/data/projectsData';

/**
 * v2 "Deep Research" article page — plain, flat alabaster canvas, wisteria links.
 * Server-rendered and prerendered static. Supports optional collapsible chapters.
 */

const muted = 'color-mix(in srgb, var(--carbon) 58%, transparent)';

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

const markdownComponents: Components = {
  img: ({ ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} className="my-8 rounded-[3px]" alt={props.alt || ''} />
  ),
  video: ({ ...props }) => (
    <video {...props} className="my-8 w-full rounded-[3px]" controls />
  ),
  p: ({ ...props }) => (
    <p
      {...props}
      className="mb-5 font-sans text-[1.05rem]"
      style={{ lineHeight: 'var(--line-height-content)' }}
    />
  ),
  h2: ({ ...props }) => <h2 {...props} className="mt-12 mb-4 text-2xl font-normal" />,
  h3: ({ ...props }) => <h3 {...props} className="mt-8 mb-3 text-xl font-normal" />,
  ul: ({ ...props }) => <ul {...props} className="mb-5 list-disc pl-5 font-sans" />,
  ol: ({ ...props }) => <ol {...props} className="mb-5 list-decimal pl-5 font-sans" />,
  li: ({ ...props }) => (
    <li
      {...props}
      className="mb-2 font-sans text-[1.05rem]"
      style={{ lineHeight: 'var(--line-height-content)' }}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 pl-4 font-sans italic"
      style={{ borderColor: muted, color: muted }}
    />
  ),
  strong: ({ ...props }) => <strong {...props} className="font-sans font-semibold" />,
};

function Prose({ children }: { children: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/" className="wisteria-link font-sans text-sm">
      ← Justin He
    </Link>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((proj) => proj.id === id);

  if (!project) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-2xl px-8 pt-[12vh]">
          <BackLink />
          <h1 className="mt-10 text-3xl font-normal">Article not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-2xl px-8 pt-[10vh] pb-28">
        <BackLink />

        <header className="mt-12">
          <p className="section-label">Projects</p>
          <h1 className="mt-3 text-3xl font-normal leading-tight lg:text-4xl">
            {project.title}
          </h1>
          {project.date && (
            <p className="mt-3 font-sans text-sm" style={{ color: muted }}>
              {project.date}
            </p>
          )}
        </header>

        {project.content && (
          <div className="mt-10">
            <Prose>{project.content}</Prose>
          </div>
        )}

        {project.chapters && project.chapters.length > 0 && (
          <div className="mt-12">
            {project.chapters.map((chapter, i) => (
              <details key={i} className="chapter">
                <summary className="wisteria-link flex cursor-pointer items-baseline gap-3 py-6">
                  <span className="chapter-chevron text-[1.05rem]" style={{ color: muted }}>
                    ›
                  </span>
                  <span className="flex-1">
                    <span className="block text-[1.4rem] leading-snug">{chapter.title}</span>
                    {chapter.summary && (
                      <span
                        className="mt-1 block font-sans text-[0.9rem]"
                        style={{ color: muted }}
                      >
                        {chapter.summary}
                      </span>
                    )}
                  </span>
                </summary>
                <div className="pb-8 pl-6">
                  <Prose>{chapter.content}</Prose>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
