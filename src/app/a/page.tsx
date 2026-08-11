import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'A — Color Theory | Justin He',
  description:
    'A short practice note on color theory: the wheel, the three dimensions of color, harmony schemes, and why perceptual color spaces beat RGB math.',
};

export default function PageA() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Color Theory</h1>
      <p className="section-label mt-2">Page A · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Color theory is the set of rules people have invented for predicting what happens
          when two colors sit next to each other. It is less a science than an accumulated
          body of studio advice, but the useful parts are surprisingly durable.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The wheel</h2>
        <p>
          Newton bent the spectrum into a circle in 1704 so that red could touch violet, and
          almost every color system since has been an argument about that circle. The painter&apos;s
          wheel puts red, yellow, and blue at the corners; the light wheel uses red, green, and
          blue; the printer&apos;s wheel uses cyan, magenta, and yellow. They disagree because they
          model different physics — pigment subtracts light, screens add it.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Three dimensions</h2>
        <p>
          Any color can be described by hue (where it sits on the wheel), saturation (how far
          it is from grey), and lightness (how much light it reflects or emits). Most bad color
          work is a hue problem pretending to be a lightness problem: two colors that clash
          often just have the same lightness, so the eye cannot find an edge between them.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Harmony schemes</h2>
        <p>
          Complementary pairs sit opposite each other and produce maximum contrast — good for a
          single accent, exhausting across a whole page. Analogous schemes take three neighbors
          and read as calm and unified. Triadic schemes take three evenly spaced hues and stay
          lively without tipping into noise. Split-complementary is the safe default: one base
          hue plus the two neighbors of its opposite.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Why RGB math lies</h2>
        <p>
          Averaging two RGB values does not give you the color halfway between them, because RGB
          is not perceptually uniform — a step of 10 in a dark blue looks nothing like a step of
          10 in a bright yellow. Perceptual spaces such as CIELAB, OKLab, and OKLCH re-map the
          numbers so that equal numeric distance means roughly equal visual distance. If you are
          generating palettes programmatically, interpolate there and convert back at the end.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Context beats the swatch</h2>
        <p>
          Josef Albers spent a career demonstrating that a color has no fixed identity: the same
          grey looks warm on a blue field and cold on an orange one, and two different greys can
          be made to look identical. Simultaneous contrast means you should never judge a color
          in isolation — always in the layout it will actually live in, at the size it will
          actually appear.
        </p>

        <p>
          The practical version of all of this: pick one hue, earn every additional one, and let
          lightness do the structural work.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/b" className="bubble-link">
          Next: B
        </Link>
        <Link href="/c" className="bubble-link">
          C
        </Link>
      </nav>
    </main>
  );
}
