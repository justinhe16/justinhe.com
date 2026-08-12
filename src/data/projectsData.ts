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
    id: 'project-fantasy-idl',
    category: 'project',
    width: '1x',
    height: '1x',
    title: 'Fantasy IDL',
    caption: 'A live prediction game for a dance-crew competition',
    date: 'February 2026',
    contentPreview:
      'A two-phase prediction game for a live dance-crew competition, built on FastAPI, Next.js, and Supabase — where the hard part was keeping scores honest under live data entry.',
    imageUrl: '/fantasy-idl.png',
    content: `

<img src="/fantasy-idl.png" alt="Fantasy IDL — Predict the IDL, climb the board" style="width: 100%; border-radius: 0.5rem; margin: 2rem 0;" />

## Overview

**Fantasy IDL is a prediction game for a live dance-crew competition.** Six real crews — Brotherhood (Vancouver), Royal Family (Auckland), Jam Republic (Singapore), GRV (LA), 1MILLION (Seoul), and Quick Style (Oslo) — go head to head, and fans call the results before they happen.

Each event runs in two stages. In the first, crews battle 1v1 in front of a seven-judge panel, and you predict the vote split — a 5–2 that lands 6–1 still costs you. In the second, the survivors compete for the top three places with point scores, and you call who makes it and where they land.

You earn points two ways: for getting the winner or rank right, and for how close your margin was. Those scores feed per-event and all-time leaderboards, and you can start a private league to compare with friends. During an event, an admin enters judge results live from a control room while everyone watching sees the board move over SSE.

## Architecture

Browser (Next.js) → a Next.js BFF on Vercel → FastAPI on Fly.io → Supabase Postgres.

The browser never calls the API directly. The Next.js layer reads the Supabase session from HTTP-only cookies on the server, attaches the JWT, and forwards the request — so the backend URL stays private and no token ever reaches client JavaScript. FastAPI checks those tokens against Supabase's JWKS, and a user's role lives in the app database rather than in the auth provider.

Most of what follows wasn't algorithmic. It was keeping a live-scored game honest and consistent while an admin types in results in real time.

## One scoring path, reused everywhere

Scores show up in four places: the stored leaderboard cache, the live in-progress board, a player's own results page, and the "top scorer" badge on the events list. The moment one of those computes a score differently, someone sees two numbers for the same pick. So they all run through a single set of helpers, a test pins them together, and the internal score records carry their own matchup and team ids — nothing depends on two queries coming back in the same order.

## You can't predict the past

Picks stay editable until lock, and results go in as battles finish, which leaves an obvious hole: predicting something that already happened. Every scoring path drops any prediction created after the result it's being measured against. That check sits in three different code paths, each with a comment reminding you to keep the other two in step.

## Only one event runs at a time

The live experience assumes a single active event, so three things guard it. The app takes a row lock (SELECT … FOR UPDATE) before flipping status, a small state machine only allows upcoming → in-progress → completed, and a partial unique index in Postgres makes a second in-progress row impossible at the database level. When that index rejects a write, the error is caught and returned as a plain 400 instead of a stack trace.

## Ranking with ties

Leaderboards get subtle once ties meet pagination. Ranks are worked out over the whole sorted field and then sliced in Python — not with SQL OFFSET/LIMIT — so a tie doesn't move depending on which page you're on, and they follow standard competition ranking (1, 1, 1, 4…). Reads are tiered: upcoming events skip scoring entirely, live events read the cache, and the fallback batch-loads in a few queries instead of one per user.

## Finals that follow your picks

Which crews are eligible for finals depends on who you picked to win their matchups. Change a matchup and the old winner's finals row would hang around as a phantom fourth finalist — so after each bulk save the server recomputes the winners and deletes finals rows for crews you no longer have advancing. Rank is recalculated from the points you entered; the client's version is never trusted.

## The live board

Updates ride on Server-Sent Events. One manager maps each event to its set of subscriber queues, and those queues are capped and drop frames for slow clients so a single stalled tab can't run memory away. The BFF relays the upstream stream through a ReadableStream with a hard 30-minute cutoff to avoid leaking connections, and the browser reconnects with backoff.

None of this is hard on its own. Put it under a live event with people watching and "simple" turns into making every number agree, closing the door on hindsight picks, and holding the one-event rule through a race.
`,
    hasDetailPage: true,
  },
  {
    id: 'project-claude-surf',
    category: 'project',
    width: '1x',
    height: '1x',
    title: 'Claude Surf',
    caption: 'An opinionated Claude orchestrator',
    date: 'January 2026',
    contentPreview:
      'An opinionated orchestrator for Claude that streamlines AI-assisted development — now with deep planning, Linear MCP, and wave-based parallel fan-out.',
    imageUrl: '/claude-surf.png',
    content: `

<img src="/claude-surf.png" alt="Claude Surf Logo" style="width: 15vh; display: block; margin: 0 auto;" />

## Overview

**Claude Surf is an opinionated orchestrator for Claude Code** that streamlines autonomous software development by integrating Claude's agentic features with Linear MCP and Git Worktrees.

What started as two commands has grown into a full toolkit: a dozen composable agents and skills that take a unit of work from a one-line idea all the way to a merged pull request — and, at its most ambitious, drive an entire Linear epic to completion in dependency order, unattended.

<div style="display:flex; flex-wrap:wrap; gap:2.5rem 3.5rem; margin:2.75rem 0; padding:1.9rem 0; border-top:1px solid rgba(34,34,34,0.15); border-bottom:1px solid rgba(34,34,34,0.15);">
  <div>
    <div style="font-family:var(--font-fraunces),serif; font-size:2.1rem; line-height:1; color:#758ECD;">12</div>
    <div style="font-family:var(--font-schibsted-grotesk),sans-serif; font-size:0.76rem; text-transform:uppercase; letter-spacing:0.09em; color:rgba(34,34,34,0.55); margin-top:0.45rem;">composable agents &amp; skills</div>
  </div>
  <div>
    <div style="font-family:var(--font-fraunces),serif; font-size:2.1rem; line-height:1; color:#758ECD;">~14</div>
    <div style="font-family:var(--font-schibsted-grotesk),sans-serif; font-size:0.76rem; text-transform:uppercase; letter-spacing:0.09em; color:rgba(34,34,34,0.55); margin-top:0.45rem;">autonomous steps per ticket</div>
  </div>
  <div>
    <div style="font-family:var(--font-fraunces),serif; font-size:2.1rem; line-height:1; color:#758ECD;">3&times;</div>
    <div style="font-family:var(--font-schibsted-grotesk),sans-serif; font-size:0.76rem; text-transform:uppercase; letter-spacing:0.09em; color:rgba(34,34,34,0.55); margin-top:0.45rem;">tickets in parallel per wave</div>
  </div>
  <div>
    <div style="font-family:var(--font-fraunces),serif; font-size:2.1rem; line-height:1; color:#758ECD;">hrs&nbsp;&rarr;&nbsp;min</div>
    <div style="font-family:var(--font-schibsted-grotesk),sans-serif; font-size:0.76rem; text-transform:uppercase; letter-spacing:0.09em; color:rgba(34,34,34,0.55); margin-top:0.45rem;">hands-on time per ticket</div>
  </div>
</div>

## Demo

<video src="/claude_surf_demo.mov" controls style="width: 100%; border-radius: 0.5rem; margin: 2rem 0;"></video>

## Two modes for two kinds of work

Software development this year shifted from writing code to orchestrating tasks well. In practice, work falls into two buckets, and Claude Surf handles each differently:

**Foreground — /solo-surf.** Complex, exploratory work where you want to stay in the loop. It spins up an isolated git worktree and opens a fresh Claude session in a new terminal so you can implement, debug, and course-correct alongside it. You're in the driver's seat.

**Background — /robot-surf.** Well-defined, one-shot-able tickets that don't need babysitting. Fire it and walk away.

The paradigm is simple: **babysit the complex stuff, fire-and-forget the straightforward stuff.**

## What's new

### A much deeper autonomous loop

**/robot-surf** is now a roughly fourteen-stage pipeline. It fetches the Linear ticket, spins up a worktree, and routes through a **complexity gate** — a staff-engineer-planner agent that returns SIMPLE or COMPLEX and decides whether a full planning pass is even warranted. Planning is pattern-aware: the agents read the repo's own conventions and mirror an analogous existing feature rather than inventing one. Before committing, the engineer runs the project's own lint, typecheck, and test suite as **local quality gates**. Then it opens a PR, watches CI, and runs an **automated code-review loop** (up to three iterations) between a reviewer and an implementer agent. After approval it keeps watching the live PR for up to two hours (or ten rounds), auto-addressing human review comments as they land — genuine fire-and-forget past PR creation.

### Deep planning — /linear-surf

The front half of the workflow. It turns a one-line description into fully-scoped, **agent-ready Linear tickets** through a structured interview. It silently explores the codebase first so tickets reference real file paths and patterns, then writes one ticket per area (**[Web] / [Backend] / [iOS] / [Admin]**) with acceptance criteria, edge cases, and — crucially — an explicit **Blocked-by / Blocks** dependency section that becomes the input to the next tool.

### Linear MCP

Everything is wired through the official Linear MCP server (remote SSE). It powers ticket creation, fetching tickets with their relations, and enumerating an epic's children. The config is copied into each worktree so MCP keeps working inside isolated checkouts, with a graceful fallback chain from MCP to the Linear CLI to the raw GraphQL API.

### Orchestrating at scale — /robot-surf-fan

The headline addition. Point it at an epic and it **topologically sorts the child tickets into waves** over their blocked-by / blocks edges, then fans **/robot-surf** out — one fresh-context agent per ticket, up to three in parallel per wave. Since each ticket agent spawns its own planner, engineer, and reviewer, that's roughly nine to twelve agents working at once. A ticket only becomes "satisfied" when its PR is **merged**, so every wave is planned against a main branch that already contains the previous wave's code. It **verifies CI and mergeability itself before merging** (verify, don't trust), resolves intra-wave merge conflicts by resuming the relevant agent, and respects "do not run alongside" constraints between tickets.

### The rest of the toolkit

**/prep-surf**, **/check-surf**, and **/global-surf** handle install, prerequisite audits, and global setup; **/robot-surf-prompt** runs the full autonomous loop from a freeform prompt with no Linear dependency at all.

## Four specialized agents

Under the hood, four agents do the labor: an **orchestrator** that coordinates scope → implement → review, a **staff-engineer-planner** that acts as the complexity gate, a **software-engineer** that implements and grinds the CI red-green loop, and a **code-reviewer** that posts an actual GitHub PR review with an approve / request-changes verdict. They share no memory, so context is passed between them explicitly.

## The paradigm shift

The through-line is **plan → build → orchestrate at scale**: draft an epic with /linear-surf, build a single ticket with /robot-surf, or drive the whole dependency graph to merged PRs with /robot-surf-fan. The human moves from *writing code* to *reviewing merged PRs* — the machine implements, the human approves. Simple work is fire-and-forget; complex work you babysit in a dedicated worktree. That's the shift Claude Surf is built around.

## Get Involved

Check out Claude Surf on [GitHub](https://github.com/justinhe16/claude-surf) to get started, file issues, or contribute to the project.`,
    hasDetailPage: true,
  },
];
