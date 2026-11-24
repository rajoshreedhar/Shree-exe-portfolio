export type DialogueLine = {
  speaker: string;
  text: string;
};

export const DIALOGUE = {
  welcomeArrival: [
    {
      speaker: "Arrival Cove",
      text: "Morning light settles over the little pier. The tide is quiet, and the path ahead leads into the cove.",
    },
    {
      speaker: "Shree.exe",
      text: "Move with WASD or arrow keys (or the touch pad), and press E when something catches your eye.",
    },
  ],
  arrivalSign: [
    {
      speaker: "Wooden Signboard",
      text: "THE LITTLE ISLAND — A small place for projects, experiments, curious thoughts, and the occasional questionable decision.",
    },
    {
      speaker: "Wooden Signboard",
      text: "Take a look around. There is no rush.",
    },
  ],
  tinyParcel: [
    {
      speaker: "Tiny Parcel",
      text: "A tiny parcel. No return address.",
    },
    {
      speaker: "Parcel Note",
      text: "It contains a little note: “Every interesting thing starts with being curious.”",
    },
  ],
  tinyParcelOpened: [
    {
      speaker: "Tiny Parcel",
      text: "The little parcel is already untied. The note inside still reads: “Every interesting thing starts with being curious.”",
    },
  ],
  noticeboard: [
    {
      speaker: "Island Noticeboard",
      text: "A little noticeboard full of things in progress: code, data, experiments, and ideas that may or may not behave on the first try.",
    },
    {
      speaker: "Island Noticeboard",
      text: "Pinned notes point toward SKYTXT, the Shree.exe Digital World, and the Curiosity & ML Study Ledger.",
    },
  ],
  firstGreeting: [
    { speaker: "Shree.exe", text: "OH. A visitor." },
    {
      speaker: "Shree.exe",
      text: "Welcome to my extremely well-organized island.",
    },
    {
      speaker: "Shree.exe",
      text: "Please ignore the chaos. It is part of the atmosphere.",
    },
    {
      speaker: "Shree.exe",
      text: "You can wander around, inspect things, or head straight to the portfolio.",
    },
    {
      speaker: "Shree.exe",
      text: "No pressure. The island is not going anywhere.",
    },
  ],
} satisfies Record<string, DialogueLine[]>;

export type DialogueId = keyof typeof DIALOGUE;

export function getDialogueLines(id: string): DialogueLine[] {
  if (id in DIALOGUE) {
    return DIALOGUE[id as DialogueId];
  }
  return [
    {
      speaker: "The Little Island",
      text: "A quiet corner of Arrival Cove.",
    },
  ];
}
