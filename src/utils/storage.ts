import { GameState } from '../types';

export const STORAGE_KEY = 'kalam_archive_chapter3_save_v1';

export const INITIAL_GAME_STATE: GameState = {
  currentScreen: 'main_menu',
  currentStage: 'discover',
  currentObjective: 'Investigate the Archive Desk',
  objectiveInstruction: 'Explore the room and inspect documents, blueprints, and records on Dr. Kalam’s desk.',
  inspectedObjectIds: [],
  collectedEvidenceIds: [],
  solvedPuzzleIds: [],
  puzzleStates: {
    timeline: {
      solved: false,
      order: ['tl-1972', 'tl-1962', 'tl-1980', 'tl-1969', 'tl-1979'],
      hintsRevealed: 0
    },
    telemetry: { solved: false, answer: '', hintsRevealed: 0 },
    missingWord: { solved: false, answer: '', hintsRevealed: 0 },
    diagram: {
      solved: false,
      order: ['seq-3', 'seq-1', 'seq-5', 'seq-2', 'seq-6', 'seq-4'],
      hintsRevealed: 0
    }
  },
  connectionAttempts: [],
  verifiedConnections: [],
  understandState: {
    factsVerified: false,
    reasoningAnswers: {},
    reasoningComplete: false,
    chosenReflection: null
  },
  audioClueDiscovered: false,
  chapterCompleted: false,
  assignedEnding: null,
  settings: {
    soundEnabled: true,
    textSize: 'standard',
    reducedMotion: false
  },
  saveVersion: 2,
  lastUpdated: new Date().toISOString()
};

export function loadSavedGame(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.saveVersion === 2 && parsed.puzzleStates && parsed.puzzleStates.diagram) {
      return parsed as GameState;
    }
  } catch (err) {
    console.error('Failed to load saved state from localStorage:', err);
  }
  return null;
}

export function saveGame(state: GameState): boolean {
  try {
    const toSave: GameState = {
      ...state,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch (err) {
    console.error('Failed to persist state to localStorage:', err);
    return false;
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear saved state:', err);
  }
}
