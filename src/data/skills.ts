export type SkillCategory = "Programming" | "Data" | "ML / AI" | "Web" | "Tools";
export type SkillStatus = "Used" | "Learning" | "Exploring";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  shortNote: string;
  context: string;
  whereUsed: string;
  iconGlyph: string;
}

export const SKILL_CATEGORIES: ("All" | SkillCategory)[] = [
  "All",
  "Programming",
  "Data",
  "ML / AI",
  "Web",
  "Tools",
];

export const SKILLS: SkillItem[] = [
  {
    id: "python",
    name: "Python",
    category: "Programming",
    status: "Used",
    shortNote: "Primary language for data workflows, scripting, and ML prototypes.",
    context:
      "My default tool when I want to test an idea quickly, clean messy datasets, or build backend logic without unnecessary ceremony.",
    whereUsed: "Data analysis notebooks, ML experiments, SKYTXT backend prototypes",
    iconGlyph: "PY",
  },
  {
    id: "typescript",
    name: "TypeScript & JS",
    category: "Programming",
    status: "Used",
    shortNote: "Interactive interfaces, type-safe UI architecture, and web tooling.",
    context:
      "Used to keep UI state predictable and catch structural mistakes early while building expressive web experiences.",
    whereUsed: "Shree.exe portfolio, interactive web interfaces, component systems",
    iconGlyph: "TS",
  },
  {
    id: "sql",
    name: "SQL",
    category: "Data",
    status: "Used",
    shortNote: "Structured querying, joins, aggregations, and schema design.",
    context:
      "Essential for turning raw relational tables into clear answers before any model or dashboard ever gets built.",
    whereUsed: "Coursework datasets, exploratory analytics projects",
    iconGlyph: "DB",
  },
  {
    id: "pandas-numpy",
    name: "Pandas & NumPy",
    category: "Data",
    status: "Used",
    shortNote: "Data wrangling, feature engineering, and numerical exploration.",
    context:
      "Where most real data work happens: inspecting missing values, validating assumptions, and shaping clean inputs.",
    whereUsed: "Exploratory notebooks, tabular modeling experiments",
    iconGlyph: "DF",
  },
  {
    id: "data-viz",
    name: "Data Visualization",
    category: "Data",
    status: "Used",
    shortNote: "Clear charts and editorial diagrams that actually explain something.",
    context:
      "Focused on legibility, honest scales, and pairing quantitative findings with concise narrative explanations.",
    whereUsed: "Matplotlib/Seaborn analysis notebooks & interactive SVG charts",
    iconGlyph: "VZ",
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    category: "ML / AI",
    status: "Used",
    shortNote: "Classical ML baselines, cross-validation, and evaluation pipelines.",
    context:
      "I always start with interpretable baselines and honest train/validation splits before reaching for heavier architectures.",
    whereUsed: "Supervised learning coursework & comparative model studies",
    iconGlyph: "ML",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ML / AI",
    status: "Learning",
    shortNote: "Neural network fundamentals, training loops, and custom modules.",
    context:
      "Actively building intuition around autograd, optimization behaviour, and small reproducible experiments.",
    whereUsed: "Laboratory deep-learning study notes & prototype architectures",
    iconGlyph: "PT",
  },
  {
    id: "llm-systems",
    name: "Applied AI & Retrieval",
    category: "ML / AI",
    status: "Learning",
    shortNote: "Structured prompting, evaluation loops, and grounded retrieval.",
    context:
      "Exploring how to make language-model applications reliable, verifiable, and useful rather than flashy demos.",
    whereUsed: "Personal tooling prototypes & evaluation experiments",
    iconGlyph: "AI",
  },
  {
    id: "react-nextjs",
    name: "React & Next.js",
    category: "Web",
    status: "Used",
    shortNote: "Component-driven interfaces, App Router, and accessible semantics.",
    context:
      "My favourite canvas for blending editorial typography, structured layouts, and purposeful micro-interactions.",
    whereUsed: "Shree.exe portfolio, SKYTXT web interface, creative prototypes",
    iconGlyph: "NX",
  },
  {
    id: "tailwind-css",
    name: "Tailwind & Modern CSS",
    category: "Web",
    status: "Used",
    shortNote: "Design tokens, responsive grids, stepped pixel motion, accessibility.",
    context:
      "Used carefully to maintain consistent spacing, contrast, and reduced-motion respect across desktop and mobile.",
    whereUsed: "Design systems, responsive layouts, custom sprite animation",
    iconGlyph: "CS",
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "Tools",
    status: "Used",
    shortNote: "Version control, clean commit histories, and collaborative workflows.",
    context:
      "Keeps experiments reproducible and makes iterating with teammates calm instead of chaotic.",
    whereUsed: "All repositories at github.com/rajoshreedhar",
    iconGlyph: "GT",
  },
  {
    id: "quantum-foundations",
    name: "Quantum Computing",
    category: "ML / AI",
    status: "Exploring",
    shortNote: "Qubits, basic quantum gates, and circuit simulation concepts.",
    context:
      "An active curiosity rabbit hole — studying linear algebra foundations and beginner circuit simulators with an open notebook.",
    whereUsed: "Laboratory reading notes & conceptual circuit diagrams",
    iconGlyph: "Q0",
  },
];

export const CURRENTLY_LEARNING = [
  {
    topic: "Reproducible ML Evaluation",
    status: "Learning" as SkillStatus,
    note: "Designing cleaner validation splits, error slices, and failure analysis habits.",
  },
  {
    topic: "Systems & API Resilience",
    status: "Learning" as SkillStatus,
    note: "Writing defensive, low-bandwidth-friendly software that degrades gracefully.",
  },
  {
    topic: "Quantum Circuit Intuition",
    status: "Exploring" as SkillStatus,
    note: "Mapping statevectors, interference, and beginner Qiskit/conceptual exercises.",
  },
  {
    topic: "Editorial Motion Craft",
    status: "Exploring" as SkillStatus,
    note: "Using minimal CSS transforms and choreography that clarify instead of distract.",
  },
];
