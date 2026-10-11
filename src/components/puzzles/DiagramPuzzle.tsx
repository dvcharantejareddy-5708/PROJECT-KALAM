import React, { useState } from 'react';
import { LAUNCH_STAGES, DIAGRAM_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface DiagramPuzzleProps {
  isSolved: boolean;
  onSolve: (order: string[]) => void;
  onOpenEvidence: (id: string) => void;
  soundEnabled: boolean;
  savedOrder?: string[];
  savedHintsRevealed?: number;
}

export const DiagramPuzzle: React.FC<DiagramPuzzleProps> = ({
  isSolved,
  onSolve,
  onOpenEvidence,
  soundEnabled,
  savedOrder,
  savedHintsRevealed = 0
}) => {
  // Scrambled initial order: System Check, Ignition, Fuelling, Lift-off, Payload, Stage Separation
  const initialOrder = savedOrder && savedOrder.length === 6 
    ? savedOrder 
    : ['stage-liftoff', 'stage-check', 'stage-insertion', 'stage-ignition', 'stage-fueling', 'stage-separation'];

  const [order, setOrder] = useState<string[]>(initialOrder);
  const [hintsRevealed, setHintsRevealed] = useState(savedHintsRevealed);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: isSolved ? 'correct' : 'idle',
    message: isSolved ? DIAGRAM_PUZZLE.explanation : ''
  });

  const getStage = (id: string) => LAUNCH_STAGES.find((s) => s.id === id)!;

  const moveStage = (index: number, direction: 'up' | 'down') => {
    if (isSolved) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= order.length) return;

    sound.playClick(soundEnabled);
    const newOrder = [...order];
    const temp = newOrder[index];
    newOrder[index] = newOrder[target];
    newOrder[target] = temp;
    setOrder(newOrder);
  };

  const handleReset = () => {
    sound.playClick(soundEnabled);
    setOrder(['stage-liftoff', 'stage-check', 'stage-insertion', 'stage-ignition', 'stage-fueling', 'stage-separation']);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleSubmit = () => {
    if (isSolved) return;

    // Check if stages match steps 1 to 6
    const isCorrect = order.every((id, idx) => {
      const stage = getStage(id);
      return stage.stepNumber === idx + 1;
    });

    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: DIAGRAM_PUZZLE.explanation
      });
      sound.playSuccess(soundEnabled);
      onSolve(order);
    } else {
      setFeedback({
        status: 'incorrect',
        message: 'Launch sequence sequence mismatch. Consult the Launch Sequence Protocol Sheet in the archive (Step 1 to 6).'
      });
      sound.playError(soundEnabled);
    }
  };

  return (
    <div className="kalam-panel" style={{ padding: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>PUZZLE D</span>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800 }}>
            {DIAGRAM_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {DIAGRAM_PUZZLE.instructions}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-launch-sequence'); }}
            className="kalam-btn-secondary"
            style={{ fontSize: '11px', minHeight: '36px', padding: '6px 14px' }}
          >
            <FileText size={13} /> View Sequence Sheet
          </button>
          {!isSolved && (
            <button
              onClick={handleReset}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '36px', padding: '6px 12px' }}
              title="Reset order"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Blueprint Visual & Reorderable Flight Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Blueprint Schematic */}
        <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
            SLV-3 Multi-Stage Flight Architecture
          </span>
          <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/assets/blueprint_slv3.jpg" 
              alt="Launch Blueprint" 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'contrast(115%)' }} 
            />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            4 Solid Propellant Stages • Autonomous Pyrotechnic Staging
          </span>
        </div>

        {/* Right Column: Ordered Sequence Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {order.map((stageId, index) => {
            const stage = getStage(stageId);
            const isFirst = index === 0;
            const isLast = index === order.length - 1;

            return (
              <div
                key={stage.id}
                style={{
                  background: isSolved ? 'rgba(20, 37, 54, 0.95)' : 'var(--color-bg-secondary)',
                  border: isSolved ? '1px solid var(--color-success)' : '1px solid rgba(214, 179, 106, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#0E1A26',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: 'var(--color-gold)',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-heading" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                      {stage.name}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {stage.description}
                    </p>
                  </div>
                </div>

                {!isSolved && (
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button
                      disabled={isFirst}
                      onClick={() => moveStage(index, 'up')}
                      className="kalam-icon-btn"
                      style={{ width: '32px', height: '32px' }}
                      title="Move earlier"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      disabled={isLast}
                      onClick={() => moveStage(index, 'down')}
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
      </div>

      {/* Verification Submit Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {!isSolved ? (
          <button
            onClick={handleSubmit}
            className="kalam-btn-primary"
            style={{ padding: '0 28px' }}
          >
            <Send size={15} />
            <span>Verify Launch Sequence</span>
          </button>
        ) : (
          <div className="kalam-badge-success" style={{ padding: '8px 16px', fontSize: '12px' }}>
            <CheckCircle2 size={16} />
            <span>Launch Sequence Verified</span>
          </div>
        )}
      </div>

      {/* Hints Section */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(214, 179, 106, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            Sequence Hints ({hintsRevealed}/{DIAGRAM_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < DIAGRAM_PUZZLE.hints.length && (
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
            {DIAGRAM_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
              {feedback.status === 'correct' ? 'Sequence Confirmed!' : 'Sequence Incorrect'}
            </strong>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
