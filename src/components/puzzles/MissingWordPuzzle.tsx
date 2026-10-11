import React, { useState } from 'react';
import { MISSING_WORD_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  FileText, 
  Sparkles
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
        message: 'Please enter a word to verify the missing principle.'
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
        message: 'Incorrect word. Inspect Dr. Kalam’s handwritten note from 12 August 1977.'
      });
      sound.playError(soundEnabled);
    }
  };

  return (
    <div className="kalam-panel" style={{ padding: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>PUZZLE C</span>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800 }}>
            {MISSING_WORD_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {MISSING_WORD_PUZZLE.instructions}
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-project-note'); }}
          className="kalam-btn-secondary"
          style={{ fontSize: '11px', minHeight: '36px', padding: '6px 14px' }}
        >
          <FileText size={13} /> View Handwritten Note
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Note Document Artwork */}
        <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
            From the Project Director's Desk • 12 August 1977
          </span>
          <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/assets/project_note.jpg" 
              alt="Project Note" 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            Dr. A.P.J. Abdul Kalam's Original Manuscript Directive
          </span>
        </div>

        {/* Right Column: Parchment Extract & Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kalam-paper" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-bronze)', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
              Declassified Archival Excerpt
            </span>
            <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#221E1B', lineHeight: '1.6', marginBottom: '16px' }}>
              "Our goal is clear — An indigenous Satellite Launch Vehicle by India, for India."
            </p>
            <div style={{ background: 'rgba(212, 195, 163, 0.45)', border: '1px solid rgba(90, 58, 30, 0.3)', borderRadius: '4px', padding: '12px 16px', fontSize: '15px', fontWeight: 600, color: '#221E1B', lineHeight: '1.6' }}>
              Every failure is a <span style={{ textDecoration: 'underline', color: 'var(--color-bronze)', background: 'rgba(234, 220, 197, 0.9)', padding: '2px 6px', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>_____</span>. Every lesson brings us closer to success.
            </div>
            <span style={{ display: 'block', textAlign: 'right', fontSize: '12px', color: 'var(--color-bronze)', fontFamily: 'var(--font-mono)', marginTop: '12px', fontWeight: 600 }}>
              — A.P.J. Abdul Kalam
            </span>
          </div>

          {/* Answer Input Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputVal}
              disabled={isSolved}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type missing word (e.g. lesson)..."
              style={{
                flex: 1,
                minWidth: '200px',
                minHeight: '44px',
                padding: '0 16px',
                background: '#142536',
                border: '1px solid rgba(214, 179, 106, 0.5)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-light)',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                outline: 'none'
              }}
            />

            {!isSolved ? (
              <button type="submit" className="kalam-btn-primary" style={{ padding: '0 24px' }}>
                <Send size={15} />
                <span>Submit Word</span>
              </button>
            ) : (
              <div className="kalam-badge-success" style={{ padding: '8px 16px', fontSize: '12px' }}>
                <CheckCircle2 size={16} />
                <span>Word Decoded</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Hints */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(214, 179, 106, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            Directive Hints ({hintsRevealed}/{MISSING_WORD_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < MISSING_WORD_PUZZLE.hints.length && (
            <button
              onClick={() => { sound.playClick(soundEnabled); setHintsRevealed(prev => prev + 1); }}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '30px', padding: '4px 10px' }}
            >
              <Sparkles size={12} /> Reveal Hint {hintsRevealed + 1}
            </button>
          )}
        </div>

        {hintsRevealed > 0 && (
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {MISSING_WORD_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
              <div key={i} style={{ padding: '10px', background: 'rgba(20, 37, 54, 0.7)', border: '1px solid rgba(214, 179, 106, 0.2)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--color-aged-paper)' }}>
                <strong style={{ color: 'var(--color-gold)', marginRight: '6px' }}>Hint {h.level}:</strong> {h.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedback.status !== 'idle' && (
        <div style={{
          marginTop: '16px',
          padding: '14px',
          borderRadius: 'var(--radius-sm)',
          background: feedback.status === 'correct' ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
          border: feedback.status === 'correct' ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
          color: feedback.status === 'correct' ? '#81C784' : '#EF9A9A',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          fontSize: '13px'
        }}>
          {feedback.status === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <div>
            <strong style={{ display: 'block', marginBottom: '2px' }}>
              {feedback.status === 'correct' ? 'Historical Principle Verified!' : 'Verification Error'}
            </strong>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
