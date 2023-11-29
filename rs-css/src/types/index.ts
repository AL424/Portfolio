export interface Level {
  number: number;
  description: string;
  code: string;
  stringsCode: string[];
  elNum: string[];
  target: string;
}

export interface LevelsStatus {
  completed: boolean;
  help: boolean;
}

export type addSymbol = (i: number) => void;
