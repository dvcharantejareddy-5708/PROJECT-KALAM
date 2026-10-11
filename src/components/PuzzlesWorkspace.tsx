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
  Layers,
  FolderSearch
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

  // Supporting evidence mapped to current active puzzle
  const getRelevantEvidence = () => {
    switch (activeTab) {
      case 'timeline':
        return [
          { id: 'ev-folder', label: 'SLV-III Dossier (1973)' },
          { id: 'ev-id-card', label: "Dr. Kalam's ID Card (1977)" },
          { id: 'ev-test-log', label: 'E-01 Incident Log (1979)' },
          { id: 'ev-rohini', label: 'Rohini Record (1980)' }
        ];
      case 'telemetry':
        return [
          { id: 'ev-telemetry-readout', label: 'Telemetry Readout (ST-04)' },
          { id: 'ev-rohini', label: 'Rohini RS-1 Spec Sheet' }
        ];
      case 'missing_word':
        return [
          { id: 'ev-project-note', label: "Director's Note (12 Aug 1977)" },
          { id: 'ev-test-log', label: 'E-01 Review Remarks' }
        ];
      case 'diagram':
        return [
          { id: 'ev-launch-sequence', label: 'Launch Sequence Protocol' },
          { id: 'ev-blueprint', label: 'SLV-III Multi-Stage Blueprint' }
        ];
    }
  };

  const relevantEvidence = getRelevantEvidence();

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Workspace Header Panel */}
      <div className="kalam-panel" style={{ padding: '16px 20px', marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="kalam-badge-gold">Stage 2: Decode</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
                HISTORICAL CRYPTANALYSIS
              </span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0' }}>
              Decode the Archival Evidence
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0, maxWidth: '640px' }}>
              Deduce the mission chronology, decipher the telemetry beacon, verify Dr. Kalam’s guiding directive, and align the flight sequencer.
            </p>
          </div>

          {/* Progress Tracker & Advance Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid rgba(214, 179, 106, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 14px',
              textAlign: 'center',
              minWidth: '130px'
            }}>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block' }}>
                Solved Challenges
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: '2px 0' }}>
                <span className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold)' }}>
                  {solvedCount}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>/</span>
                <span className="font-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                  4
                </span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#1E1E1E', borderRadius: '2px', overflow: 'hidden' }}>
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
                className="kalam-btn-primary animate-pulse-glow"
                style={{ height: '44px', padding: '0 20px', fontSize: '13px' }}
              >
                <span>Proceed to Stage 3: Connect</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Puzzle Navigation Tabs (Scrollable on small mobile) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(214, 179, 106, 0.15)',
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('timeline'); }}
            className={activeTab === 'timeline' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '11px', minHeight: '44px', padding: '6px 14px', flexShrink: 0 }}
          >
            <Calendar size={14} />
            <span>A. Timeline</span>
            {puzzleStates.timeline.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('telemetry'); }}
            className={activeTab === 'telemetry' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '11px', minHeight: '44px', padding: '6px 14px', flexShrink: 0 }}
          >
            <Binary size={14} />
            <span>B. Telemetry</span>
            {puzzleStates.telemetry.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('missing_word'); }}
            className={activeTab === 'missing_word' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '11px', minHeight: '44px', padding: '6px 14px', flexShrink: 0 }}
          >
            <FileText size={14} />
            <span>C. Missing Word</span>
            {puzzleStates.missingWord.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveTab('diagram'); }}
            className={activeTab === 'diagram' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ fontSize: '11px', minHeight: '44px', padding: '6px 14px', flexShrink: 0 }}
          >
            <Layers size={14} />
            <span>D. Launch Sequence</span>
            {puzzleStates.diagram.solved && <CheckCircle2 size={13} style={{ color: '#81C784' }} />}
          </button>
        </div>

        {/* Quick Supporting Evidence Bar (Direct investigation support) */}
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: 'rgba(14, 26, 38, 0.8)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(214, 179, 106, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>
            <FolderSearch size={12} /> Supporting Records:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {relevantEvidence.map((ev) => (
              <button
                key={ev.id}
                onClick={() => { sound.playClick(soundEnabled); onOpenEvidence(ev.id); }}
                className="kalam-badge-gold"
                style={{
                  cursor: 'pointer',
                  fontSize: '10px',
                  padding: '3px 8px',
                  background: 'rgba(214, 179, 106, 0.1)',
                  transition: 'background 0.2s ease'
                }}
                title="Inspect supporting archival record"
              >
                📄 {ev.label}
              </button>
            ))}
          </div>
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
            onOpenEvidence={onOpenEvidence}
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

      {/* Stage 2 Completion Banner */}
      {allSolved && (
        <div className="kalam-panel" style={{
          marginTop: '24px',
          padding: '20px',
          border: '2px solid var(--color-success)',
          background: 'linear-gradient(180deg, rgba(20, 37, 54, 0.98) 0%, rgba(14, 26, 38, 0.98) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 142, 60, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(56, 142, 60, 0.25)',
              border: '2px solid var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#81C784',
              flexShrink: 0
            }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span className="kalam-badge-success">Stage 2 Complete</span>
                <span style={{ fontSize: '11px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
                  All 4 Historical Cryptanalysis Challenges Solved
                </span>
              </div>
              <h3 className="font-heading" style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>
                Archival Evidence Decrypted!
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', marginTop: '4px', maxWidth: '640px', lineHeight: '1.4' }}>
                You have reconstructed the chronology, decoded the telemetry, verified Dr. Kalam’s guiding principle, 
                and confirmed the multi-stage launch sequence.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess(soundEnabled);
              onProceedToConnect();
            }}
            className="kalam-btn-primary animate-pulse-glow"
            style={{ height: '48px', padding: '0 28px', fontSize: '13px' }}
          >
            <span>Proceed to Stage 3: Connect</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
