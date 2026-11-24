import type { InteractionDefinition } from "@/game/types/interaction";

export const ARRIVAL_INTERACTIONS: readonly InteractionDefinition[] = [
  {
    id: "island-sign",
    label: "Wooden signboard",
    prompt: "Read the sign",
    kind: "dialogue",
    dialogueId: "arrivalSign",
  },
  {
    id: "tiny-parcel",
    label: "Tiny parcel",
    prompt: "Inspect the parcel",
    kind: "collectible",
    dialogueId: "tinyParcel",
    postDiscoveryDialogueId: "tinyParcelOpened",
    discoveryTitle: "First Discovery",
    discoveryNote: "Found the untied parcel note in Arrival Cove.",
  },
  {
    id: "noticeboard",
    label: "Island noticeboard",
    prompt: "Check the noticeboard",
    kind: "information",
    dialogueId: "noticeboard",
    actionLink: {
      label: "Open Projects in Quick Portfolio",
      href: "/portfolio#the-quests",
    },
  },
  {
    id: "npc-shree",
    label: "Shree.exe",
    prompt: "Talk to Shree.exe",
    kind: "npc",
    dialogueId: "firstGreeting",
  },
];

export function getInteractionById(
  id: string
): InteractionDefinition | undefined {
  return ARRIVAL_INTERACTIONS.find((item) => item.id === id);
}
