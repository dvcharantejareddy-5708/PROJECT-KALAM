import React, { useState } from 'react';
import { TimelinePuzzle } from './puzzles/TimelinePuzzle';
import { TelemetryPuzzle } from './puzzles/TelemetryPuzzle';
import { MissingWordPuzzle } from './puzzles/MissingWordPuzzle';
import { DiagramPuzzle } from './puzzles/DiagramPuzzle';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Binary, 
  FileText, 
  Layers 
} from 'lucide-react';
import { sound } from '../utils/sound';

interface PuzzlesWorkspaceProps {
  puzzleStates: {
    timeline: { solved: boolean; order: string[]; hintsRevealed: number };
    telemetry: { solved: boolean; answer: string; hintsRevealed: number };
    missingWord: { solved: boolean; answer: string; hintsRevealed: number };
    diagram: { solved: boolean; order: string[]; hintsRevealed: number };
  };
  onSolveTimeline: (order: string[]) => void;
  onSolveTelemetry: (ans: string) => void;
  onSolveMissingWord: (ans: string) => void;
  onSolveDiagram: (order: string[]) => void;
  onOpenEvidence: (id: string) => void;
  onProceedToConnect: () => void;
  soundEnabled: boolean;
}

export const PuzzlesWorkspace: React.FC<PuzzlesWorkspaceProps> = ({
  puzzleStates,
  onSolveTimeline,
  onSolveTelemetry,
  onSolveMissingWord,
  onSolveDiagram,
  onOpenEvidence,
  onProceedToConnect,
  soundEnabled
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'telemetry' | 'missing_word' | 'diagram'>('timeline');

  const solvedCount = 
    (puzzleStates.timeline.solved ? 1 : 0) +
    (puzzleStates.telemetry.solved ? 1 : 0) +
    (puzzleStates.missingWord.solved ? 1 : 0) +
    (puzzleStates.diagram.solved ? 1 : 0);

  const allSolved = solvedCount === 4;

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Workspace Header */}
      <div className="kalam-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="kalam-badge-gold">Stage 2: Decode</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Historical & Technical Cryptanalysis</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800 }}>
              Decode the Archival Evidence
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '720px', marginTop: '4px' }}>
              Solve all <strong>4 historical puzzles</strong>: reconstruct the mission chronology, decipher the telemetry signal, 
              verify Dr. Kalam’s guiding directive, and arrange the autonomous launch sequence protocol.
            </p>
          </div>

          {/* Progress Tracker & Advance Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid rgba(214, 179, 106, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
              textAlign: 'center',
              minWidth: '160px'
            }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block' }}>
                Puzzles Solved
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '2px 0' }}>
                <span className="font-heading" style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-gold)' }}>
                  {solvedCount}
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                <span className="font-heading" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                  4
                </span>
              </div>
              <div style={{ width: '100%', height: '5px', background: '#1E1E1E', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(solvedCount / 4) * 100}%`,
                  background: 'linear-gradient(90deg, #5A3A1E, #D6B36A)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {allSolved && (
              <button
                onClick={() => {
                  sound.playSuccess(soundEnabled);
                  onProceedToConnect();
                }}
                className="kalam-btn-primary"
                style={{ height: '48px', padding: '0 24px' }}
              >
                <span>Proceed to Stage 3 (Connect)</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Puzzle Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(214, 179, 106, 0.15)'
        }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('timeline'); }}
            className={activeTab === 'timeline' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '12px' }}
          >
            <Calendar size={14} />
            <span>A. Timeline Builder</span>
            {puzzleStates.timeline.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('telemetry'); }}
            className={activeTab === 'telemetry' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '12px' }}
          >
            <Binary size={14} />
            <span>B. Telemetry Decoder</span>
            {puzzleStates.telemetry.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('missing_word'); }}
            className={activeTab === 'missing_word' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '12px' }}
          >
            <FileText size={14} />
            <span>C. Missing Word</span>
            {puzzleStates.missingWord.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('diagram'); }}
            className={activeTab === 'diagram' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '12px' }}
          >
            <Layers size={14} />
            <span>D. Launch Sequence</span>
            {puzzleStates.diagram.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>
        </div>
      </div>

      {/* Active Puzzle Screen */}
      <div>
        {activeTab === 'timeline' && (
          <TimelinePuzzle
            isSolved={puzzleStates.timeline.solved}
            onSolve={onSolveTimeline}
            soundEnabled={soundEnabled}
            savedOrder={puzzleStates.timeline.order}
            savedHintsRevealed={puzzleStates.timeline.hintsRevealed}
          />
        )}

        {activeTab === 'telemetry' && (
          <TelemetryPuzzle
            isSolved={puzzleStates.telemetry.solved}
            onSolve={onSolveTelemetry}
            onOpenEvidence={onOpenEvidence}
            soundEnabled={soundEnabled}
            savedAnswer={puzzleStates.telemetry.answer}
            savedHintsRevealed={puzzleStates.telemetry.hintsRevealed}
          />
        )}

        {activeTab === 'missing_word' && (
          <MissingWordPuzzle
            isSolved={puzzleStates.missingWord.solved}
            onSolve={onSolveMissingWord}
            onOpenEvidence={onOpenEvidence}
            soundEnabled={soundEnabled}
            savedAnswer={puzzleStates.missingWord.answer}
            savedHintsRevealed={puzzleStates.missingWord.hintsRevealed}
          />
        )}

        {activeTab === 'diagram' && (
          <DiagramPuzzle
            isSolved={puzzleStates.diagram.solved}
            onSolve={onSolveDiagram}
            onOpenEvidence={onOpenEvidence}
            soundEnabled={soundEnabled}
            savedOrder={puzzleStates.diagram.order}
            savedHintsRevealed={puzzleStates.diagram.hintsRevealed}
          />
        )}
      </div>

      {/* Completion Banner */}
      {allSolved && (
        <div className="kalam-panel" style={{
          marginTop: '24px',
          padding: '20px',
          border: '1px solid var(--color-success)',
          background: 'rgba(20, 37, 54, 0.95)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(56, 142, 60, 0.2)',
              border: '1px solid var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#81C784'
            }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-heading" style={{ fontSize: '16px', fontWeight: 800 }}>
                Stage 2 Complete: All 4 Decoding Challenges Solved!
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                You have deciphered the timeline, decoded the telemetry, verified the principle, and confirmed the flight sequence.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess(soundEnabled);
              onProceedToConnect();
            }}
            className="kalam-btn-primary"
            style={{ height: '44px', padding: '0 24px' }}
          >
            <span>Proceed to Stage 3 (Connect)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
