import { ProjectCardData } from '@/types/cards';

export const projectsData: ProjectCardData[] = [
  {
    id: 'project-claude-surf',
    category: 'project',
    width: '1x',
    height: '1x',
    title: 'Claude Surf',
    caption: 'An opinionated Claude orchestrator',
    date: 'January 2026',
    contentPreview: 'An opinionated orchestrator for Claude that streamlines AI-assisted development workflows.',
    imageUrl: '/claude-surf.png',
    content: `

<img src="/claude-surf.png" alt="Claude Surf Logo" style="width: 15vh; display: block; margin: 0 auto;" />

## Overview

**Claude Surf is an opinionated orchestrator for Claude Code** that streamlines autonomous software development by integrating Claude's agentic features with Linear MCP and Git Worktrees.

The project provides specialized agents, skills, and commands that enable fully autonomous development workflows - from fetching Linear tickets to creating PRs with built-in code review loops.

## Demo

<video src="/claude_surf_demo.mov" controls style="width: 100%; border-radius: 0.5rem; margin: 2rem 0;"></video>

## Why?

This year, software development has dramatically shifted from writing code to orchestrating tasks efficently and delivering at high quality. In my most recent software development lifecycles, I've realized software development tasks fall into two distinct categories, and Claude Surf handles each differently:

**Foreground Tasks (Solo-Surf)** - Complex, exploratory work that requires human oversight and iteration. These are the tasks where you want to stay in the loop, making decisions and course-correcting as you go. With \`/solo-surf\`, you create an isolated git worktree and work alongside Claude in a dedicated terminal session. You're in the driver's seat, but Claude is there to implement, debug, and iterate with you.

**Background Tasks (Robot-Surf)** - Well-defined, one-shot-able tickets that don't need constant babysitting. Think bug fixes, small feature additions, or refactors with clear requirements. These are perfect for full automation. The \`/robot-surf\` command kicks off an autonomous development loop: it fetches your Linear ticket, assesses complexity, optionally creates an implementation plan, writes the code, creates a PR, waits for CI to pass, runs a code review loop, and reports back when it's ready for human eyes.

The paradigm is simple: babysit the complex stuff with solo-surf, fire-and-forget the straightforward stuff with robot-surf. Claude Surf makes both workflows seamless by leveraging specialized agents that know when to plan, when to implement, when to review, and when to iterate.

## Get Involved

Check out Claude Surf on [GitHub](https://github.com/justinhe16/claude-surf) to get started, file issues, or contribute to the project.`,
    hasDetailPage: true,
  },
  {
    id: 'project-miu-custom-site',
    category: 'project',
    width: '1x',
    height: '1x',
    title: "Miu's Custom Website",
    caption: 'A playful, interactive personal site',
    date: 'December 2024',
    contentPreview: 'A dynamic front-end experience featuring Figma-esque movement, scrapbook interactions, and audio.',
    imageUrl: '/miu-custom-site.png',
    content: `

<img src="/miu-custom-site.png" alt="Miu's Custom Website Screenshot" style="width: 100%; border-radius: 0.5rem; margin: 2rem 0;" />

**Check out the website here, at [miuyoshino.com](https://www.miuyoshino.com)**

## Overview

This project was a fun dynamic front-end challenge for Miu! Miu, a product designer, sent me the Figma files and told me to go wild with the interactive features.
I used anime.js as the primary library to enable a creative canvas feel rather than a traditional portfolio website.

## Key Features

**Figma-esque Movement** - Implemented drag-and-drop functionality allowing elements to be freely positioned and moved around the canvas, giving users full creative control over the layout.

**Scrapbook-like Interactions** - Created an intimate, tactile browsing experience where content feels like physical objects you can interact with, shuffle, and explore organically.

**Audio Integration** - Embedded audio elements that enhance the atmospheric and personal nature of the site, adding another layer of engagement beyond visual interactions.
`,
    hasDetailPage: true,
  },
];
