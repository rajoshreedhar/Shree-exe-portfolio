export type InteractionKind = "dialogue" | "collectible" | "information" | "npc";

export type InteractionActionLink = {
  label: string;
  href: string;
};

export type InteractionDefinition = {
  id: string;
  label: string;
  prompt: string;
  kind: InteractionKind;
  dialogueId: string;
  postDiscoveryDialogueId?: string;
  discoveryTitle?: string;
  discoveryNote?: string;
  actionLink?: InteractionActionLink;
};

export type ActivePrompt = {
  id: string;
  label: string;
  prompt: string;
  kind: InteractionKind;
};
