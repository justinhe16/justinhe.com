import { ProjectCardData } from '@/types/cards';

/**
 * Article content is markdown rendered with react-markdown + rehype-raw.
 *
 * GOTCHA: a raw HTML block in markdown ENDS AT THE FIRST BLANK LINE (CommonMark).
 * Keep multi-line raw HTML (<figure>, <svg>, <div>) as one contiguous block with
 * no blank lines inside it, or the parser closes the tag early and wraps the
 * remainder in <p> tags — which shreds inline SVG diagrams.
 */
export const projectsData: ProjectCardData[] = [
  {
    id: 'project-claude-surf',
    category: 'project',
    width: '1x',
    height: '1x',
    title: 'Claude Surf',
    caption: 'An opinionated Claude orchestrator',
    date: 'January 2026',
    contentPreview:
      'A small toolkit of composable agents and skills that takes a unit of work from a one-line idea to a merged pull request.',
    imageUrl: '/claude-surf.png',
    content: `

<img src="/claude-surf.png" alt="Claude Surf Logo" style="width: 15vh; display: block; margin: 0 auto;" />

## Overview

**Claude Surf is an opinionated orchestrator for Claude Code**, built around a simple split: babysit the complex work, fire-and-forget the straightforward work.

\`/solo-surf\` handles the first case — it spins up an isolated git worktree and opens a fresh Claude session in a new terminal so you can implement and course-correct alongside it. \`/robot-surf\` handles the second: hand it a Linear ticket and it plans, implements, runs the repo's own lint and test gates, opens a PR, and works the review loop on its own. \`/linear-surf\` sits in front of both, turning a one-line idea into scoped tickets with explicit dependencies, and \`/robot-surf-fan\` sorts those tickets into waves and runs them in parallel.

It's a small tool built for my own workflow — the interesting part isn't the code, it's what falls out of moving from *writing code* to *reviewing merged PRs*.

## Demo

<video src="/claude_surf_demo.mov" controls style="width: 100%; border-radius: 0.5rem; margin: 2rem 0;"></video>

## Get Involved

Check out Claude Surf on [GitHub](https://github.com/justinhe16/claude-surf) to get started, file issues, or contribute to the project.`,
    hasDetailPage: true,
  },
];
