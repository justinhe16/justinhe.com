import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'I — Roman Concrete | Justin He',
  description:
    'A short practice note on Roman concrete: why harbor walls survived two thousand years of seawater, the self-healing lime clast, and why modern concrete fails faster.',
};

export default function PageI() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Roman Concrete</h1>
      <p className="section-label mt-2">Page I · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          The Pantheon&apos;s dome has stood unreinforced for about nineteen centuries and is still
          the largest of its kind. Roman harbor walls are sitting in the Mediterranean, in the
          surf, intact. A highway overpass poured in the 1970s is a maintenance problem. The
          comparison is unfair in several directions, but the gap is real and the reasons are
          interesting.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The recipe</h2>
        <p>
          <em>Opus caementicium</em> was lime, volcanic ash, water, and chunks of rock. The critical
          ingredient was the ash — pozzolana, named for Pozzuoli near Naples — which reacts with
          lime to form durable calcium-aluminum-silicate binders rather than simply carbonating
          in air. Vitruvius wrote the sourcing instructions down, including the observation that
          the right ash sets underwater, which ordinary lime mortar will not do.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Getting stronger in seawater</h2>
        <p>
          Marine concrete destroys modern structures; seawater attacks the cement paste and
          corrodes the steel inside. Roman marine concrete appears to do the opposite. Analysis
          of drilled cores has found rare crystals — aluminous tobermorite and phillipsite —
          growing inside the material over centuries as seawater percolates through and reacts
          with the volcanic glass, filling voids and interlocking the matrix. The structure was
          not merely resisting the ocean; it was consuming it.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The self-healing lumps</h2>
        <p>
          Roman concrete is speckled with small white inclusions of lime, long dismissed as
          evidence of sloppy mixing. Recent work argues the opposite: they come from &ldquo;hot mixing&rdquo;
          with quicklime rather than slaked lime, and they act as a distributed repair kit. When
          a crack propagates and water reaches a clast, dissolved calcium recrystallizes in the
          gap and seals it. Lab replications have closed cracks in a couple of weeks; control
          samples without the clasts stayed open.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Why we do not just switch</h2>
        <p>
          Portland cement, patented in 1824, is far stronger, sets in days rather than months,
          and is manufacturable anywhere. Roman concrete is weak in tension and would be useless
          for the thin, long-spanning, steel-reinforced shapes modern building depends on. And
          survivorship distorts the comparison: we are admiring the Roman structures that did not
          fall down. What the research actually offers is a set of chemical tricks worth grafting
          onto modern mixes — meaningful when cement production accounts for something like eight
          percent of global carbon emissions and the cheapest way to cut it is to pour less often.
        </p>

        <p>
          Two thousand years is a long service life. It is worth knowing why.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/a" className="bubble-link">Back to A</Link>
        <Link href="/h" className="bubble-link">H</Link>
      </nav>
    </main>
  );
}
