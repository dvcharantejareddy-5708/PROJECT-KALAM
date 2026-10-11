import React, { useState } from 'react';
import { TIMELINE_EVENTS, TIMELINE_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface TimelinePuzzleProps {
  isSolved: boolean;
  onSolve: (order: string[]) => void;
  soundEnabled: boolean;
  savedOrder?: string[];
  savedHintsRevealed?: number;
  onOpenEvidence?: (id: string) => void;
}

const DEFAULT_SCRAMBLED_TIMELINE = [
  'tl-1972',
  'tl-1962',
  'tl-1980',
  'tl-1969',
  'tl-1979'
];

export const TimelinePuzzle: React.FC<TimelinePuzzleProps> = ({
  isSolved,
  onSolve,
  soundEnabled,
  savedOrder,
  savedHintsRevealed = 0,
  onOpenEvidence
}) => {
  const sanitizeOrder = (incoming?: string[]): string[] => {
    if (!incoming || incoming.length !== 5) return DEFAULT_SCRAMBLED_TIMELINE;
    const allValid = incoming.every((id) => TIMELINE_EVENTS.some((e) => e.id === id));
    return allValid ? incoming : DEFAULT_SCRAMBLED_TIMELINE;
  };

  const [order, setOrder] = useState<string[]>(() => sanitizeOrder(savedOrder));
  const [selectedForSwap, setSelectedForSwap] = useState<string | null>(null);
  const [hintsRevealed, setHintsRevealed] = useState(savedHintsRevealed);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
    correctIndices?: number[];
  }>({
    status: isSolved ? 'correct' : 'idle',
    message: isSolved ? TIMELINE_PUZZLE.explanation : ''
  });

  const getEvent = (id: string) => {
    return TIMELINE_EVENTS.find((e) => e.id === id) || TIMELINE_EVENTS[0];
  };

  // Mobile tap-to-select and tap-to-swap
  const handleCardClick = (id: string) => {
    if (isSolved) return;
    sound.playClick(soundEnabled);

    if (!selectedForSwap) {
      setSelectedForSwap(id);
    } else if (selectedForSwap === id) {
      setSelectedForSwap(null);
    } else {
      const idxA = order.indexOf(selectedForSwap);
      const idxB = order.indexOf(id);
      if (idxA !== -1 && idxB !== -1) {
        const newOrder = [...order];
        newOrder[idxA] = id;
        newOrder[idxB] = selectedForSwap;
        setOrder(newOrder);
      }
      setSelectedForSwap(null);
      if (feedback.status === 'incorrect') {
        setFeedback({ status: 'idle', message: '' });
      }
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSolved) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    sound.playClick(soundEnabled);
    const newOrder = [...order];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setOrder(newOrder);
    setSelectedForSwap(null);
    if (feedback.status === 'incorrect') {
      setFeedback({ status: 'idle', message: '' });
    }
  };

  const handleReset = () => {
    sound.playClick(soundEnabled);
    setOrder(DEFAULT_SCRAMBLED_TIMELINE);
    setSelectedForSwap(null);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleSubmit = () => {
    if (isSolved) return;

    const correctIndices: number[] = [];
    order.forEach((id, idx) => {
      const ev = getEvent(id);
      if (ev.correctIndex === idx) {
        correctIndices.push(idx);
      }
    });

    const isAllCorrect = correctIndices.length === 5;

    if (isAllCorrect) {
      setFeedback({
        status: 'correct',
        message: TIMELINE_PUZZLE.explanation,
        correctIndices: [0, 1, 2, 3, 4]
      });
      sound.playSuccess(soundEnabled);
      onSolve(order);
    } else {
      const inPositionTitles = correctIndices
        .map((idx) => `Milestone #${idx + 1} (${getEvent(order[idx]).title})`)
        .join(', ');

      const partialMessage = correctIndices.length > 0
        ? `Partial Chronology: ${correctIndices.length} of 5 milestones in correct historical order (${inPositionTitles}). Review the foundation dates and incident reports in the archive.`
        : 'Chronology mismatch. Examine Dr. Kalam’s appointment records, the ISRO formation history, and the 1979/1980 flight reports to reconstruct the sequence.';

      setFeedback({
        status: 'incorrect',
        message: partialMessage,
        correctIndices
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
            <span className="kalam-badge-gold">PUZZLE A</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
              HISTORICAL CHRONOLOGY DEVIATION
            </span>
          </div>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0' }}>
            {TIMELINE_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
            {TIMELINE_PUZZLE.instructions}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {onOpenEvidence && (
            <button
              onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-folder'); }}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
              title="Examine Historical Records"
            >
              <BookOpen size={14} />
              <span>Consult Archive Records</span>
            </button>
          )}

          {!isSolved && (
            <button
              onClick={handleReset}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
              title="Reset order"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Tap-to-Swap Banner */}
      {!isSolved && (
        <div style={{
          background: selectedForSwap ? 'rgba(214, 179, 106, 0.15)' : 'rgba(20, 37, 54, 0.7)',
          border: selectedForSwap ? '1px solid var(--color-gold)' : '1px solid rgba(214, 179, 106, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '12px',
          color: selectedForSwap ? 'var(--color-gold)' : 'var(--color-aged-paper)',
          transition: 'all 0.2s ease'
        }}>
          <ArrowUpDown size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          <span>
            {selectedForSwap ? (
              <>
                Selected: <strong>{getEvent(selectedForSwap).title}</strong>. Now tap another milestone to swap chronological positions.
              </>
            ) : (
              <>
                <strong>Tap-to-Swap:</strong> Tap any milestone card to select it, then tap another to swap. Or use the <strong>▲ / ▼</strong> buttons.
              </>
            )}
          </span>
        </div>
      )}

      {/* Timeline Milestones List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {order.map((eventId, index) => {
          const ev = getEvent(eventId);
          const isFirst = index === 0;
          const isLast = index === order.length - 1;
          const isSelected = selectedForSwap === eventId;
          const isCorrectPosition = feedback.correctIndices?.includes(index);

          return (
            <div
              key={ev.id}
              onClick={() => handleCardClick(ev.id)}
              role="button"
              tabIndex={0}
              aria-label={`Milestone ${index + 1}: ${ev.title}`}
              style={{
                background: isSelected
                  ? 'rgba(90, 58, 30, 0.9)'
                  : isSolved
                  ? 'rgba(20, 37, 54, 0.95)'
                  : isCorrectPosition
                  ? 'rgba(30, 55, 40, 0.85)'
                  : 'var(--color-bg-secondary)',
                border: isSelected
                  ? '2px solid var(--color-gold)'
                  : isSolved
                  ? '1px solid var(--color-success)'
                  : isCorrectPosition
                  ? '1px solid #81C784'
                  : '1px solid rgba(214, 179, 106, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                cursor: isSolved ? 'default' : 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? 'var(--shadow-gold)' : undefined,
                minHeight: '68px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                {/* Chronological Slot Pin */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCorrectPosition ? 'rgba(56, 142, 60, 0.3)' : '#0E1A26',
                  border: isCorrectPosition ? '2px solid #81C784' : '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: isCorrectPosition ? '#81C784' : 'var(--color-gold)',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {/* Crucial fix: DO NOT expose exact date on unsolved card; show era badge or verified date when solved */}
                    {isSolved ? (
                      <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>
                        {ev.year}
                      </span>
                    ) : (
                      <span className="kalam-badge-gold" style={{ fontSize: '9px', opacity: 0.9 }}>
                        {ev.eraTag || 'Historical Era'}
                      </span>
                    )}

                    <h4 className="font-heading" style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--color-text-light)',
                      margin: 0
                    }}>
                      {ev.title}
                    </h4>

                    {isCorrectPosition && !isSolved && (
                      <span style={{ fontSize: '10px', color: '#81C784', fontWeight: 600 }}>
                        ✓ In Chronological Slot
                      </span>
                    )}
                  </div>

                  <p style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {ev.description}
                  </p>
                </div>
              </div>

              {/* Move Buttons (Touch targets >= 44x44) */}
              {!isSolved && (
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                  <button
                    disabled={isFirst}
                    onClick={(e) => moveItem(index, 'up', e)}
                    className="kalam-icon-btn"
                    style={{
                      width: '44px',
                      height: '44px',
                      opacity: isFirst ? 0.3 : 1
                    }}
                    title="Move earlier in chronology"
                    aria-label={`Move ${ev.title} earlier`}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    disabled={isLast}
                    onClick={(e) => moveItem(index, 'down', e)}
                    className="kalam-icon-btn"
                    style={{
                      width: '44px',
                      height: '44px',
                      opacity: isLast ? 0.3 : 1
                    }}
                    title="Move later in chronology"
                    aria-label={`Move ${ev.title} later`}
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Strip: Verification & Retry */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(214, 179, 106, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          {isSolved ? (
            <span style={{ color: '#81C784', fontWeight: 600 }}>
              Chronology fully verified: 1962 to 1980 orbital insertion.
            </span>
          ) : (
            <span>Deduce chronological sequence by comparing archival records.</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {!isSolved ? (
            <>
              {feedback.status === 'incorrect' && (
                <button
                  onClick={() => setFeedback({ status: 'idle', message: '' })}
                  className="kalam-btn-secondary"
                  style={{ minHeight: '44px', padding: '0 16px', fontSize: '12px' }}
                >
                  <RotateCcw size={14} />
                  <span>Retry Timeline</span>
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="kalam-btn-primary"
                style={{ minHeight: '44px', padding: '0 26px', fontSize: '13px' }}
              >
                <Send size={15} />
                <span>Verify Timeline Sequence</span>
              </button>
            </>
          ) : (
            <div className="kalam-badge-success" style={{ padding: '10px 18px', fontSize: '13px' }}>
              <CheckCircle2 size={16} />
              <span>Timeline Verified & Solved</span>
            </div>
          )}
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
              {feedback.status === 'correct' ? 'Chronological Progression Confirmed!' : 'Chronological Alignment Incomplete'}
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
            Investigation Assistance ({hintsRevealed}/{TIMELINE_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < TIMELINE_PUZZLE.hints.length && (
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
            {TIMELINE_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
