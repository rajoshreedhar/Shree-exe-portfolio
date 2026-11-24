export type LabStatus = "Built" | "Exploring" | "Investigating" | "In progress";

export interface LabNote {
  id: string;
  code: string;
  domain: string;
  title: string;
  status: LabStatus;
  preview: string;
  question: string;
  hypothesis: string;
  method: string;
  nextStep: string;
  diagramType: "neural" | "data" | "quantum" | "software";
}

export const LAB_NOTES: LabNote[] = [
  {
    id: "ai-ml-eval",
    code: "LAB-01",
    domain: "AI & Machine Learning",
    title: "Small Models, Honest Evaluation",
    status: "Investigating",
    preview:
      "Understanding where compact classical and neural models shine — and exactly how they fail under distribution shift.",
    question:
      "How do simple feature representations compare against deeper architectures when datasets are small or noisy?",
    hypothesis:
      "Careful error-slice inspection and clean baselines often outperform hasty model complexity on real-world tabular and text tasks.",
    method:
      "Running controlled Scikit-learn and PyTorch comparison notebooks with fixed splits, calibration checks, and qualitative failure logs.",
    nextStep:
      "Publish a clean comparative walkthrough on GitHub with reproducible scripts and visual error breakdowns.",
    diagramType: "neural",
  },
  {
    id: "data-storytelling",
    code: "LAB-02",
    domain: "Data Science & Analytics",
    title: "Readable Signals in Messy Tables",
    status: "Built",
    preview:
      "Turning raw multi-column CSVs into concise visual narratives where outliers and uncertainty remain visible.",
    question:
      "How can exploratory notebooks communicate both statistical rigor and human intuition without chart clutter?",
    hypothesis:
      "Combining disciplined data-cleaning checklists with minimal editorial visual hierarchy makes insights faster to verify.",
    method:
      "Python, Pandas, and SQL exploratory pipelines paired with custom summary checks for missingness and skew.",
    nextStep:
      "Expand reusable plotting templates that work smoothly across both notebooks and web case studies.",
    diagramType: "data",
  },
  {
    id: "software-craft",
    code: "LAB-03",
    domain: "Software Engineering",
    title: "Calm, Low-Friction Web Interfaces",
    status: "In progress",
    preview:
      "Designing interactive software that feels unmistakably playful while staying keyboard-accessible, fast, and respectful of user attention.",
    question:
      "Can game-inspired character interactions coexist with luxury editorial clarity without hurting usability?",
    hypothesis:
      "When editorial grids hold the structure and pixel elements stay purposeful, personality elevates comprehension instead of distracting from it.",
    method:
      "Building reusable React/TypeScript primitives, testing reduced-motion paths, and validating layouts down to 320px viewports.",
    nextStep:
      "Continue refining SKYTXT and interactive component patterns with real user feedback.",
    diagramType: "software",
  },
  {
    id: "quantum-curiosity",
    code: "LAB-04",
    domain: "Quantum Computing & Emerging Tech",
    title: "Circuit Intuition & Superposition Notes",
    status: "Exploring",
    preview:
      "A beginner-honest deep dive into qubits, gate matrices, interference, and what quantum algorithms actually change.",
    question:
      "How can linear-algebra mechanics of small 2–3 qubit circuits be visualized intuitively for software engineers?",
    hypothesis:
      "Mapping gate operations step-by-step alongside amplitude probabilities builds far stronger intuition than high-level buzzwords.",
    method:
      "Structured self-study notes, matrix exercises, and small visual circuit diagrams.",
    nextStep:
      "Build an interactive 2-qubit state explorer once the foundational notes are solid.",
    diagramType: "quantum",
  },
];

export interface TrackItem {
  id: string;
  number: string;
  title: string;
  artist: string;
  mood: string;
  note: string;
  duration: string;
  searchUrl: string;
  chordHz: number[];
}

export const SOUNDTRACK_TRACKS: TrackItem[] = [
  {
    id: "track-01",
    number: "01",
    title: "Midnight Tab Marathon",
    artist: "BTS — Mikrokosmos / Magic Shop vibe",
    mood: "Late-Night Coding",
    note: "Warm synth comfort and big chorus energy for when a stubborn bug finally surrenders at 1:14 AM.",
    duration: "03:46",
    searchUrl: "https://open.spotify.com/search/BTS%20Mikrokosmos",
    chordHz: [261.63, 329.63, 392.0, 493.88],
  },
  {
    id: "track-02",
    number: "02",
    title: "Editorial Storytelling",
    artist: "Taylor Swift — folklore / Midnights mood",
    mood: "Deep Thinking & Writing",
    note: "Sharp lyricism and atmospheric production — ideal for drafting case studies, lab notes, and clean architecture.",
    duration: "04:12",
    searchUrl: "https://open.spotify.com/search/Taylor%20Swift%20folklore",
    chordHz: [220.0, 261.63, 329.63, 392.0],
  },
  {
    id: "track-03",
    number: "03",
    title: "Espresso & High-Tempo Polish",
    artist: "Sabrina Carpenter — Short n' Sweet era",
    mood: "UI Polish & Momentum",
    note: "Crisp, witty, high-confidence pop energy for refactoring CSS grids and shipping visual details.",
    duration: "02:55",
    searchUrl: "https://open.spotify.com/search/Sabrina%20Carpenter%20Espresso",
    chordHz: [293.66, 369.99, 440.0, 554.37],
  },
  {
    id: "track-04",
    number: "04",
    title: "Rain on the Study Window",
    artist: "K-Pop B-Sides & Lo-Fi Instrumentals",
    mood: "Slow Morning Research",
    note: "Soft Rhodes keys and steady beats for reading technical papers and opening five too many browser tabs.",
    duration: "03:28",
    searchUrl: "https://open.spotify.com/search/lofi%20coding%20study%20beats",
    chordHz: [246.94, 293.66, 369.99, 440.0],
  },
];

