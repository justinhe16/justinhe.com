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
    id: 'project-market-microstructure',
    category: 'project',
    width: '1x',
    height: '1x',
    title: 'Modeling Market Microstructure',
    caption: 'Deep-learning price prediction and statistical risk modeling on futures order books',
    date: '2025 – 2026',
    contentPreview:
      'Two runs at modeling futures markets — recreating a deep-learning order-book model, then pivoting to statistical risk and payoff modeling once forecasting proved a dead end.',
    imageUrl: '',
    content: `
Two goes at modeling futures markets, about a year apart.

The first tried to predict where price was going, using a deep learning model that reads the raw order book. That didn't pan out. The second dropped prediction entirely and modeled risk and payoff instead — what the range of outcomes looks like, and whether the game is worth playing at all.

Short version: I don't think you can forecast the next tick from a retail desk. Chapter two is what I did about it.
`,
    chapters: [
      {
        title: 'Recreating DeepLOB on Nasdaq futures',
        summary:
          'Taking a deep learning order-book model, pointing it at retail futures data, and finding out what the numbers were actually worth.',
        content: `
There's a well-known paper called **DeepLOB** — *Deep Convolutional Neural Networks for Limit Order Books* (Zhang, Zohren & Roberts, 2019, [arXiv:1808.03668](https://arxiv.org/abs/1808.03668)). It puts a CNN-LSTM on top of a raw limit order book, classifies which way price moves next, and reports about 78% accuracy on an academic equities dataset.

Reproducing that number wasn't the point. I had a more selfish question: **does any of this work for a retail trader?** Take the same architecture, feed it an order book I scraped myself off a retail futures feed, ask it for an up / flat / down call I could put a bracket order on, and see whether the answer still means anything after you pay a spread and a commission.

So I changed almost everything around the model.

## What I changed

<div class="cmp-wrap"><table class="cmp-table">
<thead><tr><th></th><th>DEEPLOB — THE PAPER</th><th class="mine">THIS ATTEMPT</th></tr></thead>
<tbody>
<tr><td>Market</td><td>LSE equities</td><td>NQ E-mini Nasdaq-100 futures</td></tr>
<tr><td>Data</td><td>FI-2010, a curated academic benchmark, ~1 year</td><td>Self-captured retail L2 book, 26 days</td></tr>
<tr><td>Book quality</td><td>Benchmark-grade depth</td><td>Conflated snapshots — no order-by-order detail</td></tr>
<tr><td>Target</td><td>Smoothed mid-price direction</td><td>Raw mid-price change vs a threshold</td></tr>
<tr><td>Horizon</td><td>k events ahead</td><td>Event counts, then wall-clock 60 seconds</td></tr>
<tr><td>Bar for success</td><td>Classification accuracy</td><td>Must clear spread + commission + latency</td></tr>
</tbody>
</table></div>

Two of those rows do most of the damage.

The paper predicts a **smoothed** mid-price: it averages the next k ticks and compares that against the previous k. Smoothing makes the target well-behaved and heavily autocorrelated, which makes it much easier to hit. I used the **raw** mid-price change against a threshold, because you can't trade a smoothed mid. You get filled at the raw price. That swap makes the problem harder and drags the headline accuracy down, and it's most of why my numbers look worse than the paper's.

The other row is where the finish line sits. The paper stops at classification accuracy. Mine had to clear about three ticks of spread plus commission before it meant anything, which is a far less forgiving bar.

## Getting the data

Nobody publishes an FI-2010 for NQ futures, so I had to go get the data myself. A collector on Fly.io held a WebSocket open to Tradovate through US market hours, pulled Level-2 DOM, batched the writes, flushed every 500 records or five seconds, and backed off whenever the feed rate-limited me (which it did, a lot). Everything landed in a TimescaleDB hypertable. Final haul: about **6.45M book snapshots over 26 trading days**, late January to mid-February 2026, around 28 snapshots a second.

Two things about that data I shrugged off at the time and shouldn't have. The feed sends **conflated** snapshots, meaning aggregated size per level on a refresh cadence, so you never see individual orders or where you sit in the queue. And 26 patchy days is nothing next to the year the paper trained on.

## The model

You hand the network the book as a picture: **100 timesteps × 40 features**, where the 40 is 10 price levels times (ask price, ask size, bid price, bid size). Convolutions crawl over it. The first block uses a (1×2) stride-2 kernel to squash each price against its own volume, then (4×1) kernels run along the time axis. Two more blocks narrow things down to a single column of 32 channels. An **Inception module** fans out into three parallel convolutions (1×1, 3×1, and 5×1 with a pooling path) and glues them back together into 192 channels, which lets it look at a few time scales at once. That feeds an **LSTM** (192 → 64), and the last timestep goes through a small fully-connected head into three logits: down, flat, up. PyTorch, Adam, class-weighted cross-entropy so it doesn't just ignore the rare classes.

<figure style="margin: 2.5rem 0;">
<svg class="diagram" viewBox="0 0 620 660" role="img" aria-label="DeepLOB model architecture, from order-book snapshot to three-class output">
  <text class="d-stage" x="104" y="50" text-anchor="end">INPUT</text>
  <rect class="d-box" x="120" y="24" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="42" text-anchor="middle">Order-book snapshot</text>
  <text class="d-sub" x="360" y="57" text-anchor="middle">100 timesteps × 40 features — 10 levels × price &amp; size, both sides</text>
  <path class="d-line" d="M360 68 V91" />
  <polygon class="d-arrow" points="356.5,91 363.5,91 360,96" />
  <text class="d-stage" x="104" y="122" text-anchor="end">CONV 1</text>
  <rect class="d-box" x="120" y="96" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="122" text-anchor="middle">(1×2) stride 2 → 32 ch · 2 × (4×1) along time</text>
  <path class="d-line" d="M360 140 V163" />
  <polygon class="d-arrow" points="356.5,163 363.5,163 360,168" />
  <text class="d-stage" x="104" y="194" text-anchor="end">CONV 2</text>
  <rect class="d-box" x="120" y="168" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="194" text-anchor="middle">(1×2) stride 2 → 32 ch · 2 × (4×1) along time</text>
  <path class="d-line" d="M360 212 V235" />
  <polygon class="d-arrow" points="356.5,235 363.5,235 360,240" />
  <text class="d-stage" x="104" y="266" text-anchor="end">CONV 3</text>
  <rect class="d-box" x="120" y="240" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="266" text-anchor="middle">(1×10) → 32 ch · 2 × (4×1) along time</text>
  <path class="d-line" d="M360 284 V300" />
  <path class="d-line" d="M194 300 H526" />
  <path class="d-line" d="M194 300 V311" />
  <polygon class="d-arrow" points="190.5,311 197.5,311 194,316" />
  <path class="d-line" d="M360 300 V311" />
  <polygon class="d-arrow" points="356.5,311 363.5,311 360,316" />
  <path class="d-line" d="M526 300 V311" />
  <polygon class="d-arrow" points="522.5,311 529.5,311 526,316" />
  <text class="d-stage d-hl" x="104" y="342" text-anchor="end">INCEPTION</text>
  <rect class="d-box d-accent" x="120" y="316" width="148" height="42" rx="2" />
  <text class="d-main" x="194" y="342" text-anchor="middle">1×1 conv</text>
  <rect class="d-box d-accent" x="286" y="316" width="148" height="42" rx="2" />
  <text class="d-main" x="360" y="342" text-anchor="middle">3×1 conv</text>
  <rect class="d-box d-accent" x="452" y="316" width="148" height="42" rx="2" />
  <text class="d-main" x="526" y="342" text-anchor="middle">5×1 conv + pool</text>
  <path class="d-line" d="M194 358 V374" />
  <path class="d-line" d="M360 358 V374" />
  <path class="d-line" d="M526 358 V374" />
  <path class="d-line" d="M194 374 H526" />
  <path class="d-line" d="M360 374 V385" />
  <polygon class="d-arrow" points="356.5,385 363.5,385 360,390" />
  <text class="d-stage" x="104" y="416" text-anchor="end">CONCAT</text>
  <rect class="d-box" x="120" y="390" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="416" text-anchor="middle">concatenate → 192 channels</text>
  <path class="d-line" d="M360 434 V457" />
  <polygon class="d-arrow" points="356.5,457 363.5,457 360,462" />
  <text class="d-stage" x="104" y="488" text-anchor="end">LSTM</text>
  <rect class="d-box" x="120" y="462" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="488" text-anchor="middle">LSTM 192 → 64 hidden · take final timestep</text>
  <path class="d-line" d="M360 506 V529" />
  <polygon class="d-arrow" points="356.5,529 363.5,529 360,534" />
  <text class="d-stage" x="104" y="560" text-anchor="end">HEAD</text>
  <rect class="d-box" x="120" y="534" width="480" height="44" rx="2" />
  <text class="d-main" x="360" y="560" text-anchor="middle">dropout → FC 64 → FC 3 logits</text>
  <path class="d-line" d="M360 578 V592" />
  <path class="d-line" d="M220 592 H500" />
  <path class="d-line" d="M220 592 V601" />
  <polygon class="d-arrow" points="216.5,601 223.5,601 220,606" />
  <path class="d-line" d="M360 592 V601" />
  <polygon class="d-arrow" points="356.5,601 363.5,601 360,606" />
  <path class="d-line" d="M500 592 V601" />
  <polygon class="d-arrow" points="496.5,601 503.5,601 500,606" />
  <text class="d-stage" x="104" y="625" text-anchor="end">OUTPUT</text>
  <rect class="d-box" x="160" y="606" width="120" height="30" rx="15" />
  <text class="d-main" x="220" y="625" text-anchor="middle">down</text>
  <rect class="d-box" x="300" y="606" width="120" height="30" rx="15" />
  <text class="d-main" x="360" y="625" text-anchor="middle">flat</text>
  <rect class="d-box" x="440" y="606" width="120" height="30" rx="15" />
  <text class="d-main" x="500" y="625" text-anchor="middle">up</text>
</svg>
<figcaption style="font-family: var(--font-schibsted-grotesk), sans-serif; font-size: 0.78rem; color: color-mix(in srgb, var(--carbon) 55%, transparent); text-align: center; margin-top: 0.9rem;">The stack as implemented — raw book in, three-class direction out.</figcaption>
</figure>

## Defining the target

The three classes come from how far mid-price moves over some horizon, compared against a threshold I called epsilon. Move more than epsilon up, it's *up*. More than epsilon down, *down*. Anything in the middle is *flat*. Epsilon is a percentage so it scales with price instead of being stuck to a fixed number of ticks.

Picking epsilon is fiddly. Set it too small and you're labelling noise. Set it too big and everything turns into *flat*. I ran eighteen configurations hunting for an even three-way split, and 0.002% — roughly 0.42 NQ points at a 0.36-second horizon — got closest. Later I switched the horizon from "n snapshots ahead" to **60 seconds of wall-clock time**, since what matters to a trader is how long they're sitting in the position, and book updates arrive at whatever rate they feel like.

## What came back

Two experiments I'd keep:

- A **horizon sweep.** Predicting further out pushed accuracy from 39% to 42%, but macro-F1 didn't move. The model was quietly giving up on the *flat* class, its recall sliding toward 9%. Accuracy went up while the model got worse.
- A **market-hours filter** that turned out to be a null result. My collector had only ever run during US hours, so filtering to US hours removed exactly nothing, and the +0.9% was noise between runs. I'm keeping it here because I spent real time on it before I noticed.

Most runs came in between **33% and 44% out-of-sample accuracy, macro-F1 around 0.35**, which is barely clear of just guessing the most common class. The loudest signal was the gap between training and testing: one run scored **27 points higher on data it had already seen**. It had memorized a stretch of market.

## What the results tell us

Getting to a number I trusted took a while. The feature set went from 188 engineered columns down to the paper's 40 raw ones. Epsilon got swept across eighteen configurations. Class weights were retuned more times than I want to admit, layers got reshuffled, and the labels moved from a snapshot count to wall-clock seconds. Two problems surfaced in the middle of all that: normalizing every snapshot on its own was wiping out the absolute price level and the trend — the exact thing I was asking the model to predict — and the feature layout was pairing ask prices with other ask prices instead of pairing each price with its own volume.

Once the data was finally going in the right way, the real question was still sitting there, so I built a clean experiment to answer it head-on: **is there any signal in this order book at all?**

I ran that one on a gradient-boosted baseline instead of the CNN-LSTM, on purpose. Separating "is there signal in the data" from "is my network any good" is much easier with a simple model, and if a boosted tree on correct features can't beat the base rate, a deep net isn't going to save it. Features were computed properly and causally this time — order-flow imbalance, book imbalance at depth 1, 5 and 10, micro-price deviation from mid — standardized on the training split only, with a temporal split and an embargo so nothing leaked across. The label was a triple-barrier one I could actually trade, and I swept round-trip costs across the whole thing.

There was something there. Direction is predictable at short horizons at **roughly 55%**, decaying to a coinflip by the 60-second mark. Statistically that's a real edge. Practically it's useless, because three ticks of spread plus commission eats it, and whatever survives that needs colocated HFT-grade execution in the microseconds. I have a laptop and a retail broker.

Then there's the number that got me excited for about a day. An early run hit **62% accuracy out-of-sample at a 0.36-second horizon** — the best figure the project ever produced, at exactly the short timeframe where you'd hope to find something. It was hollow. The model had folded onto *flat*, which scored an F1 of 0.77 while up and down limped in at 0.16 and 0.13. On a three-class problem where one class dominates, you can score well by predicting the same thing forever. If I'd only looked at accuracy I'd have called it a win and gone shopping for a broker.

Two bigger walls sat behind all of it:

- **A data ceiling.** Twenty-six patchy days versus the paper's year, and conflated snapshots instead of real order-by-order data. The bigger problem: retail CME depth is licensed for *display*, not *recording*. There was no amount of money I could pay to legally grow that dataset. I shut the collector and the database down.
- **The benchmark answers a different question.** The paper's ~78% is real. It just answers "can you classify a smoothed mid-price," and that target is autocorrelated enough that guessing the previous label gets you most of the way there. It doesn't tell you whether the thing makes money on live NQ after costs. Both are fine questions. Only one of them pays rent.

So I shelved it. The architecture is fine. The question got answered, and the answer was no — you can run the exact network from the paper and still have no way to act on what it tells you, because the signal is thinner than the spread and the machine is too slow. Which is roughly where chapter two starts.
`,
      },
      {
        title: 'Modeling risk instead of forecasting price',
        summary:
          'Where I landed after giving up on prediction — order-flow research built on Monte Carlo and the economics of prop-firm accounts.',
        content: `
Chapter one settled one thing for me: I'm not going to out-predict the market's next move from a laptop. So this time I left price alone and modeled the two things I could actually get a handle on — the spread of outcomes a strategy produces, and whether the economics of the game are any good.

It's a local-first research platform for short-horizon **order-flow strategies on CME futures**, running on Databento's 10-deep (MBP-10) book data for NQ. Execution is manual on purpose. On a prop-firm evaluation account the broker API is locked down, so the system fires an alert and I place the order by hand. Every design decision downstream bends around that.

<figure style="margin: 2.5rem 0;">
<svg class="diagram" viewBox="0 0 660 500" role="img" aria-label="Platform architecture — a one-directional dependency chain from market data to dashboard, with live alerts branching to manual execution">
  <rect class="d-box" x="20" y="20" width="420" height="44" rx="2" />
  <text class="d-main" x="230" y="38" text-anchor="middle">Databento MBP-10</text>
  <text class="d-sub" x="230" y="53" text-anchor="middle">historical replay + live stream · CME futures (NQ)</text>
  <path class="d-line" d="M230 64 V95" />
  <polygon class="d-arrow" points="226.5,95 233.5,95 230,100" />
  <rect class="d-box" x="20" y="100" width="420" height="44" rx="2" />
  <text class="d-main" x="230" y="126" text-anchor="middle">feed — normalized BookSnapshot</text>
  <path class="d-line" d="M230 144 V175" />
  <polygon class="d-arrow" points="226.5,175 233.5,175 230,180" />
  <rect class="d-box d-accent" x="20" y="180" width="420" height="48" rx="2" />
  <text class="d-main" x="230" y="200" text-anchor="middle">strategy</text>
  <text class="d-sub" x="230" y="216" text-anchor="middle">on_book_update(snapshot) → Signal · pure, so backtest ≡ live</text>
  <path class="d-line d-accent" d="M440 204 H474" stroke-dasharray="4 3" />
  <polygon class="d-arrow" points="474,200.5 474,207.5 480,204" />
  <rect class="d-box d-accent" x="480" y="182" width="160" height="44" rx="2" stroke-dasharray="4 3" />
  <text class="d-main" x="560" y="200" text-anchor="middle">live alerts</text>
  <text class="d-sub" x="560" y="215" text-anchor="middle">→ placed by hand</text>
  <path class="d-line" d="M230 228 V246" />
  <path class="d-line" d="M68 246 H392" />
  <path class="d-line" d="M68 246 V259" />
  <polygon class="d-arrow" points="64.5,259 71.5,259 68,264" />
  <path class="d-line" d="M176 246 V259" />
  <polygon class="d-arrow" points="172.5,259 179.5,259 176,264" />
  <path class="d-line" d="M284 246 V259" />
  <polygon class="d-arrow" points="280.5,259 287.5,259 284,264" />
  <path class="d-line" d="M392 246 V259" />
  <polygon class="d-arrow" points="388.5,259 395.5,259 392,264" />
  <rect class="d-box" x="20" y="264" width="96" height="42" rx="2" />
  <text class="d-main" x="68" y="290" text-anchor="middle">backtest</text>
  <rect class="d-box" x="128" y="264" width="96" height="42" rx="2" />
  <text class="d-main" x="176" y="290" text-anchor="middle">monte carlo</text>
  <rect class="d-box" x="236" y="264" width="96" height="42" rx="2" />
  <text class="d-main" x="284" y="290" text-anchor="middle">prop firm</text>
  <rect class="d-box" x="344" y="264" width="96" height="42" rx="2" />
  <text class="d-main" x="392" y="290" text-anchor="middle">optimize</text>
  <path class="d-line" d="M68 306 V324" />
  <path class="d-line" d="M176 306 V324" />
  <path class="d-line" d="M284 306 V324" />
  <path class="d-line" d="M392 306 V324" />
  <path class="d-line" d="M68 324 H392" />
  <path class="d-line" d="M230 324 V337" />
  <polygon class="d-arrow" points="226.5,337 233.5,337 230,342" />
  <rect class="d-box" x="20" y="342" width="420" height="44" rx="2" />
  <text class="d-main" x="230" y="368" text-anchor="middle">api — FastAPI /api/v1</text>
  <path class="d-line" d="M230 386 V417" />
  <polygon class="d-arrow" points="226.5,417 233.5,417 230,422" />
  <rect class="d-box" x="20" y="422" width="420" height="44" rx="2" />
  <text class="d-main" x="230" y="448" text-anchor="middle">web — Next.js dashboard</text>
</svg>
<figcaption style="font-family: var(--font-schibsted-grotesk), sans-serif; font-size: 0.78rem; color: color-mix(in srgb, var(--carbon) 55%, transparent); text-align: center; margin-top: 0.9rem;">One directional chain — and execution deliberately out of band.</figcaption>
</figure>

## Strategies are just functions

A strategy is one method: on_book_update(snapshot) → Signal. No clocks, no IO, no randomness. Keeping it pure means the backtest and the live alert run literally the same code, so parity comes free instead of being something I have to babysit. There are eight signals in there, all microstructure rather than chart indicators: top-of-book size imbalance, distance-weighted depth imbalance, the Stoikov **microprice**, iceberg/absorption detection, queue depletion, liquidity vacuums, and cumulative-delta divergence.

## The backtester assumes I'm wrong

The engine walks the book event by event. The part I care about is the **fill model**. Latency pushes every fill a few snapshots into the future, and slippage always goes against me. Limit orders only fill when price genuinely trades through them, and — this is the useful bit — the ones that *miss* get logged with the PnL they would have made. That gives me a number for **adverse selection**: how often I fill my losers and miss my winners.

Under all that, a columnar "DayBook" read path made loading a day of 16–31M book updates about 35× faster and let it run out-of-core. A 551-test suite checks that the streaming and parallel paths return byte-identical results to the simple one. Walk-forward validation reports how much worse things get out-of-sample, so curve-fitting shows up as a number instead of a feeling.

## The statistics

This is where most of the project lives.

**Monte Carlo.** One backtest is a single sample. It tells you what happened, not what could have happened. So I bootstrap-resample the trade returns with replacement into 10,000 equity paths, then read percentile confidence intervals off them for both return and drawdown, plus a **probability of ruin** — the share of paths that punch through a drawdown floor. There's also a parametric mode that builds paths straight from a risk geometry (win rate, reward-to-risk) using a Bernoulli model and a moment-matched lognormal one. All hand-rolled NumPy. I wanted to write the statistics myself rather than import them.

**Optimization.** An exhaustive grid across parameters × exit policies × position sizing, hard-capped so it can't explode into a week-long job. Each cell gets scored on pass-rate and net expected value. Two guards watch for overfitting: walk-forward degradation, and a "knife-edge" check that flags a winning cell when it's a lonely island — a big drop to its neighbours, or almost nothing else within 10% of its score.

## My favourite part: the account is a call option

The prop-firm model is the piece I like most. A funded-trading challenge is a convex, capped-loss payoff. Blow the evaluation and you're out the fee, not the drawdown — that money was never yours. Pass it and the upside comes back as payouts. Which leads somewhere counterintuitive: a strategy with roughly zero per-trade edge can still be **net EV positive across the whole challenge-to-funded lifecycle**. Judging it on alpha alone misses the point.

I modeled the real rule sets by name, including Apex-style floors that lock at the starting balance and MyFundedFutures-style floors that lock on your first payout. Passing is a **barrier problem**: get to the profit target before you touch the trailing drawdown floor. In that framing, low trade-to-trade variance does more for you than a big expectancy does. A structured-product simulator puts it together — expected attempts at 1/P(pass), expected cost to get funded, net EV, ROI, and the full payout distribution — driven by the real L2 trade distribution and haircut for execution realism.

## Size of the thing

About 23,000 lines of typed Python for the core, another 13,000 for a Next.js dashboard with Monte Carlo fan charts, funded-account curves with payout markers, and optimizer heatmaps. Around 3.9 GB of cached NQ order-book Parquet, and those 551 tests. No trading library anywhere in it — the engine, the statistics and the payoff model are all built from scratch, which was most of the fun.

Tying it back to chapter one: I stopped guessing where price goes, and started paying attention to risk asymmetry, being picky about setups, and understanding the shape of the payoff I'm being handed.
`,
      },
    ],
    hasDetailPage: true,
  },
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
