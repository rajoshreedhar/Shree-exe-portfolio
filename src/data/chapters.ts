export type ShreePose =
  | "idle"
  | "wave"
  | "happy"
  | "thinking"
  | "coding"
  | "headphones"
  | "reading"
  | "celebrate"
  | "goodbye";

export interface ChapterMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  pose: ShreePose;
  shreeHint: string;
  altDialogue: string[];
  theme: "porcelain" | "ink" | "tinted";
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "title-screen",
    number: "00",
    title: "The title screen",
    subtitle: "Identity & first impression",
    purpose: "Identity, introduction and first impression",
    pose: "wave",
    shreeHint: "Hi! I'm Shree. Welcome to my little corner of the internet.",
    altDialogue: [
      "Tap me anytime if you want a shortcut to Projects, About, or Contact.",
      "No forced tutorials here — scroll naturally or ask me to guide you.",
      "Fun fact: there are 3 tiny pixel collectibles tucked around this world.",
    ],
    theme: "porcelain",
  },
  {
    id: "the-player",
    number: "01",
    title: "The player",
    subtitle: "About Rajoshree",
    purpose: "Personal story and how Rajoshree thinks",
    pose: "thinking",
    shreeHint: "A few interests. A few rabbit holes. Quite a lot of curiosity.",
    altDialogue: [
      "I like understanding why systems behave the way they do — code and people alike.",
      "Click the little margin notes if you want behind-the-scenes commentary.",
    ],
    theme: "tinted",
  },
  {
    id: "the-inventory",
    number: "02",
    title: "The inventory",
    subtitle: "Skills & tools",
    purpose: "Skills, tools and current learning",
    pose: "coding",
    shreeHint: "These are the tools in my inventory. Still collecting.",
    altDialogue: [
      "No fake 87% skill bars here — just honest notes on what I've used and what I'm learning.",
      "Select any item to inspect where it showed up in real work or coursework.",
    ],
    theme: "porcelain",
  },
  {
    id: "the-laboratory",
    number: "03",
    title: "The laboratory",
    subtitle: "Technical interests & experiments",
    purpose: "AI/ML, data, software and research interests",
    pose: "thinking",
    shreeHint: "Warning: may contain experiments and too many open tabs.",
    altDialogue: [
      "Every lab note clearly separates what's Built from what I'm Exploring or Investigating.",
      "Expand a dossier to read the hypothesis, method, and next step.",
    ],
    theme: "ink",
  },
  {
    id: "the-quests",
    number: "04",
    title: "The quests",
    subtitle: "Selected projects & case studies",
    purpose: "Selected projects and technical case studies",
    pose: "coding",
    shreeHint: "Let's look at what I've been building.",
    altDialogue: [
      "Open any full case study to read the architecture, trade-offs, and honest lessons learned.",
      "SKYTXT is a great place to start if you want to see practical problem-solving.",
    ],
    theme: "porcelain",
  },
  {
    id: "the-soundtrack",
    number: "05",
    title: "The soundtrack",
    subtitle: "Music & atmosphere",
    purpose: "Music, artists and cultural interests",
    pose: "headphones",
    shreeHint: "The playlist is part of the process. Obviously.",
    altDialogue: [
      "Audio is strictly opt-in — I respect your browser tabs and your speakers.",
      "Good headphones + clean code + iced coffee is an undefeated trio.",
    ],
    theme: "tinted",
  },
  {
    id: "the-side-quests",
    number: "06",
    title: "The side quests",
    subtitle: "Curiosities & scrapbook",
    purpose: "Fashion, mysteries, films, coffee and other interests",
    pose: "reading",
    shreeHint: "Optional lore: fashion, mysteries, cinema, and slow mornings.",
    altDialogue: [
      "Everything here is optional — browse the tabs that catch your eye.",
      "Have you spotted the tiny espresso cup collectible hiding around here?",
    ],
    theme: "porcelain",
  },
  {
    id: "the-next-level",
    number: "07",
    title: "The next level",
    subtitle: "Aspirations & contact",
    purpose: "Aspirations, collaboration and contact",
    pose: "goodbye",
    shreeHint: "You made it to the final level. Shall we talk?",
    altDialogue: [
      "LinkedIn and GitHub are right here — always happy to chat about interesting ideas.",
      "Thanks for exploring my world. See you on the next quest!",
    ],
    theme: "ink",
  },
];
