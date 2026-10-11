import React, { useState } from 'react';
import { LAUNCH_STAGES, DIAGRAM_PUZZLE } from '../../data/puzzlesData';
import { 
  CheckCircle2, 
  XCircle, 
  Send, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  FileText,
  ArrowUpDown
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

const DEFAULT_SCRAMBLED_ORDER = [
  'stage-liftoff',
  'stage-check',
  'stage-insertion',
  'stage-ignition',
  'stage-fueling',
  'stage-separation'
];

export const DiagramPuzzle: React.FC<DiagramPuzzleProps> = ({
  isSolved,
  onSolve,
  onOpenEvidence,
  soundEnabled,
  savedOrder,
  savedHintsRevealed = 0
}) => {
  // Sanitize saved order: ensure all 6 stages exist and are valid LAUNCH_STAGES ids
  const sanitizeOrder = (incoming?: string[]): string[] => {
    if (!incoming || incoming.length !== 6) return DEFAULT_SCRAMBLED_ORDER;
    const allValid = incoming.every((id) => LAUNCH_STAGES.some((s) => s.id === id));
    return allValid ? incoming : DEFAULT_SCRAMBLED_ORDER;
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
    message: isSolved ? DIAGRAM_PUZZLE.explanation : ''
  });

  const getStage = (id: string) => {
    return LAUNCH_STAGES.find((s) => s.id === id) || LAUNCH_STAGES[0];
  };

  // Tap-to-select and tap-to-swap mechanism (Mobile-friendly)
  const handleCardClick = (id: string) => {
    if (isSolved) return;
    sound.playClick(soundEnabled);

    if (!selectedForSwap) {
      setSelectedForSwap(id);
    } else if (selectedForSwap === id) {
      setSelectedForSwap(null);
    } else {
      // Swap the two items
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

  // Directional move buttons
  const moveStage = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSolved) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= order.length) return;

    sound.playClick(soundEnabled);
    const newOrder = [...order];
    const temp = newOrder[index];
    newOrder[index] = newOrder[target];
    newOrder[target] = temp;
    setOrder(newOrder);
    setSelectedForSwap(null);
    if (feedback.status === 'incorrect') {
      setFeedback({ status: 'idle', message: '' });
    }
  };

  const handleReset = () => {
    sound.playClick(soundEnabled);
    setOrder(DEFAULT_SCRAMBLED_ORDER);
    setSelectedForSwap(null);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleSubmit = () => {
    if (isSolved) return;

    // Check which stages match their correct step number (1 to 6)
    const correctIndices: number[] = [];
    order.forEach((id, idx) => {
      const stage = getStage(id);
      if (stage.stepNumber === idx + 1) {
        correctIndices.push(idx);
      }
    });

    const isAllCorrect = correctIndices.length === 6;

    if (isAllCorrect) {
      setFeedback({
        status: 'correct',
        message: DIAGRAM_PUZZLE.explanation,
        correctIndices: [0, 1, 2, 3, 4, 5]
      });
      sound.playSuccess(soundEnabled);
      onSolve(order);
    } else {
      const inPositionStages = correctIndices
        .map((idx) => `Step ${idx + 1} (${getStage(order[idx]).name})`)
        .join(', ');

      const partialFeedbackMessage = correctIndices.length > 0
        ? `Partial Sequence Alignment: ${correctIndices.length} of 6 phases currently in correct position (${inPositionStages}). The remaining stages need to be rearranged.`
        : 'All 6 stages are currently out of order. Consult the Launch Sequence Protocol Sheet (-60m check to +420s payload insertion).';

      setFeedback({
        status: 'incorrect',
        message: partialFeedbackMessage,
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
            <span className="kalam-badge-gold">PUZZLE D</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
              AUTONOMOUS FLIGHT SEQUENCER
            </span>
          </div>
          <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0' }}>
            {DIAGRAM_PUZZLE.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
            {DIAGRAM_PUZZLE.instructions}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenEvidence('ev-launch-sequence'); }}
            className="kalam-btn-secondary"
            style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
            title="Examine Launch Sequence Protocol Sheet"
          >
            <FileText size={14} />
            <span>Consult Sequence Sheet</span>
          </button>

          {!isSolved && (
            <button
              onClick={handleReset}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '44px', padding: '8px 14px' }}
              title="Reset order to default scrambled arrangement"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Touch-Friendly Interaction Guide */}
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
                Selected: <strong>{getStage(selectedForSwap).name}</strong>. Now tap another stage to swap their sequence positions.
              </>
            ) : (
              <>
                <strong>Tap-to-Swap:</strong> Tap any stage to select it, then tap another to swap. Or use the <strong>▲ / ▼</strong> buttons to move.
              </>
            )}
          </span>
        </div>
      )}

      {/* Main Grid: Blueprint Schematic & Stages */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Blueprint Schematic */}
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
            SLV-3 Multi-Stage Flight Architecture
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
              src="/assets/blueprint_slv3.jpg" 
              alt="Launch Blueprint" 
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                filter: 'contrast(115%)'
              }} 
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
            4 Solid Propellant Stages • Autonomous Pyrotechnic Staging Sequencer
          </span>
        </div>

        {/* Right Column: Ordered Sequence Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {order.map((stageId, index) => {
            const stage = getStage(stageId);
            const isFirst = index === 0;
            const isLast = index === order.length - 1;
            const isSelected = selectedForSwap === stageId;
            const isCorrectPosition = feedback.correctIndices?.includes(index);

            return (
              <div
                key={stage.id}
                onClick={() => handleCardClick(stage.id)}
                role="button"
                tabIndex={0}
                aria-label={`Step ${index + 1}: ${stage.name}`}
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
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: isSolved ? 'default' : 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : undefined,
                  minHeight: '64px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  {/* Step Sequence Badge */}
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: isCorrectPosition ? 'rgba(56, 142, 60, 0.3)' : '#0E1A26',
                    border: isCorrectPosition ? '2px solid #81C784' : '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '13px',
                    color: isCorrectPosition ? '#81C784' : 'var(--color-gold)',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h4 className="font-heading" style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--color-text-light)',
                        margin: 0
                      }}>
                        {stage.name}
                      </h4>
                      {isCorrectPosition && !isSolved && (
                        <span style={{ fontSize: '10px', color: '#81C784', fontWeight: 600 }}>
                          ✓ In Position
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      marginTop: '3px',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Move Controls (Touch targets >= 44x44) */}
                {!isSolved && (
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={isFirst}
                      onClick={(e) => moveStage(index, 'up', e)}
                      className="kalam-icon-btn"
                      style={{
                        width: '44px',
                        height: '44px',
                        opacity: isFirst ? 0.3 : 1
                      }}
                      title="Move earlier in countdown"
                      aria-label={`Move ${stage.name} earlier`}
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      disabled={isLast}
                      onClick={(e) => moveStage(index, 'down', e)}
                      className="kalam-icon-btn"
                      style={{
                        width: '44px',
                        height: '44px',
                        opacity: isLast ? 0.3 : 1
                      }}
                      title="Move later in countdown"
                      aria-label={`Move ${stage.name} later`}
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
              Flight countdown sequence confirmed (Steps 1 to 6).
            </span>
          ) : (
            <span>Arrange all 6 flight phases in precise countdown sequence.</span>
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
                  <span>Retry Sequence</span>
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="kalam-btn-primary"
                style={{ minHeight: '44px', padding: '0 26px', fontSize: '13px' }}
              >
                <Send size={15} />
                <span>Verify Launch Sequence</span>
              </button>
            </>
          ) : (
            <div className="kalam-badge-success" style={{ padding: '10px 18px', fontSize: '13px' }}>
              <CheckCircle2 size={16} />
              <span>Launch Sequence Verified</span>
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
              {feedback.status === 'correct' ? 'Flight Sequence Validated!' : 'Sequence Alignment Mismatch'}
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
            Investigation Assistance ({hintsRevealed}/{DIAGRAM_PUZZLE.hints.length})
          </span>
          {!isSolved && hintsRevealed < DIAGRAM_PUZZLE.hints.length && (
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
            {DIAGRAM_PUZZLE.hints.slice(0, hintsRevealed).map((h, i) => (
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