export interface SideQuestItem {
  id: string;
  category: "Fashion & Design" | "Mysteries & Puzzles" | "Cinema & Pop Culture" | "Coffee & Rituals";
  label: string;
  title: string;
  note: string;
  pixelMotif: "ribbon" | "magnifier" | "clapper" | "coffee" | "sparkle" | "notebook";
  detail: string;
}

export const SIDE_QUESTS: SideQuestItem[] = [
  {
    id: "sq-fashion",
    category: "Fashion & Design",
    label: "AESTHETIC LENS",
    title: "Editorial Silhouettes & Intentional Colour",
    note: "Why typography, garments, and good interfaces follow the exact same rules: proportion, contrast, and knowing what to leave out.",
    pixelMotif: "ribbon",
    detail: "Favourite palette discipline: warm porcelain neutrals grounded by ink and a single burgundy accent.",
  },
  {
    id: "sq-mystery",
    category: "Mysteries & Puzzles",
    label: "DETECTIVE MODE",
    title: "Mysteries, Investigations & Deduction",
    note: "Drawn to layered mysteries and true-crime documentaries for the exact same reason I enjoy debugging: following small clues until the system clicks.",
    pixelMotif: "magnifier",
    detail: "Bonus joy: spotting a subtle plot clue twenty minutes before the reveal.",
  },
  {
    id: "sq-cinema",
    category: "Cinema & Pop Culture",
    label: "SCREEN ARCHIVE",
    title: "Sci-Fi Worlds, Sharp Sitcoms & Rom-Coms",
    note: "Equally happy analyzing speculative sci-fi futures, Euphoria's cinematography, comfort sitcom dialogue, and unapologetically good rom-coms.",
    pixelMotif: "clapper",
    detail: "Good worldbuilding makes you remember the lighting long after the credits roll.",
  },
  {
    id: "sq-music-culture",
    category: "Cinema & Pop Culture",
    label: "POP CHRONICLES",
    title: "BTS, K-Pop Craft & Pop Storytellers",
    note: "Deep appreciation for artists who build entire visual eras, hidden lore, and sonic detail — from BTS and K-pop choreography to Taylor Swift and Sabrina Carpenter.",
    pixelMotif: "sparkle",
    detail: "Yes, this portfolio's chapter concept borrows a little bit of album-era storytelling.",
  },
  {
    id: "sq-coffee",
    category: "Coffee & Rituals",
    label: "DAILY FUEL",
    title: "Coffee, Movement & Slow Mornings",
    note: "Best ideas rarely happen at peak chaos — they happen after an iced coffee, a good workout, or ten quiet minutes with a notebook.",
    pixelMotif: "coffee",
    detail: "Current running hypothesis: questionable coffee decisions still lead to solid prototypes.",
  },
  {
    id: "sq-notebooks",
    category: "Mysteries & Puzzles",
    label: "RABBIT HOLES",
    title: "Unreasonable Curiosity Logs",
    note: "Starting the evening researching one Python library and somehow ending up reading about color theory, vintage OS windows, and quantum gates.",
    pixelMotif: "notebook",
    detail: "Every tangent eventually loops back into a better design or engineering insight.",
  },
];

export interface CollectibleMeta {
  id: "star" | "coffee" | "heart";
  name: string;
  chapterHint: string;
  discoveryNote: string;
}

export const COLLECTIBLES: CollectibleMeta[] = [
  {
    id: "star",
    name: "Shree's Pixel Star",
    chapterHint: "Chapter 01 — The Player",
    discoveryNote: "You spotted Shree's signature star! Curiosity level increased (+1).",
  },
  {
    id: "coffee",
    name: "Questionable Espresso",
    chapterHint: "Chapter 06 — The Side Quests",
    discoveryNote: "Iced coffee acquired! CSS alignment clarity temporarily boosted.",
  },
  {
    id: "heart",
    name: "Porcelain Pixel Heart",
    chapterHint: "Chapter 07 — The Next Level",
    discoveryNote: "Final collectible found! Thank you for exploring every corner of Shree.exe.",
  },
];
