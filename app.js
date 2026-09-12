/* =========================================================
   A Concrete Field Guide — community-drafted explainer + quiz
   Unofficial. Not affiliated with or endorsed by Concrete.
   All progress is stored locally in this browser only.
   ========================================================= */

const STORAGE_KEY = "concreteFieldGuide.progress.v1";
const POINTS_PER_CORRECT = 10;

const TIERS = [
  { name: "Apprentice", min: 0 },
  { name: "Builder", min: 100 },
  { name: "Foreman", min: 200 },
  { name: "Architect", min: 260 },
];

const LESSONS = [
  {
    id: 1,
    sheetNo: "SHEET 01",
    title: "One-Click DeFi",
    teaser: "Why Concrete exists and what problem it's actually solving.",
    body: [
      "Most DeFi yield strategies ask a lot of the person using them: bridge assets, pick a protocol, approve a contract, monitor a position, rebalance when conditions shift, and repeat. Concrete's whole pitch is to collapse that into a single deposit.",
      "A user puts assets into a Concrete vault once. From there, Concrete's infrastructure takes over — choosing where the capital works, adjusting the strategy as market conditions change, and managing the risk that would otherwise be the user's job to track.",
      "The distinction Concrete draws is between being a thin interface over other protocols versus being the infrastructure itself. Concrete positions itself as the latter: the vault logic, risk handling and routing are built and run by Concrete, not just displayed by it.",
      "The aim is what Concrete calls risk-adjusted yield — returns that are earned deliberately, using the kind of portfolio thinking institutional allocators use, rather than yield that's simply high because it's undiversified or unmonitored.",
    ],
    callout: "Think of it less like a savings account and more like handing your money to a portfolio manager who happens to operate entirely on-chain.",
    quiz: [
      {
        q: "What is the core idea behind Concrete's 'one-click DeFi'?",
        options: [
          "Users manually rebalance across multiple protocols each week",
          "A single deposit lets Concrete's infrastructure handle strategy and risk from there",
          "It only works with one specific blockchain wallet",
          "It removes yield entirely in exchange for lower fees",
        ],
        correct: 1,
      },
      {
        q: "How does Concrete describe itself, compared to a typical DeFi 'UI wrapper'?",
        options: [
          "As a browser extension only",
          "As a marketing front-end with no vault logic of its own",
          "As the underlying infrastructure running the strategy, not just a display layer over it",
          "As a competitor that blocks other protocols from integrating",
        ],
        correct: 2,
      },
      {
        q: "What does Concrete mean by 'risk-adjusted yield'?",
        options: [
          "The highest possible APY regardless of risk",
          "Yield earned using deliberate, portfolio-style risk thinking rather than chasing the biggest number",
          "A fixed interest rate guaranteed by a bank",
          "Yield that is paid out only once per year",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    sheetNo: "SHEET 02",
    title: "Vaults & ERC-4626",
    teaser: "What actually happens to your assets after you deposit.",
    body: [
      "Concrete's vaults are built on ERC-4626, a widely used token standard for representing a share of a shared pool of deposited assets. When you deposit, you effectively receive a claim on a slice of the vault, and that claim's value moves as the vault earns (or loses) yield.",
      "Because it's a standard rather than something Concrete invented from scratch, other DeFi tools, wallets and dashboards can generally read and interact with these vaults without custom integration work — which matters for composability across the ecosystem.",
      "On top of the base vault mechanics, Concrete layers automated accounting and performance tracking, so a depositor can see how a vault is actually performing rather than taking a headline APY on faith.",
      "Different vaults carry different strategies and risk profiles, which is why Concrete frames vault selection itself as a decision worth understanding — not every vault behaves the same way under stress.",
    ],
    callout: "ERC-4626 is the same standard used across much of DeFi's vault ecosystem — it's a shared language, not a Concrete-only format.",
    quiz: [
      {
        q: "What does depositing into a Concrete vault give you, technically?",
        options: [
          "A fixed IOU with no relation to vault performance",
          "A share representing a claim on the pooled vault assets, via the ERC-4626 standard",
          "Ownership of a specific physical asset",
          "A one-time cashback payment",
        ],
        correct: 1,
      },
      {
        q: "Why does it matter that Concrete's vaults use a standard like ERC-4626?",
        options: [
          "It has no practical effect on anything",
          "It makes the vaults slower to interact with",
          "It lets other wallets, dashboards and protocols interact with the vaults without bespoke integrations",
          "It legally requires Concrete to disclose its source code",
        ],
        correct: 2,
      },
      {
        q: "What does Concrete add on top of the base vault mechanics?",
        options: [
          "Nothing — it's an unmodified vault standard",
          "Automated accounting and transparent performance tracking",
          "A requirement to lock funds permanently",
          "Manual daily approval from a human trader",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    sheetNo: "SHEET 03",
    title: "The Concrete Stack",
    teaser: "Epochs, pricing and what a 'no surprises' vault actually means.",
    body: [
      "Concrete describes its infrastructure as 'the Concrete Stack' — the combination of systems that keeps vaults behaving predictably. The team's own framing is blunt: a good vault produces no surprises.",
      "In practice, that means deposits are priced correctly at the time they're made, operating periods ('epochs') close on a predictable schedule rather than at unpredictable moments, and withdrawals clear reliably rather than getting stuck.",
      "This matters more than it might sound like at first. A lot of DeFi risk isn't from the yield strategy itself failing, but from the plumbing around it — mispriced entries, unclear settlement timing, or withdrawal processes that behave inconsistently under stress.",
      "By treating that plumbing as core infrastructure rather than an afterthought, Concrete is trying to make the operational side of a vault as boring and reliable as possible — which, for anyone allocating real capital, is generally the point.",
    ],
    callout: "'Boring' is a compliment in vault infrastructure. Surprises are usually where money gets lost.",
    quiz: [
      {
        q: "According to Concrete's own framing, what defines a 'good vault'?",
        options: [
          "The highest possible short-term returns",
          "It produces no surprises — correct pricing, on-schedule epochs, and clean withdrawals",
          "It never discloses its strategy",
          "It has the most social media followers",
        ],
        correct: 1,
      },
      {
        q: "What is an 'epoch' in the context of the Concrete Stack?",
        options: [
          "A marketing campaign",
          "An operating period that closes on a predictable schedule",
          "A type of wallet",
          "A penalty fee for early withdrawal",
        ],
        correct: 1,
      },
      {
        q: "Why does Concrete emphasize deposit pricing and withdrawal reliability specifically?",
        options: [
          "Because these are purely cosmetic details",
          "Because a lot of real DeFi risk comes from the operational plumbing, not just the yield strategy itself",
          "Because regulators require it to be mentioned",
          "Because it has no bearing on user trust",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 4,
    sheetNo: "SHEET 04",
    title: "Risk & the Probability Engine",
    teaser: "How Concrete tries to keep automated strategies from blowing up.",
    body: [
      "Automating a yield strategy raises an obvious question: who's watching the risk? Concrete's answer includes what it calls a Probability Engine, along with automated vaults and liquidity routing designed to protect user positions.",
      "Concrete's roots are also tied to on-chain credit and lending — its earlier work focused on protecting borrowers from liquidation, the moment a leveraged position gets forcibly closed because collateral value dropped too far.",
      "The liquidation-protection idea works by giving a borrower a way to buy protection against their collateral's value dropping, effectively an automated agreement between the borrower and the protocol, rather than leaving the borrower to manage that risk alone in real time.",
      "The broader point is that automation cuts both ways: it removes manual busywork, but it only works if the risk logic underneath is genuinely doing the job a careful human allocator would do — which is why Concrete talks about this layer as much as it talks about yield.",
    ],
    callout: "Liquidation protection doesn't eliminate risk — it changes who's actively managing it, and when.",
    quiz: [
      {
        q: "What is liquidation, in the context Concrete's earlier lending work addresses?",
        options: [
          "A scheduled interest payment",
          "The forced closing of a leveraged position when collateral value falls too far",
          "A bonus paid to long-term depositors",
          "A type of vault epoch",
        ],
        correct: 1,
      },
      {
        q: "How does Concrete's liquidation protection function, according to its own description?",
        options: [
          "It bans borrowers from taking loans",
          "It requires manual approval from Concrete staff for every trade",
          "As an automated agreement between the borrower and the protocol, brokered through smart contracts",
          "It only applies to institutional custody",
        ],
        correct: 2,
      },
      {
        q: "What is the Probability Engine part of Concrete's system meant to help with?",
        options: [
          "Generating marketing content",
          "Securing user positions and supporting automated, risk-aware vault and routing decisions",
          "Replacing the need for any vaults at all",
          "Setting social media posting schedules",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 5,
    sheetNo: "SHEET 05",
    title: "Points, Bags & the Airdrop",
    teaser: "How the community rewards system actually works — and what it isn't.",
    body: [
      "Concrete runs a community rewards system built around what it calls 'Bags' — points earned by completing tasks like connecting a wallet, following official accounts, joining Discord, and later, creating educational content.",
      "Bags are described as converting into Concrete Points over time, which are positioned as the metric that will matter if and when a token generation event and airdrop happen. As of this guide, no official token launch date has been announced.",
      "Depositing into vaults is a separate track from the social campaign — vault deposits earn their own Concrete Points alongside the live yield the vault produces, so participation and actual usage are tracked somewhat separately.",
      "Community guides consistently flag the same caution worth repeating here: only use the official points portal and Discord, be skeptical of unofficial 'guaranteed airdrop' claims, and never share a wallet's private keys or seed phrase with anyone claiming to help you claim rewards.",
    ],
    callout: "No project has ever needed your seed phrase to give you points. If someone asks for it, that's the scam, not a shortcut.",
    quiz: [
      {
        q: "What are 'Bags' in Concrete's community system?",
        options: [
          "A separate cryptocurrency you can buy",
          "Points earned by completing social and community tasks, which later convert into Concrete Points",
          "A required deposit to use the platform at all",
          "An NFT collectible with no other function",
        ],
        correct: 1,
      },
      {
        q: "As of this guide, what is confirmed about a Concrete token launch?",
        options: [
          "It launched over a year ago",
          "It's scheduled for a specific announced date",
          "No official token launch date has been announced",
          "It will never happen under any circumstances",
        ],
        correct: 2,
      },
      {
        q: "What's the safest practice when farming points or an airdrop for any project, including this one?",
        options: [
          "Share your seed phrase with anyone who says they'll help you qualify faster",
          "Only use official portals and never share private keys or seed phrases with anyone",
          "Send a deposit to a random 'verification' wallet address",
          "Assume every DM offering airdrop help is legitimate",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 6,
    sheetNo: "SHEET 06",
    title: "Enterprise & Who's Behind It",
    teaser: "The institutional side of Concrete, and who's funding it.",
    body: [
      "Alongside its retail-facing vaults, Concrete offers an Enterprise track aimed at institutions — letting assets stay in custody with centralized platforms while still earning yield through Concrete's infrastructure, and including custodian integrations built for regulated players.",
      "Concrete has also announced work bringing its vault infrastructure to other chains and ecosystems, part of a broader push toward what it describes as compliant, privacy-preserving on-chain finance for institutional users.",
      "On funding, Concrete has raised roughly $17 million to date from investors including Polychain Capital, YZi Labs (formerly known as Binance Labs), and VanEck — names that signal institutional interest in the on-chain yield infrastructure space specifically.",
      "For a community member, the practical takeaway is less about the specific dollar figure and more about positioning: Concrete is explicitly trying to serve both individual depositors and larger institutional capital through the same underlying stack.",
    ],
    callout: "A protocol chasing institutional custody clients tends to prioritize predictability over flashy short-term yield — worth keeping in mind when comparing it to more experimental DeFi projects.",
    quiz: [
      {
        q: "What does Concrete's Enterprise offering let institutional assets do?",
        options: [
          "They must leave centralized custody entirely",
          "Remain in custody with centralized platforms while still earning yield through Concrete's infrastructure",
          "Nothing — Enterprise is a marketing name with no product behind it",
          "Only be used for lending to retail users",
        ],
        correct: 1,
      },
      {
        q: "Which of these is one of Concrete's disclosed investors?",
        options: [
          "Polychain Capital",
          "A random anonymous crypto whale",
          "A government sovereign wealth fund",
          "No investors have ever been disclosed",
        ],
        correct: 0,
      },
      {
        q: "Why is it relevant to a community member that Concrete pursues institutional custody clients?",
        options: [
          "It has no relevance at all",
          "It suggests a bias toward predictability and reliability over chasing the highest possible short-term yield",
          "It means retail users are no longer allowed to use Concrete",
          "It guarantees the token will launch on a specific date",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 7,
    sheetNo: "SHEET 07",
    title: "Roles, Custody & Who Can Touch What",
    teaser: "The permission structure behind every vault — who can act, and who's just watching.",
    body: [
      "According to Concrete's own documentation, every vault splits authority into two kinds of roles. Governance roles — Vault Manager, Strategy Manager, Hook Manager — sit with the Vault Admin and only act on low-frequency, high-impact decisions: things like adding a new strategy or changing a vault's parameters.",
      "Operational roles — the Allocator and the Withdrawal Manager — are automated services built and run by Concrete. They handle the high-frequency, low-impact work: moving funds between approved strategies, processing redemptions, keeping accounting current. The split exists so that routine operations don't require a human to sign off on every action, while the decisions that matter most still do.",
      "Deposited assets don't sit inside the vault contract itself. They're forwarded to a MultisigStrategy, backed by either a Gnosis Safe or a Fordefi MPC wallet — both are established, widely audited custody mechanisms in their own right, not something Concrete built from scratch for this purpose.",
      "Off-chain values (like updated yield figures) only move the vault's on-chain accounting within bounds: a change threshold, a cooldown period, and a validity window all constrain how much and how fast a number can shift. That's a deliberate brake against a single bad or manipulated data point swinging the vault's numbers.",
      "Two more layers sit on top: Hypernative provides independent, real-time monitoring for risk signals, and ZeroShadow holds pre-delegated authority to pause a vault if something looks wrong — without waiting on a slower governance process. Concrete's contracts have also been audited by Halborn, Cantina, Code4rena, and Zellic.",
    ],
    callout: "Automation removes busywork, not accountability — the multisig, the bounded accounting, and the independent monitors all exist because 'automated' isn't supposed to mean 'unsupervised.'",
    quiz: [
      {
        q: "What's the difference between Concrete's governance roles and its operational roles?",
        options: [
          "There is no difference — all roles are identical",
          "Governance roles (Vault Manager, Strategy Manager, Hook Manager) handle rare, high-impact decisions; operational roles (Allocator, Withdrawal Manager) are automated and handle frequent, low-impact actions",
          "Governance roles are automated and operational roles require a human vote every time",
          "Only operational roles exist — Concrete has no governance layer",
        ],
        correct: 1,
      },
      {
        q: "Where do deposited assets actually live, according to Concrete's documentation?",
        options: [
          "Directly inside the ERC-4626 vault contract with no other custody layer",
          "Forwarded to a MultisigStrategy backed by a Gnosis Safe or Fordefi MPC wallet",
          "In a personal wallet controlled by one Concrete employee",
          "Assets are never actually deposited anywhere",
        ],
        correct: 1,
      },
      {
        q: "What is the purpose of the change threshold, cooldown, and validity window on off-chain accounting updates?",
        options: [
          "To slow the platform down for no functional reason",
          "To bound how much and how fast an off-chain value can move the vault's on-chain numbers, limiting the damage from a bad data point",
          "To charge users an extra fee",
          "To prevent any withdrawals from ever happening",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 8,
    sheetNo: "SHEET 08",
    title: "Withdrawals, Epochs & Vault Shares Up Close",
    teaser: "What ctWBTC and ctDefiUSDT actually are, and what happens when you hit 'withdraw'.",
    body: [
      "When you deposit into a Concrete vault, you receive an ERC-20 share token — things like ctWBTC or ctDefiUSDT — representing your slice of that vault. Your share count doesn't change day to day; instead, the exchange rate between your shares and the underlying asset rises as the vault earns yield. That's the mechanism, not a marketing simplification of it.",
      "Vaults can run in one of two withdrawal modes. Standard-mode vaults process withdrawals instantly. Asynchronous vaults queue withdrawal requests into time-based batches called epochs — commonly on a roughly weekly cutoff and payout cycle — so the vault can manage liquidity across all the strategies it's deployed into, rather than being forced to unwind a strategy at the exact moment one user wants out.",
      "In an async vault, requesting a withdrawal doesn't pay out immediately. Your shares move into the current epoch, and once that epoch is processed, you claim your underlying asset back. Each vault also enforces per-epoch minimum and maximum withdrawal limits — a request outside those bounds won't clear until conditions allow it.",
      "Everything is meant to be checkable, not just trusted: subgraph indexing tracks every deposit, withdrawal, and yield update on-chain, and factory-based deployment means vaults can be upgraded over time without breaking the underlying accounting. If you're ever unsure whether a vault is sync or async, or what its current epoch limits are, that's exactly the kind of thing worth confirming on the official app or docs before depositing anything meaningful.",
    ],
    callout: "An async, epoch-based withdrawal isn't a red flag by itself — it's a liquidity management tool many serious yield protocols use. The red flag is not knowing which mode a vault you've deposited in actually uses.",
    quiz: [
      {
        q: "What does holding a token like ctWBTC or ctDefiUSDT represent?",
        options: [
          "A loan you owe to Concrete",
          "An ERC-20 vault share whose exchange rate to the underlying asset rises as the vault earns yield",
          "A governance-only voting token with no economic value",
          "A fixed-price gift card",
        ],
        correct: 1,
      },
      {
        q: "In an asynchronous (epoch-based) vault, what happens right after you request a withdrawal?",
        options: [
          "The underlying asset is sent to your wallet instantly",
          "Your shares are queued into the current epoch and become claimable once that epoch is processed",
          "Your deposit is permanently locked with no path to withdraw",
          "Nothing — async vaults don't allow withdrawals at all",
        ],
        correct: 1,
      },
      {
        q: "Why does Concrete use subgraph indexing and factory-based deployment?",
        options: [
          "To make the protocol harder to audit",
          "So every vault action is trackable on-chain and vaults can be upgraded over time without breaking accounting",
          "To hide transaction history from users",
          "These have no real function and exist for marketing only",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 9,
    sheetNo: "SHEET 09",
    title: "The Pivot: From Credit Protocol to Vault Infrastructure",
    teaser: "How Concrete went from an on-chain credit market to full-stack yield infrastructure — and what AssetCX and concUSD add.",
    body: [
      "Concrete didn't start out as a vault platform. Blueprint Finance, the studio behind it, came out of stealth in February 2024 describing Concrete Protocol as an appchain built specifically for on-chain debt and credit — its original pitch centered on liquidation protection for borrowers, not one-click yield vaults.",
      "Over the following year, the product surface shifted toward what's covered in the earlier sheets of this guide: ERC-4626 vaults, automated accounting, the Probability Engine, and epoch-based withdrawals. By mid-2025 Concrete was describing itself as full-stack yield infrastructure for institutions, protocols and asset managers rather than a credit-specific appchain — the liquidation-protection roots are still part of the risk story, but they're no longer the whole pitch.",
      "Two newer primitives extend that infrastructure further. AssetCX pairs Concrete's vault machinery with qualified custodians — BitGo among them — so custodied digital assets can earn yield without leaving regulated custody. concUSD is being built alongside it as a further building block in the same ecosystem, extending Concrete into new on-chain assets and markets rather than just vault wrappers around existing ones.",
      "Concrete has also expanded beyond EVM chains: it acquired the Solana lending protocol Jet Protocol in October 2024, and relaunched it in April 2025 as Glow Finance — giving the ecosystem a foothold outside Ethereum-style chains as part of the same broader infrastructure push.",
    ],
    callout: "A protocol changing its core pitch isn't automatically a red flag — but it's exactly the kind of change worth tracking against primary sources rather than assuming last year's explainer still applies.",
    quiz: [
      {
        q: "What was Concrete Protocol originally pitched as, at its February 2024 launch?",
        options: [
          "A one-click yield vault platform, unchanged ever since",
          "An appchain built for on-chain debt and credit, centered on liquidation protection",
          "A meme coin launchpad",
          "A centralized exchange",
        ],
        correct: 1,
      },
      {
        q: "What does AssetCX add to Concrete's infrastructure?",
        options: [
          "A way to pair vault infrastructure with qualified custodians so custodied assets can earn yield",
          "A new blockchain built entirely from scratch",
          "A ban on institutional participation",
          "A replacement for ERC-4626 vaults",
        ],
        correct: 0,
      },
      {
        q: "What did Concrete's October 2024 acquisition of Jet Protocol lead to?",
        options: [
          "Nothing — the acquisition was never completed",
          "Glow Finance, a relaunch giving Concrete a foothold on Solana",
          "The shutdown of all Concrete vaults",
          "A merger with a centralized exchange",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 10,
    sheetNo: "SHEET 10",
    title: "Blueprint Finance: The Team & the Funding Trail",
    teaser: "Who builds Concrete, who's backing it, and how to read a funding announcement without getting hyped.",
    body: [
      "Blueprint Finance is the development studio behind Concrete, founded in 2022 by CEO Nic Roberts-Huntley and co-founder Dillon Liang. The team describes itself as globally distributed, with members who've worked at firms spanning traditional finance and crypto-native shops alike.",
      "The funding trail is public and worth knowing independently of any single announcement: a pre-seed round led by Portal Ventures, a $7.5M round in February 2024 led by Hashed and Tribe Capital (alongside SALT, Kyber, Hypersphere and others) that funded the original Concrete Protocol launch, a $9.5M strategic round in June 2025 led by Polychain Capital with YZi Labs (formerly Binance Labs) and VanEck joining a long investor list, and a further strategic round in August 2026 led by Polychain Capital again, this time joined by Bullish, Keyrock, BitGo, FalconX and several other institutional trading and infrastructure firms.",
      "Reading these announcements takes a little care. Press releases routinely name investors and describe strategic intent, but don't always disclose the amount raised or valuation — the August 2026 round is a case in point. Treat the funding list as a signal of institutional interest, not as a guarantee of price action, token value, or timelines.",
      "The identity of backers has shifted meaningfully over time too — from crypto-native VCs at the 2024 raise toward custodians, market makers and asset managers like BitGo, FalconX and VanEck by 2025–2026 — which lines up with the same institutional pivot covered in the previous sheet.",
    ],
    callout: "A funding round is a fact about who believes in the team enough to write a check — it isn't, by itself, a fact about whether a vault is safe to deposit into. Keep the two separate.",
    quiz: [
      {
        q: "Who founded Blueprint Finance, and when?",
        options: [
          "Nic Roberts-Huntley and Dillon Liang, in 2022",
          "A single anonymous founder, in 2026",
          "A consortium of centralized exchanges",
          "It has never disclosed its founders",
        ],
        correct: 0,
      },
      {
        q: "What led the $7.5M round that funded Concrete Protocol's original February 2024 launch?",
        options: [
          "Hashed and Tribe Capital",
          "A government grant",
          "A single anonymous angel investor",
          "VanEck alone",
        ],
        correct: 0,
      },
      {
        q: "What's the safest way to read a funding announcement like Blueprint Finance's August 2026 round?",
        options: [
          "As a guarantee the token price will rise",
          "As a signal of institutional interest in the team and infrastructure, separate from any claim about vault safety or returns",
          "As proof a token has already launched",
          "As irrelevant information not worth tracking",
        ],
        correct: 1,
      },
    ],
  },
];

/* ============ Glossary ============ */

const GLOSSARY = [
  { term: "TVL (Total Value Locked)", def: "The total dollar value of assets currently deposited across a protocol's vaults or contracts. A live snapshot, not a guarantee of safety or future performance." },
  { term: "APY (Annual Percentage Yield)", def: "The rate of return a deposit would earn over a year if current conditions held steady — a projection based on the present, not a fixed promise." },
  { term: "ERC-4626", def: "A shared Ethereum token standard for 'tokenized vaults' — a common way for a vault to represent deposits as shares, so wallets and other protocols can interact with it without custom code." },
  { term: "Vault share (e.g. ctWBTC, ctDefiUSDT)", def: "The ERC-20 token you receive when you deposit into a Concrete vault. Your share count stays constant; the value each share is worth rises as the vault earns yield." },
  { term: "Epoch", def: "A fixed operating window during which a vault batches actions — like withdrawal requests — before processing them together, often on a set schedule such as weekly." },
  { term: "Allocator", def: "The automated operational role that moves a vault's deposited funds between its approved strategies, within pre-set limits." },
  { term: "Withdrawal Manager", def: "The automated operational role responsible for processing redemption requests, including managing epoch-based withdrawal queues." },
  { term: "Vault Manager / Strategy Manager / Hook Manager", def: "Governance roles held by a vault's Admin, covering the rare, high-impact decisions — like approving a new strategy — rather than day-to-day operations." },
  { term: "MultisigStrategy", def: "The custody arrangement that actually holds deposited assets, backed by a Gnosis Safe or Fordefi MPC wallet rather than sitting in the vault contract itself." },
  { term: "Liquidation", def: "The forced closing of a leveraged position after its collateral value drops too far to safely support the loan." },
  { term: "Liquidation protection", def: "An optional, automated agreement that shields a borrower from forced liquidation under agreed conditions, brokered through smart contracts." },
  { term: "Bags", def: "Concrete's community reward points, earned through social and platform tasks, which are described as converting into Concrete Points over time." },
  { term: "Concrete Points", def: "The metric Concrete has said will matter for eligibility if and when a token generation event happens. No official launch date has been announced as of this guide." },
  { term: "TGE (Token Generation Event)", def: "The point at which a project's token is created and typically becomes tradable — often the moment an airdrop, if any, is distributed." },
  { term: "Probability Engine", def: "Concrete's internal system, referenced in its own materials, for automated risk assessment supporting vault and routing decisions." },
  { term: "Subgraph", def: "An indexed, queryable record of a protocol's on-chain events (deposits, withdrawals, yield updates) — what lets a dashboard show history without re-reading the entire blockchain each time." },
  { term: "Blueprint Finance", def: "The development studio behind Concrete, founded in 2022 by Nic Roberts-Huntley and Dillon Liang. 'Blueprint Finance' and 'Concrete' show up interchangeably in press coverage — Blueprint is the company, Concrete is the product." },
  { term: "AssetCX", def: "A Concrete primitive that pairs vault infrastructure with qualified custodians (BitGo among them) so custodied digital assets can earn yield without leaving regulated custody." },
  { term: "concUSD", def: "A newer on-chain asset being developed within the Concrete ecosystem alongside AssetCX, extending Concrete's infrastructure into new asset and market types." },
  { term: "Concrete Earn", def: "The current branding for Concrete's main vault/deposit experience at app.concrete.xyz/earn — same underlying vaults, refreshed interface." },
  { term: "USD1 RWA Vault", def: "A Concrete vault unifying multiple real-world-asset yield opportunities (private credit, RWAs, digital infrastructure) for holders of the USD1 stablecoin in a single deposit." },
  { term: "YZi Labs", def: "The venture arm formerly known as Binance Labs, renamed YZi Labs — one of Concrete's disclosed investors across multiple funding rounds." },
  { term: "Strategic round", def: "A funding round, often later-stage, where investors are chosen as much for the operational value they bring (custody, trading, liquidity) as for the capital itself — the kind of round Concrete raised in June 2025 and August 2026." },
];

/* ============ Official links ============ */

const OFFICIAL_LINKS = [
  { name: "Main site", url: "https://concrete.xyz" },
  { name: "Vault app (Concrete Earn)", url: "https://app.concrete.xyz/earn" },
  { name: "Points & Bags portal", url: "https://points.concrete.xyz" },
  { name: "Documentation", url: "https://docs.concrete.xyz" },
  { name: "Concrete on X", url: "https://x.com/ConcreteXYZ" },
  { name: "Blueprint Finance (studio site)", url: "https://blueprintfinance.com" },
  { name: "Blueprint Finance on X", url: "https://x.com/Blueprint_DeFi" },
  { name: "Official blog", url: "https://paragraph.com/@concretexyz" },
  { name: "DefiLlama protocol page", url: "https://defillama.com/protocol/concrete" },
];

/* ============ State ============ */

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    /* storage unavailable — app still works, just won't persist */
  }
}

let progress = loadProgress();
let activeLessonId = null;
let quizAnswers = {};

function bestScore(lessonId) {
  const entry = progress[lessonId];
  return entry ? entry.bestScore || 0 : 0;
}

function isDone(lessonId) {
  const entry = progress[lessonId];
  return !!(entry && entry.done);
}

function totalScore() {
  return LESSONS.reduce((sum, l) => sum + bestScore(l.id), 0);
}

function maxScore() {
  return LESSONS.reduce((sum, l) => sum + l.quiz.length * POINTS_PER_CORRECT, 0);
}

function currentTier(score) {
  let tier = TIERS[0];
  for (const t of TIERS) {
    if (score >= t.min) tier = t;
  }
  return tier;
}

/* ============ Navigation ============ */

const views = {
  home: document.getElementById("view-home"),
  lessons: document.getElementById("view-lessons"),
  "lesson-detail": document.getElementById("view-lesson-detail"),
  quiz: document.getElementById("view-quiz"),
  result: document.getElementById("view-result"),
  progress: document.getElementById("view-progress"),
  live: document.getElementById("view-live"),
  glossary: document.getElementById("view-glossary"),
  news: document.getElementById("view-news"),
};

function showView(name) {
  Object.values(views).forEach((v) => v.classList.add("view-hidden"));
  views[name].classList.remove("view-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "news") {
    startNewsAutoRefresh();
    renderTimeline();
    if (window.twttr && window.twttr.widgets) window.twttr.widgets.load();
  } else {
    stopNewsAutoRefresh();
  }
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-nav]");
  if (!target) return;
  const dest = target.getAttribute("data-nav");
  if (dest === "lessons") renderLessonIndex();
  if (dest === "progress") renderProgress();
  if (dest === "live") fetchLiveData();
  if (dest === "glossary") renderGlossary();
  if (dest === "news") fetchNews();
  showView(dest);
});

/* ============ Home ============ */

function renderHeroTier() {
  const tier = currentTier(totalScore());
  document.getElementById("hero-tier").textContent = tier.name;
  const drawingsEl = document.getElementById("stat-drawings");
  const checksEl = document.getElementById("stat-checks");
  if (drawingsEl) drawingsEl.textContent = LESSONS.length;
  if (checksEl) checksEl.textContent = LESSONS.reduce((sum, l) => sum + l.quiz.length, 0);
}

/* ============ Lesson index ============ */

function renderLessonIndex() {
  const container = document.getElementById("lesson-index");
  container.innerHTML = "";
  LESSONS.forEach((lesson) => {
    const row = document.createElement("div");
    row.className = "lesson-row";
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");

    const done = isDone(lesson.id);
    const statusClass = done ? "status-done" : "status-open";
    const statusText = done ? "Signed off" : "Open";

    row.innerHTML = `
      <div class="lesson-sheet-no">${lesson.sheetNo}</div>
      <div>
        <p class="lesson-row-title">${lesson.title}</p>
        <p class="lesson-row-desc">${lesson.teaser}</p>
      </div>
      <div class="lesson-row-status ${statusClass}">${statusText}</div>
    `;
    row.addEventListener("click", () => openLesson(lesson.id));
    row.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openLesson(lesson.id);
    });
    container.appendChild(row);
  });
  renderHeroTier();
}

/* ============ Lesson detail ============ */

function openLesson(lessonId) {
  activeLessonId = lessonId;
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const container = document.getElementById("lesson-content");

  const bodyHtml = lesson.body.map((p) => `<p>${p}</p>`).join("");

  container.innerHTML = `
    <div class="lesson-doc-head">
      <div class="lesson-doc-eyebrow">${lesson.sheetNo} · FIELD GUIDE</div>
      <h1 class="lesson-doc-title">${lesson.title}</h1>
    </div>
    <div class="lesson-body">
      ${bodyHtml}
      <div class="lesson-callout">${lesson.callout}</div>
    </div>
    <div class="lesson-cta">
      <button class="btn btn-primary" id="start-quiz-btn">Start inspection (${lesson.quiz.length} checks)</button>
    </div>
  `;

  document.getElementById("start-quiz-btn").addEventListener("click", () => openQuiz(lessonId));
  showView("lesson-detail");
}

/* ============ Quiz ============ */

function openQuiz(lessonId) {
  activeLessonId = lessonId;
  quizAnswers = {};
  const lesson = LESSONS.find((l) => l.id === lessonId);

  document.getElementById("quiz-sheet-label").textContent = `${lesson.sheetNo} · INSPECTION`;
  document.getElementById("quiz-title").textContent = lesson.title;

  const body = document.getElementById("quiz-body");
  body.innerHTML = "";

  lesson.quiz.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";
    qDiv.innerHTML = `
      <div class="quiz-q-num">CHECK ${qIndex + 1} OF ${lesson.quiz.length}</div>
      <p class="quiz-q-text">${q.q}</p>
      <div class="quiz-options" data-qindex="${qIndex}"></div>
    `;
    const optionsDiv = qDiv.querySelector(".quiz-options");
    q.options.forEach((opt, oIndex) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        quizAnswers[qIndex] = oIndex;
        optionsDiv.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      optionsDiv.appendChild(btn);
    });
    body.appendChild(qDiv);
  });

  const submitRow = document.createElement("div");
  submitRow.className = "quiz-submit-row";
  const submitBtn = document.createElement("button");
  submitBtn.className = "btn btn-primary";
  submitBtn.textContent = "Submit for inspection";
  submitBtn.addEventListener("click", () => submitQuiz(lessonId));
  submitRow.appendChild(submitBtn);
  body.appendChild(submitRow);

  showView("quiz");
}

function submitQuiz(lessonId) {
  const lesson = LESSONS.find((l) => l.id === lessonId);

  if (Object.keys(quizAnswers).length < lesson.quiz.length) {
    alert("Answer every check before submitting for inspection.");
    return;
  }

  let correctCount = 0;
  const optionGroups = document.querySelectorAll(".quiz-options");
  optionGroups.forEach((group) => {
    const qIndex = parseInt(group.getAttribute("data-qindex"), 10);
    const question = lesson.quiz[qIndex];
    const buttons = group.querySelectorAll(".quiz-option");
    buttons.forEach((btn, oIndex) => {
      btn.disabled = true;
      if (oIndex === question.correct) btn.classList.add("correct");
      if (oIndex === quizAnswers[qIndex] && oIndex !== question.correct) btn.classList.add("incorrect");
    });
    if (quizAnswers[qIndex] === question.correct) correctCount++;
  });

  const score = correctCount * POINTS_PER_CORRECT;
  const passed = correctCount === lesson.quiz.length;
  const prevBest = bestScore(lessonId);

  progress[lessonId] = {
    bestScore: Math.max(prevBest, score),
    done: isDone(lessonId) || passed,
    lastAttempt: score,
  };
  saveProgress(progress);

  setTimeout(() => showResult(lesson, correctCount, passed), 900);
}

function showResult(lesson, correctCount, passed) {
  const stamp = document.getElementById("result-stamp");
  stamp.textContent = passed ? "SIGNED OFF" : "RE-INSPECT";
  stamp.className = passed ? "result-stamp" : "result-stamp fail";

  document.getElementById("result-heading").textContent = passed
    ? `${lesson.title} — cleared`
    : `${lesson.title} — not quite`;

  document.getElementById("result-detail").textContent = passed
    ? `${correctCount} of ${lesson.quiz.length} checks correct. This sheet is signed off — head back to the drawing set whenever you're ready for the next one.`
    : `${correctCount} of ${lesson.quiz.length} checks correct. Reread the drawing and try the inspection again — nothing is timed or limited.`;

  showView("result");
}

/* ============ Progress / standing ============ */

function renderProgress() {
  const total = totalScore();
  const max = maxScore();
  const tier = currentTier(total);

  document.getElementById("progress-tier").textContent = tier.name;
  document.getElementById("tier-points").textContent = `${total} / ${max} marks`;
  document.getElementById("tier-bar-fill").style.width = `${Math.min(100, (total / max) * 100)}%`;

  const ladder = document.getElementById("tier-ladder");
  ladder.innerHTML = "";
  TIERS.forEach((t) => {
    const li = document.createElement("li");
    if (t.name === tier.name) li.classList.add("active-tier");
    li.innerHTML = `<span>${t.name}</span><span>${t.min}+</span>`;
    ladder.appendChild(li);
  });

  const tbody = document.getElementById("log-table-body");
  tbody.innerHTML = "";
  LESSONS.forEach((lesson) => {
    const done = isDone(lesson.id);
    const score = bestScore(lesson.id);
    const max = lesson.quiz.length * POINTS_PER_CORRECT;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${lesson.sheetNo}</td>
      <td>${lesson.title}</td>
      <td><span class="status-pill ${done ? "pill-done" : "pill-open"}">${done ? "Signed off" : "Open"}</span></td>
      <td>${score} / ${max}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("reset-progress").addEventListener("click", () => {
  if (confirm("Reset all local progress on this device? This can't be undone.")) {
    progress = {};
    saveProgress(progress);
    renderProgress();
    renderHeroTier();
  }
});

/* ============ Live data (DefiLlama public API) ============ */

const DEFILLAMA_URL = "https://api.llama.fi/protocol/concrete";
let liveDataCache = null;

function formatUsd(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}

function latestTvlFromSeries(series) {
  if (!Array.isArray(series) || series.length === 0) return null;
  return series[series.length - 1].totalLiquidityUSD ?? null;
}

async function fetchLiveData(forHomeOnly) {
  if (!forHomeOnly) {
    const statusEl = document.getElementById("live-status");
    statusEl.textContent = "Fetching current figures…";
    statusEl.className = "live-status";
  }

  try {
    const res = await fetch(DEFILLAMA_URL);
    if (!res.ok) throw new Error("Bad response: " + res.status);
    const data = await res.json();

    const chainTvls = data.chainTvls || {};
    const chainNames = Object.keys(chainTvls).filter((c) => !c.includes("-borrowed") && !c.includes("staking"));
    const currentTotal =
      typeof data.currentChainTvls === "object"
        ? Object.values(data.currentChainTvls).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0)
        : latestTvlFromSeries(data.tvl);

    const series = Array.isArray(data.tvl)
      ? data.tvl.filter((p) => typeof p.totalLiquidityUSD === "number")
      : [];

    liveDataCache = {
      tvl: currentTotal,
      chains: chainNames.length || (data.chains ? data.chains.length : 0),
      chainNames: data.chains || chainNames,
      category: data.category || "Onchain Capital Allocator",
      series,
      fetchedAt: new Date(),
    };

    renderLiveTeaser();
    if (!forHomeOnly) renderLiveDetail();
  } catch (err) {
    if (!forHomeOnly) {
      const statusEl = document.getElementById("live-status");
      statusEl.textContent = "Couldn't reach DefiLlama's API right now — try refresh, or check defillama.com/protocol/concrete directly.";
      statusEl.className = "live-status is-error";
    }
    const teaser = document.getElementById("live-teaser-tvl");
    if (teaser) teaser.textContent = "Live TVL unavailable right now";
  }
}

function renderLiveTeaser() {
  const el = document.getElementById("live-teaser-tvl");
  if (!el || !liveDataCache) return;
  el.textContent = `Concrete TVL: ${formatUsd(liveDataCache.tvl)} across ${liveDataCache.chains} chain${liveDataCache.chains === 1 ? "" : "s"}`;
}

function pctChangeOverDays(series, days) {
  if (!series || series.length < 2) return null;
  const last = series[series.length - 1].totalLiquidityUSD;
  const idx = Math.max(0, series.length - 1 - days);
  const prior = series[idx].totalLiquidityUSD;
  if (!prior) return null;
  return ((last - prior) / prior) * 100;
}

function formatPct(p) {
  if (p === null || Number.isNaN(p)) return "—";
  const sign = p > 0 ? "+" : "";
  return sign + p.toFixed(1) + "%";
}

function renderSparkline(series) {
  const svg = document.getElementById("tvl-sparkline");
  if (!svg) return;
  if (!series || series.length < 2) {
    svg.innerHTML = "";
    return;
  }
  const recent = series.slice(-90); // ~last 90 data points
  const values = recent.map((p) => p.totalLiquidityUSD);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 600, h = 120, pad = 6;
  const range = max - min || 1;
  const points = recent.map((p, i) => {
    const x = pad + (i / (recent.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p.totalLiquidityUSD - min) / range) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = "M" + points.join(" L");
  const areaPath = linePath + ` L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.innerHTML = `
    <path d="${areaPath}" fill="rgba(91,132,184,0.14)" stroke="none"></path>
    <path d="${linePath}" fill="none" stroke="var(--blueprint)" stroke-width="2"></path>
  `;
}

function renderLiveDetail() {
  if (!liveDataCache) return;
  document.getElementById("live-tvl").textContent = formatUsd(liveDataCache.tvl);

  const change7d = pctChangeOverDays(liveDataCache.series, 7);
  const change30d = pctChangeOverDays(liveDataCache.series, 30);
  document.getElementById("live-tvl-change").textContent =
    change7d !== null ? `${formatPct(change7d)} over 7d · ${formatPct(change30d)} over 30d` : "Live market snapshot";

  document.getElementById("live-category").textContent = liveDataCache.category;
  document.getElementById("live-chains").textContent = liveDataCache.chains;
  document.getElementById("live-chains-list").textContent = (liveDataCache.chainNames || []).slice(0, 6).join(", ") || "—";

  renderSparkline(liveDataCache.series);
  renderFundingOverview();

  const statusEl = document.getElementById("live-status");
  statusEl.textContent = "Connected to api.llama.fi";
  statusEl.className = "live-status is-ok";

  document.getElementById("live-updated").textContent =
    "Last updated " + liveDataCache.fetchedAt.toLocaleTimeString();
}

document.getElementById("live-refresh-btn")?.addEventListener("click", () => fetchLiveData(false));

/* ============ Funding overview (static, hand-verified) ============ */

function renderFundingOverview() {
  const container = document.getElementById("funding-list");
  if (!container || container.childElementCount > 0) return;
  const fundingEvents = TIMELINE_EVENTS.filter((e) => e.tag.includes("Funding"));
  container.innerHTML = "";
  fundingEvents.forEach((ev) => {
    const row = document.createElement("div");
    row.className = "funding-row";
    row.innerHTML = `
      <div class="funding-date">${ev.date}</div>
      <div>
        <div class="funding-title">${ev.title}</div>
        <p class="funding-desc">${ev.body}</p>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ============ Glossary ============ */

function renderGlossary(filterText) {
  const list = document.getElementById("glossary-list");
  const term = (filterText || "").toLowerCase();
  const filtered = GLOSSARY.filter(
    (g) => !term || g.term.toLowerCase().includes(term) || g.def.toLowerCase().includes(term)
  );

  list.innerHTML = "";
  if (filtered.length === 0) {
    list.innerHTML = `<div class="glossary-empty">No terms match "${filterText}".</div>`;
  } else {
    filtered.forEach((g, i) => {
      const item = document.createElement("div");
      item.className = "glossary-item";
      item.innerHTML = `
        <button class="glossary-term-btn">
          <span>${g.term}</span>
          <span class="glossary-term-caret">+</span>
        </button>
        <div class="glossary-def">${g.def}</div>
      `;
      const btn = item.querySelector(".glossary-term-btn");
      const caret = item.querySelector(".glossary-term-caret");
      btn.addEventListener("click", () => {
        const open = item.classList.toggle("is-open");
        caret.textContent = open ? "\u2212" : "+";
      });
      list.appendChild(item);
    });
  }

  const linkGrid = document.getElementById("link-grid");
  if (linkGrid.childElementCount === 0) {
    OFFICIAL_LINKS.forEach((l) => {
      const a = document.createElement("a");
      a.className = "link-card";
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `<div class="link-card-name">${l.name}</div><div class="link-card-url">${l.url}</div>`;
      linkGrid.appendChild(a);
    });
  }
}

document.getElementById("glossary-search")?.addEventListener("input", (e) => {
  renderGlossary(e.target.value);
});

/* ============ Curated funding & product timeline ============ */
/* Hand-maintained history of Concrete / Blueprint Finance milestones.
   This is not live-fetched — it's compiled from official announcements
   (Concrete's own blog, X account, and funding-round press releases) so
   the guide has an accurate record even before this page existed.
   Update this array by hand as new milestones are confirmed. */

const TIMELINE_EVENTS = [
  {
    date: "2022",
    tag: "Founding",
    title: "Blueprint Finance is founded",
    body: "CEO Nic Roberts-Huntley and co-founder Dillon Liang start Blueprint Finance in the aftermath of FTX's collapse, aiming to rebuild on-chain trust in credit and debt infrastructure.",
    link: "https://blueprintfinance.com",
  },
  {
    date: "2023",
    tag: "Funding",
    title: "Pre-seed round led by Portal Ventures",
    body: "An early pre-seed round, with participation from Picks & Shovels and Canonical Crypto, funds initial development ahead of the public launch.",
    link: "https://x.com/ConcreteXYZ",
  },
  {
    date: "Feb 2024",
    tag: "Launch · Funding",
    title: "Concrete Protocol launches with a $7.5M raise",
    body: "Blueprint Finance comes out of stealth, introducing Concrete Protocol as an on-chain credit market with liquidation protection. The $7.5M round is led by Hashed and Tribe Capital, joined by SALT, Kyber, Hypersphere, Portal Ventures, Avalanche Foundation and others.",
    link: "https://paragraph.com/@concretexyz/concrete-protocol-the-foundation-for-on-chain-credit",
  },
  {
    date: "Oct 2024",
    tag: "Acquisition",
    title: "Concrete acquires Jet Protocol",
    body: "Concrete announces the acquisition of Jet Protocol, a Solana lending protocol, extending its ambitions beyond EVM chains.",
    link: "https://x.com/ConcreteXYZ",
  },
  {
    date: "Apr 2025",
    tag: "Product",
    title: "Jet Protocol relaunches as Glow Finance",
    body: "The acquired Solana protocol is relaunched under the Glow Finance name, complementing Concrete's core operations.",
    link: "https://x.com/ConcreteXYZ",
  },
  {
    date: "Jun 2025",
    tag: "Funding",
    title: "$9.5M strategic round led by Polychain Capital",
    body: "Blueprint Finance raises $9.5M to scale Concrete's infrastructure and drive institutional adoption. Polychain Capital leads, joined by YZi Labs (formerly Binance Labs), VanEck and a long list of funds and angels.",
    link: "https://paragraph.com/@concretexyz/building-the-future-of-institutional-defi-blueprint-finance-raises-9-5m",
  },
  {
    date: "2025",
    tag: "Product",
    title: "WBTC Vault launches with BiT Global",
    body: "Concrete and BiT Global launch a WBTC Vault, aimed at maximizing yield on tokenized Bitcoin while keeping the same custody and transparency standards as WBTC itself.",
    link: "https://paragraph.com/@concretexyz/introducing-the-wbtc-vault-unlocking-institutional-yield-for-bitcoin-in-defi",
  },
  {
    date: "Nov 27, 2025",
    tag: "Community",
    title: "Points Farming (Bags) campaign goes live",
    body: "Concrete launches its community rewards program, letting users complete tasks and farm 'Bags' that are described as converting into Concrete Points over time.",
    link: "https://points.concrete.xyz",
  },
  {
    date: "2026",
    tag: "Product",
    title: "USD1 RWA Vault unifies real-world-asset yield",
    body: "Concrete introduces the USD1 RWA Vault, giving USD1 holders one deposit that spans private credit, RWA and digital-infrastructure yield sources including ZIG Markets, Qiro, Colb and Origin Assets.",
    link: "https://x.com/ConcreteXYZ",
  },
  {
    date: "2026",
    tag: "Product",
    title: "AssetCX and concUSD extend the ecosystem",
    body: "Concrete unveils AssetCX, pairing vault infrastructure with qualified custodians like BitGo to make custodied assets productive, alongside concUSD as a further new on-chain primitive.",
    link: "https://x.com/ConcreteXYZ",
  },
  {
    date: "2026",
    tag: "Rebrand",
    title: "Concrete Earn: same vaults, refreshed experience",
    body: "Concrete's core deposit product is rebranded and redesigned as Concrete Earn at app.concrete.xyz/earn — the underlying vault infrastructure is unchanged.",
    link: "https://app.concrete.xyz/earn",
  },
  {
    date: "Aug 19, 2026",
    tag: "Funding",
    title: "Second strategic round, again led by Polychain Capital",
    body: "Blueprint Finance completes another strategic round to scale Concrete's institutional infrastructure. This time Polychain is joined by Bullish, Keyrock, BitGo, FalconX, G-20, Flowdesk, JPEG Trading, Sentient Capital, Andes and 2Square. The amount raised was not disclosed.",
    link: "https://concrete.xyz",
  },
];

function renderTimeline() {
  const container = document.getElementById("timeline-list");
  if (!container || container.childElementCount > 0) return;
  container.innerHTML = "";
  TIMELINE_EVENTS.forEach((ev) => {
    const row = document.createElement("a");
    row.className = "timeline-item";
    row.href = ev.link;
    row.target = "_blank";
    row.rel = "noopener noreferrer";
    row.innerHTML = `
      <div class="timeline-date">${ev.date}</div>
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-body">
        <div class="timeline-tag">${ev.tag}</div>
        <div class="timeline-title">${ev.title}</div>
        <p class="timeline-desc">${ev.body}</p>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ============ Live feed from Concrete's own official blog ============ */
/* Replaces the old Google News search. This pulls Concrete's actual
   published posts (funding announcements, product launches) straight
   from its own Paragraph blog, so every headline here is first-party —
   no keyword-search noise, no unrelated "concrete" (the building
   material) results. It still needs a relay for the same reason the old
   feature did: the source doesn't send CORS headers a browser accepts. */

const OFFICIAL_BLOG_RSS_URL = "https://paragraph.com/api/blogs/rss/%40concretexyz";

const FEED_PROXIES = [
  (url) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(url),
  (url) => "https://corsproxy.io/?url=" + encodeURIComponent(url),
];

let newsAutoRefreshTimer = null;
const NEWS_AUTO_REFRESH_MS = 10 * 60 * 1000; // 10 minutes — an official blog posts far less often than a news search

function startNewsAutoRefresh() {
  stopNewsAutoRefresh();
  newsAutoRefreshTimer = setInterval(() => fetchNews(), NEWS_AUTO_REFRESH_MS);
}

function stopNewsAutoRefresh() {
  if (newsAutoRefreshTimer) {
    clearInterval(newsAutoRefreshTimer);
    newsAutoRefreshTimer = null;
  }
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return mins + (mins === 1 ? " min ago" : " mins ago");
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + (hours === 1 ? " hour ago" : " hours ago");
  const days = Math.floor(hours / 24);
  if (days < 30) return days + (days === 1 ? " day ago" : " days ago");
  const months = Math.floor(days / 30);
  return months + (months === 1 ? " month ago" : " months ago");
}

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return (tmp.textContent || tmp.innerText || "").trim();
}

function parseNewsXml(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  if (doc.querySelector("parsererror")) throw new Error("Could not parse feed");

  // RSS 2.0 <item> form (most blog/news feeds, including Paragraph's).
  const rssItems = Array.from(doc.querySelectorAll("item")).map((item) => {
    const rawTitle = item.querySelector("title")?.textContent || "Untitled";
    const link = item.querySelector("link")?.textContent || "#";
    const pubDateText = item.querySelector("pubDate")?.textContent;
    const descRaw =
      item.getElementsByTagName("content:encoded")[0]?.textContent ||
      item.querySelector("description")?.textContent ||
      "";
    return {
      title: rawTitle,
      link,
      summary: stripHtml(descRaw).slice(0, 160),
      date: pubDateText ? new Date(pubDateText) : null,
    };
  });

  // Atom <entry> fallback, in case the source ever serves Atom instead.
  const atomItems = Array.from(doc.querySelectorAll("entry")).map((entry) => {
    const title = entry.querySelector("title")?.textContent || "Untitled";
    const linkEl = entry.querySelector("link");
    const link = linkEl?.getAttribute("href") || linkEl?.textContent || "#";
    const dateText = entry.querySelector("published")?.textContent || entry.querySelector("updated")?.textContent;
    const summaryRaw = entry.querySelector("summary")?.textContent || entry.querySelector("content")?.textContent || "";
    return { title, link, summary: stripHtml(summaryRaw).slice(0, 160), date: dateText ? new Date(dateText) : null };
  });

  const items = rssItems.length ? rssItems : atomItems;
  return items.filter((i) => i.date && !Number.isNaN(i.date.getTime()));
}

async function fetchViaProxies(targetUrl) {
  let lastError = null;
  for (const buildProxyUrl of FEED_PROXIES) {
    try {
      const res = await fetch(buildProxyUrl(targetUrl));
      if (!res.ok) throw new Error("Relay returned " + res.status);
      const text = await res.text();
      if (!text || text.length < 50) throw new Error("Empty relay response");
      return text;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("All relays failed");
}

async function fetchNews() {
  const statusEl = document.getElementById("news-status");
  statusEl.textContent = "Fetching latest posts from Concrete's official blog…";
  statusEl.className = "live-status";

  try {
    const xmlText = await fetchViaProxies(OFFICIAL_BLOG_RSS_URL);
    const items = parseNewsXml(xmlText)
      .sort((a, b) => b.date - a.date)
      .slice(0, 15);

    renderNews(items);

    statusEl.textContent = items.length
      ? "Live from Concrete's official blog"
      : "Connected, but no posts came back";
    statusEl.className = "live-status is-ok";
    document.getElementById("news-updated").textContent = "Last checked " + new Date().toLocaleTimeString();
  } catch (err) {
    statusEl.textContent =
      "Couldn't reach the official blog feed right now — try refresh, or open the blog directly below.";
    statusEl.className = "live-status is-error";
  }
}

function renderNews(items) {
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = '<div class="news-empty">No posts came back from the feed just now — try refresh, or open the blog link below.</div>';
    return;
  }

  items.forEach((item) => {
    const a = document.createElement("a");
    a.className = "news-item";
    a.href = item.link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <div class="news-item-meta">
        <span>Official blog</span>
        <span>·</span>
        <span>${timeAgo(item.date)}</span>
      </div>
      <div class="news-item-title">${item.title}</div>
      ${item.summary ? `<div class="news-item-summary">${item.summary}</div>` : ""}
    `;
    list.appendChild(a);
  });
}

document.getElementById("news-refresh-btn")?.addEventListener("click", () => fetchNews());

/* ============ Init ============ */

renderHeroTier();
fetchLiveData(true);
