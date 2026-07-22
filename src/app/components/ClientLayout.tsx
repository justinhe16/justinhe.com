'use client';

/**
 * v2 "Deep Research" refresh: the layout is now a flat alabaster canvas.
 * The old animated gradient layers + grain texture were removed (preserved in
 * backups/v1-original and at git commit 0cba0dd). See VERSIONS.md.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
