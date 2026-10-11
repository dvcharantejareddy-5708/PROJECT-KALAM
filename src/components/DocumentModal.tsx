import React, { useEffect } from 'react';
import { EvidenceItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  BookmarkPlus, 
  Calendar, 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { sound } from '../utils/sound';

interface DocumentModalProps {
  item: EvidenceItem;
  onClose: () => void;
  onCollect: (id: string) => void;
  isCollected: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  soundEnabled: boolean;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  item,
  onClose,
  onCollect,
  isCollected,
  onPrev,
  onNext,
  soundEnabled
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
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
          maxWidth: '960px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '2px solid rgba(214, 179, 106, 0.5)'
        }}
        role="dialog"
        aria-labelledby="document-title"
      >
        {/* Header */}
        <div style={{
          padding: '12px 20px',
          background: '#142536',
          borderBottom: '1px solid rgba(214, 179, 106, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>
              {item.category.toUpperCase()}
            </span>
            <h2 id="document-title" className="font-heading" style={{ fontSize: '16px', fontWeight: 800 }}>
              {item.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isCollected && (
              <span className="kalam-badge-success" style={{ fontSize: '11px' }}>
                <CheckCircle2 size={12} /> In Journal
              </span>
            )}
            <button
              onClick={() => { sound.playClick(soundEnabled); onClose(); }}
              className="kalam-icon-btn"
              style={{ width: '32px', height: '32px' }}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          
          {/* Left Column: Visual Asset & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              background: '#0E1A26',
              border: '1px solid rgba(214, 179, 106, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              minHeight: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)'
            }}>
              <img
                src={item.assetUrl}
                alt={item.title}
                style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain', borderRadius: '2px' }}
              />
            </div>

            <div style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px',
              background: 'rgba(20, 37, 54, 0.7)',
              border: '1px solid rgba(214, 179, 106, 0.2)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              color: 'var(--color-text-muted)'
            }}>
              {item.date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Calendar size={12} style={{ color: 'var(--color-gold)' }} />
                  <span>Recorded Date: <strong style={{ color: 'var(--color-text-light)' }}>{item.date}</strong></span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <Info size={12} style={{ color: 'var(--color-gold)', marginTop: '2px', flexShrink: 0 }} />
                <span>Source: {item.sourceAttribution}</span>
              </div>
            </div>

            {/* Collect Button */}
            <div style={{ width: '100%', marginTop: '16px' }}>
              {isCollected ? (
                <div style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(56, 142, 60, 0.2)',
                  border: '1px solid var(--color-success)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#81C784',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle2 size={16} />
                  <span>Collected into Evidence Journal</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    sound.playDiscovery(soundEnabled);
                    onCollect(item.id);
                  }}
                  className="kalam-btn-primary"
                  style={{ width: '100%', height: '44px' }}
                >
                  <BookmarkPlus size={16} />
                  <span>Collect as Evidence</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Authentic Parchment Transcription & Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Paper Transcription */}
            <div className="kalam-paper" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(34, 30, 27, 0.2)', paddingBottom: '6px', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-bronze)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={12} /> Archival Document Transcription
                </span>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'rgba(90, 58, 30, 0.8)' }}>
                  Verified Historical Text
                </span>
              </div>
              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#221E1B',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6',
                fontWeight: 600
              }}>
                {item.fullTranscription}
              </pre>
            </div>

            {/* Historical Significance */}
            <div style={{
              background: '#142536',
              border: '1px solid rgba(214, 179, 106, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px'
            }}>
              <h4 className="font-heading" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Search size={13} /> Historical Significance
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', lineHeight: '1.5' }}>
                {item.historicalContext}
              </p>
            </div>

            {/* Clues */}
            {item.clues && item.clues.length > 0 && (
              <div style={{
                background: 'rgba(30, 30, 30, 0.85)',
                border: '1px solid rgba(214, 179, 106, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Sparkles size={12} /> Extracted Investigation Clues
                </span>
                <ul style={{ listStyle: 'none', paddingLeft: '4px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {item.clues.map((c, i) => (
                    <li key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ color: 'var(--color-gold)' }}>•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div style={{
          padding: '10px 20px',
          background: '#0E1A26',
          borderTop: '1px solid rgba(214, 179, 106, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {onPrev && (
              <button
                onClick={() => { sound.playClick(soundEnabled); onPrev(); }}
                className="kalam-btn-secondary"
                style={{ fontSize: '11px', minHeight: '32px', padding: '4px 12px' }}
              >
                <ChevronLeft size={13} /> Previous
              </button>
            )}
            {onNext && (
              <button
                onClick={() => { sound.playClick(soundEnabled); onNext(); }}
                className="kalam-btn-secondary"
                style={{ fontSize: '11px', minHeight: '32px', padding: '4px 12px' }}
              >
                Next <ChevronRight size={13} />
              </button>
            )}
          </div>

          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Press Esc to exit inspection
          </span>
        </div>
      </div>
    </div>
  );
};
