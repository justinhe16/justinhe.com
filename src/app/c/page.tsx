import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'C — The Shipping Container | Justin He',
  description:
    'A short practice note on the shipping container: how a standardized steel box rearranged world trade, killed the working waterfront, and made globalization cheap.',
};

export default function PageC() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">The Shipping Container</h1>
      <p className="section-label mt-2">Page C · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          The most consequential object of the twentieth century is a corrugated steel box with
          no moving parts. It is worth studying precisely because it is boring: the container
          shows how much of the world can be rearranged by fixing an interface.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Before the box</h2>
        <p>
          Break-bulk shipping meant every barrel, sack, and crate was handled individually by
          longshoremen, stacked by hand in an irregular hold, and handled again at the far end.
          A ship could spend more time in port than at sea, and loading costs could approach
          half the total cost of moving the cargo. Ports were labor-intensive cities in
          themselves, with hiring halls, powerful unions, and routine pilferage.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Malcom McLean</h2>
        <p>
          McLean ran a trucking company, not a shipping line, which is why he saw the problem as
          one of transfers rather than of ships. In April 1956 he sailed the <em>Ideal X</em>, a
          converted tanker, from Newark to Houston carrying fifty-eight truck bodies on deck.
          The insight was not the box — boxes existed — but the commitment to never unpacking it
          between truck, crane, and ship.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Standardization was the hard part</h2>
        <p>
          A container is only useful if every crane, chassis, and ship in the world can accept
          it. It took roughly a decade of ISO negotiation through the 1960s to settle on common
          lengths, corner castings, and the twist-lock that secures them — a fight in which each
          carrier lobbied for the dimensions it had already bought. The engineering was
          straightforward; the coordination was not. McLean released the patents royalty-free,
          which is a large part of why the standard actually took.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What it destroyed</h2>
        <p>
          Container ports need cranes and acres of flat land, not dockworkers and warehouses, so
          traffic migrated away from the old inner-city waterfronts — Manhattan to Newark, the
          London docks to Felixstowe. Dock labor collapsed by most of its former size in a
          generation. Marc Levinson&apos;s <em>The Box</em> is the standard account of both the gains and
          the wreckage.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What it enabled</h2>
        <p>
          Once freight cost approached a rounding error, geography stopped constraining where
          things were made. Supply chains stretched across oceans, just-in-time manufacturing
          became viable, and a factory in one country could feed an assembly line in another.
          The container did not cause globalization on its own, but it removed the friction that
          had made it uneconomical.
        </p>

        <p>
          The transferable lesson: the value was never in the box. It was in everyone agreeing to
          the same box.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/d" className="bubble-link">
          Next: D
        </Link>
        <Link href="/b" className="bubble-link">
          B
        </Link>
      </nav>
    </main>
  );
}
