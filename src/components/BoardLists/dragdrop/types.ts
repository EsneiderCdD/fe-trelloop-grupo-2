// types.ts
export interface Card {
  id: number;
  title: string;
  description?: string;
  tags?: Array<{ name: string }>;
  assignees?: Array<{ avatar_url: string; name: string }>;
  priority?: string;
}

export interface List {
  id: number;
  name: string;
  cards: Card[];
}
