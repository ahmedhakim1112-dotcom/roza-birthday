export type MemoryItem = {
  id: number;
  title: string;
  date: string;
  text: string;
  image: string;
};

export type LetterItem = {
  id: number;
  title: string;
  text: string;
};

export type BirthdayData = {
  personName: string;
  heroTitle: string;
  heroSubtitle: string;
  mainPhoto: string;
  memories: MemoryItem[];
  letters: LetterItem[];
};