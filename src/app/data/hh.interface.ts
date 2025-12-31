export interface HhInstitution {
  id: string;
  text: string;
  synonyms: string;
}

export interface HhPosition {
  id: string;
  text: string;
}

export interface HhSuggestResponse<T> {
  items: T[];
}
