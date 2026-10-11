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
      order: ['stage-liftoff', 'stage-check', 'stage-insertion', 'stage-ignition', 'stage-fueling', 'stage-separation'],
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

/**
 * Checks whether a game state represents genuine, active player progress
 * rather than a fresh unstarted application state.
 */
export function hasMeaningfulProgress(state: GameState | null | undefined): boolean {
  if (!state) return false;
  if (state.currentScreen && state.currentScreen !== 'main_menu') return true;
  if (state.collectedEvidenceIds && state.collectedEvidenceIds.length > 0) return true;
  if (state.inspectedObjectIds && state.inspectedObjectIds.length > 0) return true;
  if (state.solvedPuzzleIds && state.solvedPuzzleIds.length > 0) return true;
  if (state.puzzleStates) {
    if (state.puzzleStates.timeline?.solved) return true;
    if (state.puzzleStates.telemetry?.solved) return true;
    if (state.puzzleStates.missingWord?.solved) return true;
    if (state.puzzleStates.diagram?.solved) return true;
  }
  if (state.verifiedConnections && state.verifiedConnections.length > 0) return true;
  if (state.understandState && (
    state.understandState.factsVerified ||
    state.understandState.reasoningComplete ||
    state.understandState.chosenReflection !== null
  )) {
    return true;
  }
  return false;
}

const VALID_STAGE_IDS = [
  'stage-check',
  'stage-fueling',
  'stage-ignition',
  'stage-liftoff',
  'stage-separation',
  'stage-insertion'
];

const VALID_TIMELINE_IDS = [
  'tl-1962',
  'tl-1969',
  'tl-1972',
  'tl-1979',
  'tl-1980'
];

export function loadSavedGame(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.saveVersion === 2 &&
      hasMeaningfulProgress(parsed)
    ) {
      // Validate and sanitize diagram order (prevent legacy seq-* corruptions)
      if (
        !parsed.puzzleStates?.diagram?.order ||
        !Array.isArray(parsed.puzzleStates.diagram.order) ||
        parsed.puzzleStates.diagram.order.length !== 6 ||
        !parsed.puzzleStates.diagram.order.every((id: string) => VALID_STAGE_IDS.includes(id))
      ) {
        parsed.puzzleStates = parsed.puzzleStates || {};
        parsed.puzzleStates.diagram = {
          solved: parsed.puzzleStates.diagram?.solved || false,
          order: ['stage-liftoff', 'stage-check', 'stage-insertion', 'stage-ignition', 'stage-fueling', 'stage-separation'],
          hintsRevealed: parsed.puzzleStates.diagram?.hintsRevealed || 0
        };
      }

      // Validate and sanitize timeline order
      if (
        !parsed.puzzleStates?.timeline?.order ||
        !Array.isArray(parsed.puzzleStates.timeline.order) ||
        parsed.puzzleStates.timeline.order.length !== 5 ||
        !parsed.puzzleStates.timeline.order.every((id: string) => VALID_TIMELINE_IDS.includes(id))
      ) {
        parsed.puzzleStates = parsed.puzzleStates || {};
        parsed.puzzleStates.timeline = {
          solved: parsed.puzzleStates.timeline?.solved || false,
          order: ['tl-1972', 'tl-1962', 'tl-1980', 'tl-1969', 'tl-1979'],
          hintsRevealed: parsed.puzzleStates.timeline?.hintsRevealed || 0
        };
      }

      return parsed as GameState;
    }
  } catch (err) {
    console.error('Failed to load saved state from localStorage:', err);
  }
  return null;
}

export function saveGame(state: GameState): boolean {
  if (!hasMeaningfulProgress(state)) {
    return false;
  }
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
