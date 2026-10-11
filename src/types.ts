export type Screen = 
  | 'main_menu'
  | 'intro'
  | 'archive'
  | 'puzzles'
  | 'connect'
  | 'understand'
  | 'unlock';

export type Stage = 'discover' | 'decode' | 'connect' | 'understand' | 'unlock';

export type EvidenceCategory = 'document' | 'photograph' | 'technical' | 'collectible';

export interface EvidenceItem {
  id: string;
  title: string;
  category: EvidenceCategory;
  assetUrl: string;
  date?: string;
  shortDesc: string;
  fullTranscription: string;
  historicalContext: string;
  clues: string[];
  isMandatory: boolean;
  collected: boolean;
  inspected: boolean;
  sourceAttribution: string;
  // Visual placement in 2.5D desk scene (percentages)
  deskPosition: {
    top: number; // percentage
    left: number; // percentage
    width: number; // px or %
    rotate: number; // deg
  };
}

export interface TimelineEvent {
  id: string;
  year: string;
  eraTag?: string;
  title: string;
  description: string;
  correctIndex: number;
  imageUrl?: string;
}

export interface LaunchStage {
  id: string;
  stepNumber: number;
  name: string;
  description: string;
}

export interface ConnectionNode {
  id: string;
  category: 'cause' | 'outcome' | 'event' | 'lesson';
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ConnectionLink {
  fromId: string;
  toId: string;
}

export interface ConnectionRule {
  fromId: string;
  toId: string;
  explanation: string;
}

export interface FactInterpretationItem {
  id: string;
  statement: string;
  type: 'fact' | 'interpretation';
  explanation: string;
}

export interface ReasoningQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export type EndingType = 'true_seeker' | 'dream_believer' | 'ignited_mind';

export interface EndingDetails {
  type: EndingType;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  criteria: string;
}

export interface UserSettings {
  soundEnabled: boolean;
  textSize: 'standard' | 'large' | 'xlarge';
  reducedMotion: boolean;
}

export interface GameState {
  currentScreen: Screen;
  currentStage: Stage;
  currentObjective: string;
  objectiveInstruction: string;
  inspectedObjectIds: string[];
  collectedEvidenceIds: string[];
  solvedPuzzleIds: string[];
  puzzleStates: {
    timeline: { solved: boolean; order: string[]; hintsRevealed: number };
    telemetry: { solved: boolean; answer: string; hintsRevealed: number };
    missingWord: { solved: boolean; answer: string; hintsRevealed: number };
    diagram: { solved: boolean; order: string[]; hintsRevealed: number };
  };
  connectionAttempts: ConnectionLink[];
  verifiedConnections: ConnectionLink[];
  understandState: {
    factsVerified: boolean;
    reasoningAnswers: Record<string, string>; // questionId -> optionId
    reasoningComplete: boolean;
    chosenReflection: EndingType | null;
  };
  audioClueDiscovered: boolean;
  chapterCompleted: boolean;
  assignedEnding: EndingType | null;
  settings: UserSettings;
  saveVersion: number;
  lastUpdated: string;
}
