import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Y — The Competitive Metagame | Justin He',
  description:
    'A short practice note on competitive Pokémon: hidden stats, damage rolls, speed tiers, and how a community built a whole ruleset the developers never wrote.',
};

export default function PageY() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">The Competitive Metagame</h1>
      <p className="section-label mt-2">Page Y · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Underneath a children&apos;s game about befriending animals is a deterministic combat system
          with hidden variables, and a community that spent twenty-five years datamining it. The
          interesting part is not the depth — it is that most of the competitive ruleset was
          invented by players, not by the developers.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The hidden numbers</h2>
        <p>
          Two creatures of the same species and level are rarely identical. Every one carries
          individual values — a fixed roll from 0 to 31 in each stat, decided at the moment it is
          generated and never changeable. On top of that sit effort values, earned through
          battle, capped at 510 total and 252 in any single stat. Since the third generation each
          also has a nature that raises one stat ten percent and lowers another. None of this was
          displayed anywhere in the early games. It was worked out by players comparing spreadsheets.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Damage is a formula, not a feeling</h2>
        <p>
          Damage output is fully computable: level, attack against defense, base move power,
          same-type attack bonus of 1.5×, the type effectiveness multiplier, and then a final
          random roll spanning 85 to 100 percent. That last band is the entire role of luck in an
          otherwise solved exchange, and it is why competitive players speak in probabilities —
          a move is not &ldquo;strong,&rdquo; it is a 43.8 percent chance to knock out after damage from an
          entry hazard.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Speed is the real resource</h2>
        <p>
          Turn order is decided by Speed, so the metagame organizes itself into tiers around
          specific benchmarks: whatever number outruns the most common threat by exactly one
          point. Everything else is an answer to that. Priority moves jump the queue regardless
          of Speed. Choice Scarf multiplies it at the cost of locking you into one move. Trick
          Room inverts the order entirely for five turns, and exists so that slow, heavy teams
          have a strategy at all.
        </p>

        <h2 className="mt-6 text-[1.35rem]">A ruleset nobody shipped</h2>
        <p>
          The games have no built-in balance rules, so Smogon built them: a tier ladder — Ubers,
          OU, UU, RU, NU — assigned by actual usage statistics, with anything warping the format
          bumped upward. Clauses came from the same place. Sleep Clause and Species Clause and
          the ban on the move Evasion all exist because unrestricted play collapses into
          something unwatchable. It is a fan-maintained competitive constitution, revised every
          generation, with a formal process for arguing about it.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The official version disagrees</h2>
        <p>
          Nintendo&apos;s own circuit, VGC, runs doubles at level 50, best of three, bringing four
          creatures from a team of six. Doubles is a different game — spread moves, redirection,
          partner support — so its top strategies barely overlap with the singles ladder most
          people play. Two communities, one battle engine, almost no shared vocabulary about what
          is good.
        </p>

        <p>
          For a system built to sell trading cards to nine-year-olds, it holds up under
          professional scrutiny remarkably well.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/x" className="bubble-link">Next: X</Link>
        <Link href="/z" className="bubble-link">Z</Link>
      </nav>
    </main>
  );
}
