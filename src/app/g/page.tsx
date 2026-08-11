import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'G — Map Projections | Justin He',
  description:
    'A short practice note on map projections: why every flat map lies, what Mercator was actually for, and why the whole internet renders on a projection nobody chose deliberately.',
};

export default function PageG() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Map Projections</h1>
      <p className="section-label mt-2">Page G · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Every flat map of the Earth is wrong, and this is a theorem rather than an
          accusation. Gauss&apos;s <em>Theorema Egregium</em> shows that a sphere and a plane have
          different intrinsic curvature, so no mapping between them can preserve all distances.
          Something must be sacrificed. Choosing a projection is choosing what.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What can be preserved</h2>
        <p>
          A conformal projection preserves local angles and therefore shapes at small scale, at
          the cost of area. An equal-area projection preserves area at the cost of shape. An
          equidistant projection preserves distance, but only along particular lines from
          particular points. You may have one of these properties, never all — and compromise
          projections deliberately take a little error in each rather than a lot in one.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What Mercator was for</h2>
        <p>
          Gerardus Mercator published his projection in 1569 to solve one specific problem: a
          line of constant compass bearing should be a straight line on the chart. That property
          made transoceanic navigation tractable and is the entire reason the projection won. The
          famous distortion — Greenland rendered the size of Africa when it is about a fourteenth
          of it — is not a bug so much as the unavoidable price of that one useful feature.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The politics</h2>
        <p>
          The Gall–Peters projection was promoted in the 1970s and 80s as a corrective, on the
          argument that inflating high-latitude landmasses inflated the countries that drew the
          maps. It is genuinely equal-area, and it also stretches everything near the equator
          into vertical smears — trading one visible distortion for another. Cartographers mostly
          responded by pointing at compromise projections instead: Robinson, which National
          Geographic used from 1988, and then Winkel tripel, which it adopted in 1998 and which
          remains the standard answer for a general-purpose world map.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The one you actually use</h2>
        <p>
          Nearly every online slippy map renders in Web Mercator. It was chosen because it is
          conformal — so north is always up and shapes stay right while you zoom — and because
          treating the Earth as a perfect sphere makes the math cheap enough to compute per tile.
          It is not quite a legitimate projection: it applies spherical formulas to ellipsoidal
          coordinates, which is why surveyors were unhappy about it and why it was informally
          registered before eventually being standardized. It also cuts off above about 85° so
          the world fits a square tile grid, which is the real reason the Arctic looks the way it
          does on your phone.
        </p>

        <p>
          There is no neutral map. There is only a map that is honest about its trade.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/h" className="bubble-link">Next: H</Link>
        <Link href="/f" className="bubble-link">F</Link>
      </nav>
    </main>
  );
}
