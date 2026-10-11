import React, { useState, useRef } from 'react';
import { TELEMETRY_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  Sparkles,
  FileText
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface TelemetryPuzzleProps {
  isSolved: boolean;
  onSolve: (answer: string) => void;
  onOpenEvidence: (id: string) => void;
  soundEnabled: boolean;
  savedAnswer?: string;
  savedHintsRevealed?: number;
}

export const TelemetryPuzzle: React.FC<TelemetryPuzzleProps> = ({
  isSolved,
  onSolve,
  onOpenEvidence,
  soundEnabled,
  savedAnswer = '',
  savedHintsRevealed = 0
}) => {
  // 6 letter boxes for ROHINI
  const initialLetters = savedAnswer && savedAnswer.length === 6 
    ? savedAnswer.toUpperCase().split('') 
    : isSolved 
    ? ['R', 'O', 'H', 'I', 'N', 'I'] 
    : ['', '', '', '', '', ''];

  const [letters, setLetters] = useState<string[]>(initialLetters);
  const [hintsRevealed, setHintsRevealed] = useState(savedHintsRevealed);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: isSolved ? 'correct' : 'idle',
    message: isSolved ? TELEMETRY_PUZZLE.explanation : ''
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleLetterChange = (index: number, val: string) => {
    if (isSolved) return;
    const char = val.slice(-1).toUpperCase();
    const newLetters = [...letters];
    newLetters[index] = char;
    setLetters(newLetters);

    // Auto-advance
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    const fullWord = letters.join('').trim().toUpperCase();
    if (fullWord.length < 6) {
      setFeedback({
        status: 'incorrect',
        message: 'Please decode all 6 letters of the telemetry transmission.'
      });
      sound.playError(soundEnabled);
      return;
    }

    const isMatch = TELEMETRY_PUZZLE.correctAnswers.some(
      (ans) => ans.toUpperCase() === fullWord
    );

    if (isMatch) {
      setFeedback({
        status: 'correct',
        message: TELEMETRY_PUZZLE.explanation
      });
      sound.playSuccess(soundEnabled);
      onSolve(fullWord);
    } else {
      setFeedback({
        status: 'incorrect',
        message: 'Decoded payload designation does not match telemetry key. Check your A=1 ... Z=26 substitutions.'
      });
      sound.playError(soundEnabled);
    }
  };

  return (
    <div className="kalam-panel" style={{ padding: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>PUZZLE B</span>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800 }}>
            {TELEMETRY_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {TELEMETRY_PUZZLE.instructions}
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-telemetry-readout'); }}
          className="kalam-btn-secondary"
          style={{ fontSize: '11px', minHeight: '36px', padding: '6px 14px' }}
        >
          <FileText size={13} /> View Telemetry Sheet
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Telemetry Sheet Document */}
        <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
            Original Sriharikota Tracking Log (ST-04)
          </span>
          <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/assets/telemetry_readout.jpg" 
              alt="Telemetry Readout" 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            Downlink Frequency: 137.4 MHz • Channel 1 to 6
          </span>
        </div>

        {/* Right Column: Decoding Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Channel Data Stream */}
          <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.35)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Encoded Channel Numbers:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TELEMETRY_PUZZLE.numericValues.map((val, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: '#142536',
                    border: '1px solid var(--color-gold)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: 'var(--color-text-light)'
                  }}>
                    {val}
                  </div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '2px', display: 'block' }}>
                    Ch.{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cipher Reference Table */}
          <div style={{ background: 'rgba(20, 37, 54, 0.7)', border: '1px solid rgba(214, 179, 106, 0.2)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              Alphabet Cipher Reference:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '10px' }}>
              <span>A=1</span><span>B=2</span><span>C=3</span><span>D=4</span><span>E=5</span><span>F=6</span><span>G=7</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>H=8</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>I=9</span>
              <span>J=10</span><span>K=11</span><span>L=12</span><span>M=13</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>N=14</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>O=15</span>
              <span>P=16</span><span>Q=17</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>R=18</span>
              <span>S=19</span><span>T=20</span><span>U=21</span>
            </div>
          </div>

          {/* Letter Inputs Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Decoded Satellite Designation (6 Letters):
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => { inputsRef.current[idx] = el; }}
                    type="text"
                    maxLength={1}
                    value={letters[idx]}
                    disabled={isSolved}
                    onChange={(e) => handleLetterChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    style={{
                      width: '46px',
                      height: '48px',
                      background: '#142536',
                      border: '2px solid rgba(214, 179, 106, 0.6)',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '20px',
                      fontWeight: 800,
                      color: 'var(--color-text-light)',
                      textTransform: 'uppercase'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!isSolved ? (
                <button type="submit" className="kalam-btn-primary" style={{ padding: '0 28px' }}>
                  <Send size={15} />
                  <span>Transmit Decoded Signal</span>
                </button>
              ) : (
                <div className="kalam-badge-success" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  <CheckCircle2 size={16} />
                  <span>Telemetry Decoded & Confirmed</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Hints */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(214, 179, 106, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            Telemetry Hints ({hintsRevealed}/{TELEMETRY_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < TELEMETRY_PUZZLE.hints.length && (
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
            {TELEMETRY_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
              {feedback.status === 'correct' ? 'Signal Decoded!' : 'Decoding Error'}
            </strong>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
