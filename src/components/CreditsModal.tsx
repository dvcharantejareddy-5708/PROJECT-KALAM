import React from 'react';
import { Info, X, Shield, Landmark } from 'lucide-react';
import { sound } from '../utils/sound';

interface CreditsModalProps {
  onClose: () => void;
  soundEnabled: boolean;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ onClose, soundEnabled }) => {
  return (
    <div className="kalam-modal-overlay">
      <div 
        className="kalam-modal-container"
        style={{ maxWidth: '540px', width: '100%' }}
        role="dialog"
        aria-labelledby="credits-title"
      >
        {/* Header */}
        <div className="kalam-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} style={{ color: 'var(--color-gold)' }} />
            <h3 id="credits-title" className="font-heading" style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
              Credits & Archival Sources
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              onClose();
            }}
            className="kalam-icon-btn"
            aria-label="Close credits"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="kalam-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid rgba(214, 179, 106, 0.25)',
            lineHeight: '1.6',
            color: 'var(--color-aged-paper)'
          }}>
            <h4 className="font-heading" style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Landmark size={14} /> Historical Reference & Attributions
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0 }}>
              This interactive historical investigation is grounded in documented aerospace history of the 
              <strong style={{ color: 'var(--color-text-light)' }}> Indian Space Research Organisation (ISRO)</strong>, 
              the <strong style={{ color: 'var(--color-text-light)' }}>Vikram Sarabhai Space Centre (VSSC)</strong>, and the 
              <strong style={{ color: 'var(--color-text-light)' }}> Satish Dhawan Space Centre (SDSC SHAR)</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong className="font-heading" style={{
              display: 'block',
              color: 'var(--color-gold)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Key Archival Sources:
            </strong>
            <ul style={{
              margin: 0,
              paddingLeft: '12px',
              borderLeft: '2px solid rgba(214, 179, 106, 0.3)',
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--color-text-muted)'
            }}>
              <li>• <em style={{ color: 'var(--color-aged-paper)' }}>Wings of Fire: An Autobiography</em> by Dr. A.P.J. Abdul Kalam & Arun Tiwari.</li>
              <li>• ISRO Mission History Records: First Experimental Flights of SLV-3 (1979–1980).</li>
              <li>• Rohini Satellite (RS-1) Telemetry and Orbital Injection Records.</li>
              <li>• The Hindu & Indian Express Archival Newspaper Reports (July 1980).</li>
            </ul>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-primary)',
            border: '1px solid rgba(214, 179, 106, 0.2)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.6'
          }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-light)', marginBottom: '4px' }}>
              <Shield size={12} style={{ color: 'var(--color-gold)' }} /> Educational Disclaimer
            </strong>
            Developed strictly for educational and commemorative purposes as a historical tribute to Dr. A.P.J. Abdul Kalam 
            and the pioneer engineers of India's space programme. Built completely self-contained with zero external trackers or API dependencies.
          </div>
        </div>

        {/* Footer */}
        <div className="kalam-modal-footer">
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              onClose();
            }}
            className="kalam-btn-secondary"
            style={{ padding: '6px 20px', fontSize: '13px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
