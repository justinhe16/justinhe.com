import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'D — Sourdough | Justin He',
  description:
    'A short practice note on sourdough: the yeast-and-bacteria symbiosis in a starter, where the microbes actually come from, and what fermentation does to flour.',
};

export default function PageD() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Sourdough</h1>
      <p className="section-label mt-2">Page D · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          A sourdough starter is flour, water, and a stable ecosystem of two kingdoms that
          happen to want different things. Kept alive, it is the oldest continuously running
          biotechnology most households own.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The symbiosis</h2>
        <p>
          A mature starter is dominated by lactic acid bacteria and wild yeasts, typically at
          roughly a hundred bacteria to every yeast cell. The classic pairing — the yeast
          <em> Kazachstania humilis</em> alongside <em>Fructilactobacillus sanfranciscensis</em> — works
          because the yeast cannot metabolize maltose, the sugar flour releases most abundantly.
          It leaves the maltose to the bacteria, which return simpler sugars it can use. Neither
          organism is being generous; they simply do not compete for the same meal.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Where the microbes come from</h2>
        <p>
          Not from the air, mostly, and not from the terroir of a particular city. The dominant
          source is the flour itself, which arrives already carrying the relevant organisms. The
          Global Sourdough Project, which sequenced hundreds of home starters, found that the
          baker&apos;s hands share microbes with their starter too — though the direction of transfer
          is not obvious. The corollary is deflating: San Francisco sourdough is not a property
          of San Francisco, and a starter shipped across the world tends to drift toward whatever
          its new flour and feeding schedule favor.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What the acid does</h2>
        <p>
          Lactic acid gives the round, yogurt-adjacent depth; acetic acid gives the sharp tang,
          and cooler, stiffer, less frequently fed starters push toward it. Dropping the dough to
          around pH 4 also strengthens the gluten network, slows staling, and suppresses the
          molds and spoilage bacteria that would otherwise take an unrefrigerated loaf — which is
          the reason souring was invented in the first place.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Fermentation as pre-digestion</h2>
        <p>
          The long ferment degrades phytic acid, which otherwise binds iron, zinc, and magnesium
          and carries them straight through you. It partially breaks down gluten proteins and the
          fermentable carbohydrates that trouble some people, and it lowers the glycemic response
          relative to a fast commercial-yeast loaf. None of this makes sourdough safe for celiac
          disease — the gluten is reduced, not eliminated.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The oven</h2>
        <p>
          Almost everything you taste in the crust happens in the last twenty minutes. The
          Maillard reaction between amino acids and reducing sugars produces hundreds of aromatic
          compounds above roughly 150 °C, and caramelization of the remaining sugars adds the
          bitter edge that keeps a dark crust from tasting merely sweet. Steam early keeps the
          surface pliable so the loaf can expand; dry heat late sets the color.
        </p>

        <p>
          The recipe is four ingredients. Everything interesting is scheduling.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/e" className="bubble-link">Next: E</Link>
        <Link href="/c" className="bubble-link">C</Link>
      </nav>
    </main>
  );
}
