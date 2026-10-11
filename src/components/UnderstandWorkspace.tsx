import React, { useState } from 'react';
import { FACT_INTERPRETATION_ITEMS, REASONING_QUESTIONS } from '../data/understandData';
import { ENDINGS_DATA } from '../data/endingsData';
import { EndingType } from '../types';
import { 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import { sound } from '../utils/sound';

interface UnderstandWorkspaceProps {
  factsVerified: boolean;
  reasoningAnswers: Record<string, string>;
  reasoningComplete: boolean;
  chosenReflection: EndingType | null;
  onVerifyFacts: () => void;
  onAnswerReasoning: (questionId: string, optionId: string) => void;
  onChooseReflection: (ending: EndingType) => void;
  onProceedToUnlock: () => void;
  onOpenJournal: () => void;
  soundEnabled: boolean;
}

export const UnderstandWorkspace: React.FC<UnderstandWorkspaceProps> = ({
  factsVerified,
  reasoningAnswers,
  reasoningComplete,
  chosenReflection,
  onVerifyFacts,
  onAnswerReasoning,
  onChooseReflection,
  onProceedToUnlock,
  onOpenJournal,
  soundEnabled
}) => {
  // Fact vs Interpretation player choices state
  const [fiUserAnswers, setFiUserAnswers] = useState<Record<string, 'fact' | 'interpretation'>>({});
  const [fiSubmitted, setFiSubmitted] = useState<boolean>(factsVerified);

  const handleFiSelect = (id: string, type: 'fact' | 'interpretation') => {
    if (fiSubmitted) return;
    sound.playClick(soundEnabled);
    setFiUserAnswers((prev) => ({ ...prev, [id]: type }));
  };

  const handleFiSubmit = () => {
    if (fiSubmitted) return;

    // Check all 4 answered
    if (Object.keys(fiUserAnswers).length < FACT_INTERPRETATION_ITEMS.length) {
      sound.playError(soundEnabled);
      return;
    }

    // Verify correctness
    const allCorrect = FACT_INTERPRETATION_ITEMS.every(
      (item) => fiUserAnswers[item.id] === item.type
    );

    if (allCorrect) {
      sound.playSuccess(soundEnabled);
      setFiSubmitted(true);
      onVerifyFacts();
    } else {
      sound.playError(soundEnabled);
    }
  };

  // Reasoning selection
  const handleSelectReasoningOption = (qId: string, optId: string) => {
    sound.playClick(soundEnabled);
    onAnswerReasoning(qId, optId);
  };

  const isStageFullyComplete = fiSubmitted && reasoningComplete && chosenReflection !== null;

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div className="kalam-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="kalam-badge-gold">Stage 4: Understand</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Historical Synthesis & Reflection</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800 }}>
              Historical Reasoning & Moral Deduction
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '720px', marginTop: '4px' }}>
              Interpret the evidence beyond raw numbers. Distinguish archival facts from historical deductions, 
              answer three core mission reasoning questions, and choose your personal reflection to unlock your ending.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { sound.playClick(soundEnabled); onOpenJournal(); }}
              className="kalam-btn-secondary"
              style={{ fontSize: '11px', minHeight: '38px', padding: '6px 14px' }}
            >
              <BookOpen size={13} /> View Evidence Journal
            </button>

            {isStageFullyComplete && (
              <button
                onClick={() => {
                  sound.playSuccess(soundEnabled);
                  onProceedToUnlock();
                }}
                className="kalam-btn-primary"
                style={{ height: '48px', padding: '0 24px' }}
              >
                <span>Proceed to Stage 5 (Unlock Ending)</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: FACT VERSUS INTERPRETATION */}
      <div className="kalam-panel" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>Task 1 of 3</span>
          <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 800 }}>
            Distinguish Documented Facts from Historical Deductions
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Classify each archival statement as either a <strong>Verified Fact</strong> (documented in ISRO logs) or an <strong>Historical Interpretation</strong> (deduced meaning).
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FACT_INTERPRETATION_ITEMS.map((item) => {
            const userAnswer = fiUserAnswers[item.id];
            const isCorrect = fiSubmitted && userAnswer === item.type;

            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: fiSubmitted 
                    ? isCorrect ? '1px solid var(--color-success)' : '1px solid var(--color-error)'
                    : '1px solid rgba(214, 179, 106, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
                    "{item.statement}"
                  </p>
                  {fiSubmitted && (
                    <span style={{ fontSize: '11px', color: isCorrect ? '#81C784' : '#EF9A9A', marginTop: '4px', display: 'block' }}>
                      {item.explanation}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    disabled={fiSubmitted}
                    onClick={() => handleFiSelect(item.id, 'fact')}
                    className={userAnswer === 'fact' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
                    style={{ minHeight: '44px', padding: '8px 16px', fontSize: '12px' }}
                  >
                    Documented Fact
                  </button>
                  <button
                    disabled={fiSubmitted}
                    onClick={() => handleFiSelect(item.id, 'interpretation')}
                    className={userAnswer === 'interpretation' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
                    style={{ minHeight: '44px', padding: '8px 16px', fontSize: '12px' }}
                  >
                    Interpretation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!fiSubmitted && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              onClick={handleFiSubmit}
              className="kalam-btn-primary"
              style={{ padding: '0 24px' }}
            >
              <span>Validate Classifications</span>
            </button>
          </div>
        )}
      </div>

      {/* SECTION 2: THREE REASONING QUESTIONS */}
      <div className="kalam-panel" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>Task 2 of 3</span>
          <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 800 }}>
            Core Historical Reasoning Queries
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Demonstrate your comprehension of the technological choices and institutional leadership behind SLV-3.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {REASONING_QUESTIONS.map((rq, qIdx) => {
            const selectedOptId = reasoningAnswers[rq.id];

            return (
              <div key={rq.id} style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.25)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Query #{qIdx + 1}
                </span>
                <h4 className="font-heading" style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
                  {rq.question}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rq.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectReasoningOption(rq.id, opt.id)}
                        style={{
                          background: isSelected 
                            ? opt.isCorrect ? 'rgba(56, 142, 60, 0.2)' : 'rgba(211, 47, 47, 0.2)'
                            : 'var(--color-bg-secondary)',
                          border: isSelected
                            ? opt.isCorrect ? '1px solid var(--color-success)' : '1px solid var(--color-error)'
                            : '1px solid rgba(214, 179, 106, 0.2)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <p style={{ fontSize: '12px', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
                          {opt.text}
                        </p>
                        {isSelected && (
                          <span style={{ fontSize: '11px', color: opt.isCorrect ? '#81C784' : '#EF9A9A', marginTop: '6px', display: 'block' }}>
                            {opt.explanation}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: PERSONAL REFLECTION & ENDING SELECTION */}
      <div className="kalam-panel" style={{ padding: '24px' }}>
        <div style={{ borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
          <span className="kalam-badge-gold" style={{ marginBottom: '4px' }}>Task 3 of 3 • Ending Path</span>
          <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 800 }}>
            Choose Your Investigative Reflection
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Select the historical truth that most profoundly resonates with your investigation. Your choice determines the chapter ending.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {(['true_seeker', 'dream_believer', 'ignited_mind'] as EndingType[]).map((type) => {
            const ending = ENDINGS_DATA[type];
            const isSelected = chosenReflection === type;

            return (
              <div
                key={type}
                onClick={() => {
                  sound.playClick(soundEnabled);
                  onChooseReflection(type);
                }}
                className="kalam-panel"
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  background: isSelected ? 'var(--color-bronze)' : 'var(--color-bg-secondary)',
                  border: isSelected ? '2px solid var(--color-gold)' : '1px solid rgba(214, 179, 106, 0.3)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <span className="kalam-badge-gold" style={{ fontSize: '9px', marginBottom: '6px' }}>
                    {ending.subtitle}
                  </span>
                  <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-light)' }}>
                    {ending.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                    {ending.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(214, 179, 106, 0.2)', paddingTop: '10px' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--color-gold)' }}>
                    "{ending.quote}"
                  </p>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                    {isSelected ? '✓ Selected Reflection' : 'Click to select this path'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advance Button */}
        {isStageFullyComplete && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={() => {
                sound.playSuccess(soundEnabled);
                onProceedToUnlock();
              }}
              className="kalam-btn-primary"
              style={{ height: '48px', padding: '0 28px' }}
            >
              <span>Unlock Chapter 3 Ending</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
