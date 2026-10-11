import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { TIMELINE_EVENTS } from '../data/puzzlesData';
import { REQUIRED_CONNECTIONS, CONNECTION_NODES } from '../data/connectionsData';
import { 
  BookOpen, 
  X, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  GitFork, 
  Award, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/sound';

type JournalCategory = 'evidence' | 'puzzles' | 'timeline' | 'connections' | 'conclusions';

interface EvidenceJournalProps {
  evidenceList: EvidenceItem[];
  collectedIds: string[];
  solvedPuzzleIds: string[];
  verifiedConnectionsCount: number;
  deductionCompleted: boolean;
  onInspectItem: (item: EvidenceItem) => void;
  onClose: () => void;
  soundEnabled: boolean;
}

export const EvidenceJournal: React.FC<EvidenceJournalProps> = ({
  evidenceList,
  collectedIds,
  solvedPuzzleIds,
  verifiedConnectionsCount,
  onInspectItem,
  onClose,
  soundEnabled
}) => {
  const [activeCategory, setActiveCategory] = useState<JournalCategory>('evidence');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    collectedIds.length > 0 ? collectedIds[0] : null
  );

  const collectedEvidence = evidenceList.filter((e) => collectedIds.includes(e.id));
  const unexaminedEvidence = evidenceList.filter((e) => !collectedIds.includes(e.id));
  const selectedEvidence = evidenceList.find((e) => e.id === selectedItemId);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 100
    }} className="animate-fade-in">
      <div 
        className="kalam-panel"
        style={{
          width: '100%',
          maxWidth: '1080px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '2px solid rgba(214, 179, 106, 0.5)'
        }}
        role="dialog"
        aria-labelledby="journal-title"
      >
        {/* Header */}
        <div style={{
          padding: '12px 20px',
          background: '#142536',
          borderBottom: '1px solid rgba(214, 179, 106, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bronze)',
              border: '1px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold)'
            }}>
              <BookOpen size={16} />
            </div>
            <div>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>
                Archival Record Dossier
              </span>
              <h2 id="journal-title" className="font-heading" style={{ fontSize: '16px', fontWeight: 800 }}>
                Evidence Journal — Space Dreamer
              </h2>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(soundEnabled); onClose(); }}
            className="kalam-icon-btn"
            style={{ width: '32px', height: '32px' }}
            title="Close Journal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '8px 20px',
          background: '#0E1A26',
          borderBottom: '1px solid rgba(214, 179, 106, 0.2)',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveCategory('evidence'); }}
            className={activeCategory === 'evidence' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
          >
            <Layers size={13} />
            <span>Collected Records ({collectedEvidence.length}/{evidenceList.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveCategory('puzzles'); }}
            className={activeCategory === 'puzzles' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
          >
            <CheckCircle2 size={13} />
            <span>Solved Puzzles ({solvedPuzzleIds.length}/4)</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveCategory('timeline'); }}
            className={activeCategory === 'timeline' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
          >
            <Calendar size={13} />
            <span>Mission Timeline</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveCategory('connections'); }}
            className={activeCategory === 'connections' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
          >
            <GitFork size={13} />
            <span>Verified Links ({verifiedConnectionsCount}/5)</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setActiveCategory('conclusions'); }}
            className={activeCategory === 'conclusions' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
            style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
          >
            <Award size={13} />
            <span>Historical Legacy</span>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* TAB 1: EVIDENCE */}
          {activeCategory === 'evidence' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Evidence Index */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Catalogued Evidence Records
                </span>

                {collectedEvidence.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => { sound.playClick(soundEnabled); setSelectedItemId(item.id); }}
                    style={{
                      padding: '10px 14px',
                      background: selectedItemId === item.id ? 'var(--color-bronze)' : 'var(--color-bg-secondary)',
                      border: selectedItemId === item.id ? '1px solid var(--color-gold)' : '1px solid rgba(214, 179, 106, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={item.assetUrl} alt={item.title} style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {item.category.toUpperCase()} • {item.date || '1977'}
                      </span>
                    </div>
                  </div>
                ))}

                {unexaminedEvidence.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(214, 179, 106, 0.15)' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                      Uncollected Items ({unexaminedEvidence.length})
                    </span>
                    {unexaminedEvidence.map((u) => (
                      <div key={u.id} style={{ padding: '6px 10px', border: '1px dashed rgba(214, 179, 106, 0.2)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        {u.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail Inspection */}
              <div>
                {selectedEvidence ? (
                  <div className="kalam-panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(214, 179, 106, 0.2)', paddingBottom: '10px', marginBottom: '14px' }}>
                      <div>
                        <span className="kalam-badge-gold" style={{ fontSize: '9px' }}>{selectedEvidence.category}</span>
                        <h3 className="font-heading" style={{ fontSize: '16px', fontWeight: 800, marginTop: '4px' }}>
                          {selectedEvidence.title}
                        </h3>
                        {selectedEvidence.date && (
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>
                            {selectedEvidence.date}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onInspectItem(selectedEvidence)}
                        className="kalam-btn-secondary"
                        style={{ fontSize: '11px', minHeight: '32px', padding: '4px 10px' }}
                      >
                        <ExternalLink size={12} /> Inspect Detail
                      </button>
                    </div>

                    <div className="kalam-paper" style={{ padding: '14px', marginBottom: '14px' }}>
                      <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#221E1B', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontWeight: 600 }}>
                        {selectedEvidence.fullTranscription}
                      </pre>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', lineHeight: '1.5', marginBottom: '10px' }}>
                      {selectedEvidence.historicalContext}
                    </p>

                    <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(214, 179, 106, 0.15)', paddingTop: '6px' }}>
                      Source: {selectedEvidence.sourceAttribution}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '13px' }}>
                    Select an evidence record from the list to examine its full transcription.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SOLVED PUZZLES */}
          {activeCategory === 'puzzles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '780px', margin: '0 auto' }}>
              <div className="kalam-panel" style={{ padding: '16px' }}>
                <span className="kalam-badge-gold" style={{ fontSize: '9px' }}>Puzzle A Decoded</span>
                <h4 className="font-heading" style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>
                  Mission Timeline: INCOSPAR to Orbital Launch
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  1962 (INCOSPAR) → 1969 (ISRO) → 1972 (Space Commission) → 1979 (First Flight Setback) → 18 July 1980 (Rohini Orbit).
                </p>
              </div>

              <div className="kalam-panel" style={{ padding: '16px' }}>
                <span className="kalam-badge-gold" style={{ fontSize: '9px' }}>Puzzle B Deciphered</span>
                <h4 className="font-heading" style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>
                  Telemetry Transmission: "ROHINI"
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Decoded numeric beacon 18-15-8-9-14-9 confirming the 35 kg Rohini RS-1 satellite payload in orbit.
                </p>
              </div>

              <div className="kalam-panel" style={{ padding: '16px' }}>
                <span className="kalam-badge-gold" style={{ fontSize: '9px' }}>Puzzle C Verified</span>
                <h4 className="font-heading" style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>
                  Handwritten Guiding Principle: "Lesson"
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  "Every failure is a lesson. Every lesson brings us closer to success." — A.P.J. Abdul Kalam, 12 Aug 1977.
                </p>
              </div>

              <div className="kalam-panel" style={{ padding: '16px' }}>
                <span className="kalam-badge-gold" style={{ fontSize: '9px' }}>Puzzle D Reconstructed</span>
                <h4 className="font-heading" style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>
                  Autonomous Launch Sequence Protocol
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  1. System Check → 2. Fuelling → 3. Ignition → 4. Lift-off → 5. Stage Separation → 6. Payload Insertion.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE */}
          {activeCategory === 'timeline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '780px', margin: '0 auto' }}>
              {TIMELINE_EVENTS.map((ev, idx) => (
                <div key={ev.id} className="kalam-panel" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0E1A26', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-gold)', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>{ev.year}</span>
                    <h4 className="font-heading" style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                      {ev.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {ev.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CONNECTIONS */}
          {activeCategory === 'connections' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '780px', margin: '0 auto' }}>
              {REQUIRED_CONNECTIONS.map((rule, idx) => {
                const fromNode = CONNECTION_NODES.find(n => n.id === rule.fromId);
                const toNode = CONNECTION_NODES.find(n => n.id === rule.toId);

                return (
                  <div key={idx} className="kalam-panel" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
                      <span>{fromNode?.title}</span>
                      <span>↔</span>
                      <span>{toNode?.title}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', lineHeight: '1.4' }}>
                      {rule.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: CONCLUSIONS */}
          {activeCategory === 'conclusions' && (
            <div className="kalam-panel" style={{ padding: '24px', maxWidth: '780px', margin: '0 auto', fontSize: '13px', color: 'var(--color-aged-paper)', lineHeight: '1.6' }}>
              <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold)', marginBottom: '12px' }}>
                Historical Significance & The Kalam Model of Leadership
              </h3>
              <p style={{ marginBottom: '12px' }}>
                On <strong>18 July 1980</strong>, the SLV-3 E-02 launch placed the Rohini satellite into orbit, 
                making India the sixth nation capable of independent spaceflight.
              </p>
              <p style={{ marginBottom: '12px' }}>
                The mission set an enduring benchmark in technological leadership. When the 1979 flight failed, 
                ISRO Chairman Prof. Satish Dhawan took the blame at the press conference. When the 1980 flight triumphed, 
                Dhawan stepped back and asked Dr. Kalam to lead the national briefing.
              </p>
              <p>
                Dr. Kalam carried this lesson throughout his career—leading with humility, absorbing setbacks, 
                and celebrating team triumphs.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 20px',
          background: '#142536',
          borderTop: '1px solid rgba(214, 179, 106, 0.2)',
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0
        }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onClose(); }}
            className="kalam-btn-secondary"
            style={{ fontSize: '11px', minHeight: '34px', padding: '4px 16px' }}
          >
            Return to Investigation
          </button>
        </div>
      </div>
    </div>
  );
};
