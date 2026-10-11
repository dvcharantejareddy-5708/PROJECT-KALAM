import React, { useState, useRef } from 'react';
import { TELEMETRY_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  Sparkles,
  FileText,
  RotateCcw,
  Radio
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

    // Auto-advance cursor
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (feedback.status === 'incorrect') {
      setFeedback({ status: 'idle', message: '' });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleClear = () => {
    sound.playClick(soundEnabled);
    setLetters(['', '', '', '', '', '']);
    setFeedback({ status: 'idle', message: '' });
    inputsRef.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    const fullWord = letters.join('').trim().toUpperCase();
    if (fullWord.length < 6) {
      setFeedback({
        status: 'incorrect',
        message: 'Please decode all 6 letters of the telemetry transmission before verification.'
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
        message: 'Decoded payload designation does not match the tracking transmission. Inspect the Coded Telemetry Readout Sheet (ST-04) and Rohini satellite specification in the archive.'
      });
      sound.playError(soundEnabled);
    }
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
            <span className="kalam-badge-gold">PUZZLE B</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
              SRIHARIKOTA TRACKING STATION (ST-04)
            </span>
          </div>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0' }}>
            {TELEMETRY_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
            {TELEMETRY_PUZZLE.instructions}
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-telemetry-readout'); }}
          className="kalam-btn-secondary"
          style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
          title="Inspect Telemetry Readout Sheet"
        >
          <FileText size={14} />
          <span>Inspect Telemetry Sheet</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Telemetry Sheet Document Artifact */}
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
            Sriharikota Downlink Log • ST-04
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
              src="/assets/telemetry_readout.jpg" 
              alt="Telemetry Readout Log" 
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }} 
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
            Carrier Frequency: 137.4 MHz • 6 Downlink Data Channels
          </span>
        </div>

        {/* Right Column: Telemetry Decoding Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Channel Data Stream (Meaningful Technical Transmission) */}
          <div style={{
            background: '#0E1A26',
            border: '1px solid rgba(214, 179, 106, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-gold)',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Radio size={14} /> Telemetry Signal Matrix:
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                Downlink: 18 Jul 1980
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
              gap: '8px'
            }}>
              {TELEMETRY_PUZZLE.channelParameters.map((ch) => (
                <div key={ch.channel} style={{
                  background: '#142536',
                  border: '1px solid rgba(214, 179, 106, 0.4)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 4px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', display: 'block' }}>
                    Ch. {ch.channel}
                  </span>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: 'var(--color-text-light)',
                    margin: '2px 0'
                  }}>
                    {ch.value}
                  </div>
                  <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', display: 'block', lineHeight: '1.2' }}>
                    {ch.parameter.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptanalysis Method Context */}
          <div style={{
            background: 'rgba(20, 37, 54, 0.7)',
            border: '1px solid rgba(214, 179, 106, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            fontSize: '12px',
            color: 'var(--color-aged-paper)',
            lineHeight: '1.5'
          }}>
            <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '4px' }}>
              Declassified Beacon Protocol:
            </strong>
            The orbital transponder encodes the payload designation across 6 telemetry channels. 
            Cross-reference with the Rohini Satellite record and telemetry logs to confirm the satellite identifier.
          </div>

          {/* Letter Inputs Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{
                fontSize: '12px',
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-gold)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.06em'
              }}>
                Decoded Satellite Identifier (6 Letters):
              </label>

              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
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
                    aria-label={`Letter position ${idx + 1}`}
                    style={{
                      width: '46px',
                      height: '48px',
                      background: '#142536',
                      border: letters[idx] ? '2px solid var(--color-gold)' : '2px solid rgba(214, 179, 106, 0.4)',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '20px',
                      fontWeight: 800,
                      color: 'var(--color-text-light)',
                      textTransform: 'uppercase',
                      outline: 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {!isSolved ? (
                <>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="kalam-btn-secondary"
                    style={{ minHeight: '44px', padding: '0 14px', fontSize: '11px' }}
                    title="Clear input boxes"
                  >
                    <RotateCcw size={13} />
                    <span>Clear</span>
                  </button>

                  <button
                    type="submit"
                    className="kalam-btn-primary"
                    style={{ minHeight: '44px', padding: '0 24px', fontSize: '13px' }}
                  >
                    <Send size={15} />
                    <span>Verify Decoded Signal</span>
                  </button>
                </>
              ) : (
                <div className="kalam-badge-success" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>Telemetry Decoded & Confirmed</span>
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
              {feedback.status === 'correct' ? 'Telemetry Signal Validated!' : 'Decoding Mismatch'}
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
            Investigation Assistance ({hintsRevealed}/{TELEMETRY_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < TELEMETRY_PUZZLE.hints.length && (
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
            {TELEMETRY_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
