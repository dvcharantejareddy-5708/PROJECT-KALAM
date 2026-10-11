import React, { useState } from 'react';
import { TIMELINE_EVENTS, TIMELINE_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Sparkles
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface TimelinePuzzleProps {
  isSolved: boolean;
  onSolve: (order: string[]) => void;
  soundEnabled: boolean;
  savedOrder?: string[];
  savedHintsRevealed?: number;
}

export const TimelinePuzzle: React.FC<TimelinePuzzleProps> = ({
  isSolved,
  onSolve,
  soundEnabled,
  savedOrder,
  savedHintsRevealed = 0
}) => {
  // Initial order: scrambled unless solved or saved
  const initialOrder = savedOrder && savedOrder.length === 5 
    ? savedOrder 
    : ['tl-1972', 'tl-1962', 'tl-1980', 'tl-1969', 'tl-1979'];

  const [order, setOrder] = useState<string[]>(initialOrder);
  const [hintsRevealed, setHintsRevealed] = useState(savedHintsRevealed);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: isSolved ? 'correct' : 'idle',
    message: isSolved ? TIMELINE_PUZZLE.explanation : ''
  });

  const getEvent = (id: string) => TIMELINE_EVENTS.find((e) => e.id === id)!;

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isSolved) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    sound.playClick(soundEnabled);
    const newOrder = [...order];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setOrder(newOrder);
  };

  const handleReset = () => {
    sound.playClick(soundEnabled);
    setOrder(['tl-1972', 'tl-1962', 'tl-1980', 'tl-1969', 'tl-1979']);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleSubmit = () => {
    if (isSolved) return;

    // Check if order matches correct indices 0, 1, 2, 3, 4
    const isCorrect = order.every((id, idx) => {
      const ev = getEvent(id);
      return ev.correctIndex === idx;
    });

    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: TIMELINE_PUZZLE.explanation
      });
      sound.playSuccess(soundEnabled);
      onSolve(order);
    } else {
      setFeedback({
        status: 'incorrect',
        message: 'The chronological sequence is incorrect. Examine the years and mission phases, from early DRDO work to the 1980 orbital launch.'
      });
      sound.playError(soundEnabled);
    }
  };

  return (
    <div className="kalam-panel" style={{ padding: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>PUZZLE A</span>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800 }}>
            {TIMELINE_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {TIMELINE_PUZZLE.instructions}
          </p>
        </div>

        {!isSolved && (
          <button
            onClick={handleReset}
            className="kalam-btn-secondary"
            style={{ fontSize: '11px', minHeight: '36px', padding: '6px 14px' }}
          >
            <RotateCcw size={13} /> Reset Order
          </button>
        )}
      </div>

      {/* Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {order.map((eventId, index) => {
          const ev = getEvent(eventId);
          const isFirst = index === 0;
          const isLast = index === order.length - 1;

          return (
            <div
              key={ev.id}
              style={{
                background: isSolved ? 'rgba(20, 37, 54, 0.95)' : 'var(--color-bg-secondary)',
                border: isSolved ? '1px solid var(--color-success)' : '1px solid rgba(214, 179, 106, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#0E1A26',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  fontSize: '13px',
                  color: 'var(--color-gold)',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>{ev.year}</span>
                    <h4 className="font-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                      {ev.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {ev.description}
                  </p>
                </div>
              </div>

              {!isSolved && (
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button
                    disabled={isFirst}
                    onClick={() => moveItem(index, 'up')}
                    className="kalam-icon-btn"
                    style={{ width: '32px', height: '32px' }}
                    title="Move earlier"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    disabled={isLast}
                    onClick={() => moveItem(index, 'down')}
                    className="kalam-icon-btn"
                    style={{ width: '32px', height: '32px' }}
                    title="Move later"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {!isSolved ? (
          <button
            onClick={handleSubmit}
            className="kalam-btn-primary"
            style={{ padding: '0 28px' }}
          >
            <Send size={15} />
            <span>Verify Timeline Sequence</span>
          </button>
        ) : (
          <div className="kalam-badge-success" style={{ padding: '8px 16px', fontSize: '12px' }}>
            <CheckCircle2 size={16} />
            <span>Timeline Verified & Solved</span>
          </div>
        )}
      </div>

      {/* Hints */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(214, 179, 106, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            Timeline Hints ({hintsRevealed}/{TIMELINE_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < TIMELINE_PUZZLE.hints.length && (
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
            {TIMELINE_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
              {feedback.status === 'correct' ? 'Timeline Sequence Confirmed!' : 'Sequence Incomplete'}
            </strong>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
