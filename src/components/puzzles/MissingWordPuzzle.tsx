import React, { useState } from 'react';
import { MISSING_WORD_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  FileText, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface MissingWordPuzzleProps {
  isSolved: boolean;
  onSolve: (answer: string) => void;
  onOpenEvidence: (id: string) => void;
  soundEnabled: boolean;
  savedAnswer?: string;
  savedHintsRevealed?: number;
}

export const MissingWordPuzzle: React.FC<MissingWordPuzzleProps> = ({
  isSolved,
  onSolve,
  onOpenEvidence,
  soundEnabled,
  savedAnswer = '',
  savedHintsRevealed = 0
}) => {
  const [inputVal, setInputVal] = useState(savedAnswer || '');
  const [hintsRevealed, setHintsRevealed] = useState(savedHintsRevealed);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: isSolved ? 'correct' : 'idle',
    message: isSolved ? MISSING_WORD_PUZZLE.explanation : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) {
      setFeedback({
        status: 'incorrect',
        message: 'Please enter a deduced term from Dr. Kalam’s archival directive.'
      });
      sound.playError(soundEnabled);
      return;
    }

    const isMatch = MISSING_WORD_PUZZLE.correctAnswers.some(
      (ans) => ans.toLowerCase() === trimmed
    );

    if (isMatch) {
      setFeedback({
        status: 'correct',
        message: MISSING_WORD_PUZZLE.explanation
      });
      sound.playSuccess(soundEnabled);
      onSolve(inputVal.trim());
    } else {
      setFeedback({
        status: 'incorrect',
        message: 'Term does not match Dr. Kalam’s documented principle. Inspect the handwritten directive (12 August 1977) and his remarks in the E-01 Flight Review log.'
      });
      sound.playError(soundEnabled);
    }
  };

  const handleClear = () => {
    sound.playClick(soundEnabled);
    setInputVal('');
    setFeedback({ status: 'idle', message: '' });
  };

  return (
    <div className="kalam-panel" style={{ padding: '20px' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid rgba(214, 179, 106, 0.2)',
        paddingBottom: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="kalam-badge-gold">PUZZLE C</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
              PROJECT DIRECTOR’S PHILOSOPHY
            </span>
          </div>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0' }}>
            {MISSING_WORD_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
            {MISSING_WORD_PUZZLE.instructions}
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-project-note'); }}
          className="kalam-btn-secondary"
          style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
          title="Inspect Handwritten Directive on Desk"
        >
          <FileText size={14} />
          <span>Inspect Handwritten Directive</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Note Artwork Artifact */}
        <div style={{
          background: '#0E1A26',
          border: '1px solid rgba(214, 179, 106, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-gold)',
            display: 'block',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Project Director's Desk • 12 August 1977
          </span>
          <div style={{
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#080E16',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(214, 179, 106, 0.15)',
            overflow: 'hidden',
            padding: '8px'
          }}>
            <img 
              src="/assets/project_note.jpg" 
              alt="Handwritten Project Directive" 
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }} 
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
            Original Manuscript Directive from VSSC Trivandrum
          </span>
        </div>

        {/* Right Column: Parchment Extract & Answer Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="kalam-paper" style={{ padding: '18px' }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              color: 'var(--color-bronze)',
              fontWeight: 800,
              display: 'block',
              marginBottom: '8px'
            }}>
              Declassified Archival Excerpt
            </span>
            <p style={{
              fontStyle: 'italic',
              fontSize: '14px',
              color: '#221E1B',
              lineHeight: '1.6',
              marginBottom: '12px'
            }}>
              "Our goal is clear — An indigenous Satellite Launch Vehicle by India, for India."
            </p>
            <div style={{
              background: 'rgba(212, 195, 163, 0.45)',
              border: '1px solid rgba(90, 58, 30, 0.3)',
              borderRadius: '4px',
              padding: '12px 14px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#221E1B',
              lineHeight: '1.6'
            }}>
              Every failure is our greatest <span style={{
                textDecoration: 'underline',
                color: 'var(--color-bronze)',
                background: 'rgba(234, 220, 197, 0.9)',
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800
              }}>______</span>. Every setback brings us closer to orbital triumph.
            </div>
            <span style={{
              display: 'block',
              textAlign: 'right',
              fontSize: '11px',
              color: 'var(--color-bronze)',
              fontFamily: 'var(--font-mono)',
              marginTop: '10px',
              fontWeight: 700
            }}>
              — A.P.J. Abdul Kalam, Project Director SLV-3
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{
              fontSize: '12px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-gold)',
              fontWeight: 700,
              letterSpacing: '0.06em'
            }}>
              Missing Guiding Keyword:
            </label>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={inputVal}
                disabled={isSolved}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter deduced keyword from archive..."
                aria-label="Missing keyword"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  minHeight: '44px',
                  padding: '0 16px',
                  background: '#142536',
                  border: inputVal ? '2px solid var(--color-gold)' : '1px solid rgba(214, 179, 106, 0.5)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-text-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />

              {!isSolved ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {inputVal && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="kalam-btn-secondary"
                      style={{ minHeight: '44px', padding: '0 14px' }}
                      title="Clear text"
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="kalam-btn-primary"
                    style={{ minHeight: '44px', padding: '0 24px', fontSize: '13px' }}
                  >
                    <Send size={15} />
                    <span>Verify Word</span>
                  </button>
                </div>
              ) : (
                <div className="kalam-badge-success" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>Directive Verified</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback.status !== 'idle' && (
        <div style={{
          marginTop: '16px',
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          background: feedback.status === 'correct' ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
          border: feedback.status === 'correct' ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
          color: feedback.status === 'correct' ? '#81C784' : '#EF9A9A',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          fontSize: '13px'
        }}>
          {feedback.status === 'correct' ? (
            <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <XCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          )}
          <div>
            <strong style={{ display: 'block', marginBottom: '3px' }}>
              {feedback.status === 'correct' ? 'Archival Principle Confirmed!' : 'Deduction Incomplete'}
            </strong>
            <span style={{ lineHeight: '1.5' }}>{feedback.message}</span>
          </div>
        </div>
      )}

      {/* 3-Tier Progressive Hints Section */}
      <div style={{
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(214, 179, 106, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-gold)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Investigation Assistance ({hintsRevealed}/{MISSING_WORD_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < MISSING_WORD_PUZZLE.hints.length && (
            <button
              onClick={() => { sound.playClick(soundEnabled); setHintsRevealed((prev) => prev + 1); }}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '36px', padding: '6px 14px' }}
            >
              <Sparkles size={13} />
              <span>
                Reveal {hintsRevealed === 0 ? 'Observation Hint (Tier 1)' : hintsRevealed === 1 ? 'Connection Hint (Tier 2)' : 'Strong Guidance (Tier 3)'}
              </span>
            </button>
          )}
        </div>

        {hintsRevealed > 0 && (
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MISSING_WORD_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(20, 37, 54, 0.75)',
                  border: '1px solid rgba(214, 179, 106, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  color: 'var(--color-aged-paper)',
                  lineHeight: '1.5'
                }}
              >
                <strong style={{ color: 'var(--color-gold)', marginRight: '6px' }}>
                  Tier {h.level} ({h.level === 1 ? 'Observation' : h.level === 2 ? 'Connection' : 'Strong Guidance'}):
                </strong>
                {h.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
