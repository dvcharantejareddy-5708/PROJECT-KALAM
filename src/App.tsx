import React, { useState, useEffect } from 'react';
import { 
  GameState, 
  Screen, 
  Stage, 
  EvidenceItem, 
  ConnectionLink, 
  UserSettings,
  EndingType 
} from './types';
import { EVIDENCE_ITEMS } from './data/evidenceData';
import { 
  loadSavedGame, 
  saveGame, 
  clearSavedGame, 
  INITIAL_GAME_STATE,
  hasMeaningfulProgress 
} from './utils/storage';

import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { ChapterIntro } from './components/ChapterIntro';
import { ArchiveDeskScene } from './components/ArchiveDeskScene';
import { DocumentModal } from './components/DocumentModal';
import { PuzzlesWorkspace } from './components/PuzzlesWorkspace';
import { ConnectionsBoard } from './components/ConnectionsBoard';
import { UnderstandWorkspace } from './components/UnderstandWorkspace';
import { ChapterComplete } from './components/ChapterComplete';
import { EvidenceJournal } from './components/EvidenceJournal';
import { AudioModal } from './components/AudioModal';
import { SettingsModal } from './components/SettingsModal';
import { CreditsModal } from './components/CreditsModal';

export const App: React.FC = () => {
  // Load saved state or use initial state
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadSavedGame();
    return saved ? saved : INITIAL_GAME_STATE;
  });

  // Modals state
  const [inspectingItem, setInspectingItem] = useState<EvidenceItem | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [showAudioTape, setShowAudioTape] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  // Check whether a valid saved game with actual progress exists
  const hasSavedGame = hasMeaningfulProgress(gameState);

  // Calculate dynamic counts
  const mandatoryItems = EVIDENCE_ITEMS.filter((i) => i.isMandatory);
  const totalMandatoryEvidence = mandatoryItems.length; // 8
  const collectedMandatoryCount = mandatoryItems.filter((i) => 
    gameState.collectedEvidenceIds.includes(i.id)
  ).length;

  const isDiscoverComplete = collectedMandatoryCount >= totalMandatoryEvidence;

  const puzzlesSolvedCount = 
    (gameState.puzzleStates.timeline.solved ? 1 : 0) +
    (gameState.puzzleStates.telemetry.solved ? 1 : 0) +
    (gameState.puzzleStates.missingWord.solved ? 1 : 0) +
    (gameState.puzzleStates.diagram.solved ? 1 : 0);

  const isDecodeComplete = isDiscoverComplete && puzzlesSolvedCount >= 4;

  const connectionsVerifiedCount = gameState.verifiedConnections.length;
  const isConnectComplete = isDecodeComplete && connectionsVerifiedCount >= 5;

  const isUnderstandComplete = isConnectComplete && 
    gameState.understandState.factsVerified && 
    gameState.understandState.reasoningComplete && 
    gameState.understandState.chosenReflection !== null;

  // Calculate dynamic objective title & instruction
  const getDynamicObjective = (): { title: string; instruction: string } => {
    if (!isDiscoverComplete) {
      return {
        title: `Search Archive Desk (${collectedMandatoryCount}/${totalMandatoryEvidence} Records Collected)`,
        instruction: 'Inspect blueprints, launch sequence logs, telemetry sheets, and photographs on Dr. Kalam’s desk.'
      };
    }
    if (!isDecodeComplete) {
      return {
        title: `Decode Archival Evidence (${puzzlesSolvedCount}/4 Puzzles Solved)`,
        instruction: 'Reconstruct the chronology, decipher telemetry, identify the missing directive, and arrange launch stages.'
      };
    }
    if (!isConnectComplete) {
      return {
        title: `Connect Engineering to Outcomes (${connectionsVerifiedCount}/5 Links Verified)`,
        instruction: 'Link solid propulsion, composites, guidance, and setback analysis to orbital insertion.'
      };
    }
    if (!isUnderstandComplete) {
      return {
        title: 'Historical Understanding & Deduction',
        instruction: 'Evaluate facts versus interpretations, answer aerospace reasoning questions, and form your reflection.'
      };
    }
    return {
      title: 'Chapter 3 Complete: The Space Dreamer Triumph',
      instruction: 'Rohini satellite placed into orbit on 18 July 1980. Self-reliance in space achieved.'
    };
  };

  const dynamicObjective = getDynamicObjective();

  // Apply user settings (text scale, reduced motion) to body
  useEffect(() => {
    document.body.className = `text-${gameState.settings.textSize} ${
      gameState.settings.reducedMotion ? 'reduced-motion' : ''
    }`;
  }, [gameState.settings.textSize, gameState.settings.reducedMotion]);

  // Persist game state ONLY when meaningful progress exists
  useEffect(() => {
    if (!hasMeaningfulProgress(gameState)) {
      return;
    }
    saveGame({
      ...gameState,
      currentObjective: dynamicObjective.title,
      objectiveInstruction: dynamicObjective.instruction
    });
  }, [
    gameState,
    dynamicObjective.title,
    dynamicObjective.instruction
  ]);

  // Screen Navigation Handler
  const handleNavigate = (screen: Screen) => {
    let targetStage: Stage = gameState.currentStage;
    if (screen === 'archive') targetStage = 'discover';
    else if (screen === 'puzzles') targetStage = 'decode';
    else if (screen === 'connect') targetStage = 'connect';
    else if (screen === 'understand') targetStage = 'understand';
    else if (screen === 'unlock') targetStage = 'unlock';

    setGameState((prev) => ({
      ...prev,
      currentScreen: screen,
      currentStage: targetStage
    }));
  };

  // Start New Game
  const handleNewGame = () => {
    clearSavedGame();
    setGameState({
      ...INITIAL_GAME_STATE,
      currentScreen: 'intro',
      currentStage: 'discover'
    });
  };

  // Continue Saved Game
  const handleContinueGame = () => {
    const saved = loadSavedGame();
    if (saved) {
      setGameState({
        ...saved,
        currentScreen: saved.currentScreen === 'main_menu' ? 'archive' : saved.currentScreen
      });
    } else {
      handleNewGame();
    }
  };

  // Inspect Object in Archive
  const handleInspectItem = (item: EvidenceItem) => {
    setInspectingItem(item);
    if (!gameState.inspectedObjectIds.includes(item.id)) {
      setGameState((prev) => ({
        ...prev,
        inspectedObjectIds: [...prev.inspectedObjectIds, item.id]
      }));
    }
  };

  // Collect Evidence Item
  const handleCollectEvidence = (id: string) => {
    if (!gameState.collectedEvidenceIds.includes(id)) {
      const nextCollected = [...gameState.collectedEvidenceIds, id];
      setGameState((prev) => ({
        ...prev,
        collectedEvidenceIds: nextCollected
      }));
    }
  };

  // Solve Puzzle 1: Timeline
  const handleSolveTimeline = (order: string[]) => {
    setGameState((prev) => ({
      ...prev,
      solvedPuzzleIds: Array.from(new Set([...prev.solvedPuzzleIds, 'puzzle-timeline'])),
      puzzleStates: {
        ...prev.puzzleStates,
        timeline: {
          ...prev.puzzleStates.timeline,
          solved: true,
          order
        }
      }
    }));
  };

  // Solve Puzzle 2: Telemetry
  const handleSolveTelemetry = (answer: string) => {
    setGameState((prev) => ({
      ...prev,
      solvedPuzzleIds: Array.from(new Set([...prev.solvedPuzzleIds, 'puzzle-telemetry'])),
      puzzleStates: {
        ...prev.puzzleStates,
        telemetry: {
          ...prev.puzzleStates.telemetry,
          solved: true,
          answer
        }
      }
    }));
  };

  // Solve Puzzle 3: Missing Word
  const handleSolveMissingWord = (answer: string) => {
    setGameState((prev) => ({
      ...prev,
      solvedPuzzleIds: Array.from(new Set([...prev.solvedPuzzleIds, 'puzzle-missing-word'])),
      puzzleStates: {
        ...prev.puzzleStates,
        missingWord: {
          ...prev.puzzleStates.missingWord,
          solved: true,
          answer
        }
      }
    }));
  };

  // Solve Puzzle 4: Diagram / Sequence
  const handleSolveDiagram = (order: string[]) => {
    setGameState((prev) => ({
      ...prev,
      solvedPuzzleIds: Array.from(new Set([...prev.solvedPuzzleIds, 'puzzle-diagram'])),
      puzzleStates: {
        ...prev.puzzleStates,
        diagram: {
          ...prev.puzzleStates.diagram,
          solved: true,
          order
        }
      }
    }));
  };

  // Verify Connections
  const handleVerifyConnections = (links: ConnectionLink[]) => {
    setGameState((prev) => ({
      ...prev,
      verifiedConnections: links,
      currentStage: 'understand'
    }));
  };

  // Stage 4 Understand: Verify Facts vs Interpretation
  const handleVerifyFacts = () => {
    setGameState((prev) => ({
      ...prev,
      understandState: {
        ...prev.understandState,
        factsVerified: true
      }
    }));
  };

  // Stage 4 Understand: Answer Reasoning Question
  const handleAnswerReasoning = (questionId: string, optionId: string) => {
    setGameState((prev) => {
      const nextAnswers = {
        ...prev.understandState.reasoningAnswers,
        [questionId]: optionId
      };
      // 3 reasoning questions
      const reasoningComplete = Object.keys(nextAnswers).length >= 3;
      return {
        ...prev,
        understandState: {
          ...prev.understandState,
          reasoningAnswers: nextAnswers,
          reasoningComplete
        }
      };
    });
  };

  // Stage 4 Understand: Choose Reflection Ending
  const handleChooseReflection = (ending: EndingType) => {
    setGameState((prev) => ({
      ...prev,
      understandState: {
        ...prev.understandState,
        chosenReflection: ending
      },
      assignedEnding: ending,
      chapterCompleted: true
    }));
  };

  // Extract Audio Clue
  const handleExtractAudioClue = () => {
    setGameState((prev) => ({
      ...prev,
      audioClueDiscovered: true
    }));
  };

  // Reset Progress within Settings
  const handleResetInvestigation = () => {
    clearSavedGame();
    setGameState(INITIAL_GAME_STATE);
  };

  // Replay Chapter from Complete Screen
  const handleReplayChapter = () => {
    clearSavedGame();
    setGameState({
      ...INITIAL_GAME_STATE,
      currentScreen: 'archive',
      currentStage: 'discover',
      settings: gameState.settings
    });
  };

  // Update Settings
  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setGameState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  // Navigation index for document modal previous/next
  const currentInspectIndex = inspectingItem 
    ? EVIDENCE_ITEMS.findIndex((e) => e.id === inspectingItem.id)
    : -1;

  const handleInspectPrev = () => {
    if (currentInspectIndex > 0) {
      handleInspectItem(EVIDENCE_ITEMS[currentInspectIndex - 1]);
    }
  };

  const handleInspectNext = () => {
    if (currentInspectIndex < EVIDENCE_ITEMS.length - 1) {
      handleInspectItem(EVIDENCE_ITEMS[currentInspectIndex + 1]);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-light)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Top Persistent Header (shown on all screens except Main Menu) */}
      {gameState.currentScreen !== 'main_menu' && (
        <Header
          currentScreen={gameState.currentScreen}
          currentStage={gameState.currentStage}
          onNavigate={handleNavigate}
          evidenceCollectedCount={collectedMandatoryCount}
          totalMandatoryEvidence={totalMandatoryEvidence}
          puzzlesSolvedCount={puzzlesSolvedCount}
          connectionsVerifiedCount={connectionsVerifiedCount}
          deductionCompleted={isUnderstandComplete}
          onOpenJournal={() => setShowJournal(true)}
          onOpenAudio={() => setShowAudioTape(true)}
          onOpenSettings={() => setShowSettings(true)}
          soundEnabled={gameState.settings.soundEnabled}
          onToggleSound={() => handleUpdateSettings({ soundEnabled: !gameState.settings.soundEnabled })}
          currentObjective={dynamicObjective.title}
        />
      )}

      {/* Screen Routing */}
      <main style={{ flex: 1, width: '100%' }}>
        {gameState.currentScreen === 'main_menu' && (
          <MainMenu
            hasSavedGame={hasSavedGame}
            onNewGame={handleNewGame}
            onContinueGame={handleContinueGame}
            onOpenJournal={() => setShowJournal(true)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenCredits={() => setShowCredits(true)}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}

        {gameState.currentScreen === 'intro' && (
          <ChapterIntro
            onBegin={() => handleNavigate('archive')}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}

        {gameState.currentScreen === 'archive' && (
          <ArchiveDeskScene
            evidenceList={EVIDENCE_ITEMS}
            inspectedIds={gameState.inspectedObjectIds}
            collectedIds={gameState.collectedEvidenceIds}
            onInspectItem={handleInspectItem}
            onProceedToDecode={() => handleNavigate('puzzles')}
            isStageComplete={isDiscoverComplete}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}

        {gameState.currentScreen === 'puzzles' && (
          <PuzzlesWorkspace
            puzzleStates={gameState.puzzleStates}
            onSolveTimeline={handleSolveTimeline}
            onSolveTelemetry={handleSolveTelemetry}
            onSolveMissingWord={handleSolveMissingWord}
            onSolveDiagram={handleSolveDiagram}
            onOpenEvidence={(id) => {
              const item = EVIDENCE_ITEMS.find((e) => e.id === id);
              if (item) handleInspectItem(item);
            }}
            onProceedToConnect={() => handleNavigate('connect')}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}

        {gameState.currentScreen === 'connect' && (
          <ConnectionsBoard
            verifiedConnections={gameState.verifiedConnections}
            onVerifyConnections={handleVerifyConnections}
            onProceedToUnderstand={() => handleNavigate('understand')}
            soundEnabled={gameState.settings.soundEnabled}
            isStageComplete={isConnectComplete}
          />
        )}

        {gameState.currentScreen === 'understand' && (
          <UnderstandWorkspace
            factsVerified={gameState.understandState.factsVerified}
            reasoningAnswers={gameState.understandState.reasoningAnswers}
            reasoningComplete={gameState.understandState.reasoningComplete}
            chosenReflection={gameState.understandState.chosenReflection}
            onVerifyFacts={handleVerifyFacts}
            onAnswerReasoning={handleAnswerReasoning}
            onChooseReflection={handleChooseReflection}
            onProceedToUnlock={() => handleNavigate('unlock')}
            onOpenJournal={() => setShowJournal(true)}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}

        {gameState.currentScreen === 'unlock' && (
          <ChapterComplete
            evidenceCount={collectedMandatoryCount}
            totalMandatory={totalMandatoryEvidence}
            puzzlesCount={puzzlesSolvedCount}
            connectionsCount={connectionsVerifiedCount}
            assignedEnding={gameState.assignedEnding || 'true_seeker'}
            onOpenJournal={() => setShowJournal(true)}
            onReviewEvidence={() => handleNavigate('archive')}
            onReplayChapter={handleReplayChapter}
            onMainMenu={() => handleNavigate('main_menu')}
            soundEnabled={gameState.settings.soundEnabled}
          />
        )}
      </main>

      {/* MODAL 1: Document Inspection */}
      {inspectingItem && (
        <DocumentModal
          item={inspectingItem}
          isCollected={gameState.collectedEvidenceIds.includes(inspectingItem.id)}
          onClose={() => setInspectingItem(null)}
          onCollect={handleCollectEvidence}
          onPrev={currentInspectIndex > 0 ? handleInspectPrev : undefined}
          onNext={currentInspectIndex < EVIDENCE_ITEMS.length - 1 ? handleInspectNext : undefined}
          soundEnabled={gameState.settings.soundEnabled}
        />
      )}

      {/* MODAL 2: Evidence Journal */}
      {showJournal && (
        <EvidenceJournal
          evidenceList={EVIDENCE_ITEMS}
          collectedIds={gameState.collectedEvidenceIds}
          solvedPuzzleIds={gameState.solvedPuzzleIds}
          verifiedConnectionsCount={connectionsVerifiedCount}
          deductionCompleted={isUnderstandComplete}
          onInspectItem={(item) => {
            setShowJournal(false);
            handleInspectItem(item);
          }}
          onClose={() => setShowJournal(false)}
          soundEnabled={gameState.settings.soundEnabled}
        />
      )}

      {/* MODAL 3: Audio Cassette Investigation */}
      {showAudioTape && (
        <AudioModal
          onClose={() => setShowAudioTape(false)}
          onExtractClue={handleExtractAudioClue}
          clueDiscovered={gameState.audioClueDiscovered}
          soundEnabled={gameState.settings.soundEnabled}
        />
      )}

      {/* MODAL 4: Settings & Accessibility */}
      {showSettings && (
        <SettingsModal
          settings={gameState.settings}
          onUpdateSettings={handleUpdateSettings}
          onResetInvestigation={handleResetInvestigation}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* MODAL 5: Credits & Historical Sources */}
      {showCredits && (
        <CreditsModal
          onClose={() => setShowCredits(false)}
          soundEnabled={gameState.settings.soundEnabled}
        />
      )}
    </div>
  );
};

export default App;
