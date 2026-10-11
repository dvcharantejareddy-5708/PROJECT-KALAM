import React, { useState } from 'react';
import { UserSettings } from '../types';
import { 
  Settings as SettingsIcon, 
  X, 
  Volume2, 
  VolumeX, 
  Type, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';
import { sound } from '../utils/sound';

interface SettingsModalProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onResetInvestigation: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetInvestigation,
  onClose
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  return (
    <div className="kalam-modal-overlay">
      <div 
        className="kalam-modal-container"
        style={{ maxWidth: '520px', width: '100%' }}
        role="dialog"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="kalam-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={18} style={{ color: 'var(--color-gold)' }} />
            <h3 id="settings-title" className="font-heading" style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
              Settings & Accessibility
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick(settings.soundEnabled);
              onClose();
            }}
            className="kalam-icon-btn"
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="kalam-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Sound Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid rgba(214, 179, 106, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {settings.soundEnabled ? (
                <Volume2 size={20} style={{ color: 'var(--color-gold)' }} />
              ) : (
                <VolumeX size={20} style={{ color: 'var(--color-text-muted)' }} />
              )}
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-light)', fontSize: '13px' }}>
                  Audio Sound Effects
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Synthesized clicks, archival chimes, and rocket rumble
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const nextVal = !settings.soundEnabled;
                sound.playClick(nextVal);
                onUpdateSettings({ soundEnabled: nextVal });
              }}
              className={settings.soundEnabled ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {settings.soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Text Size Accessibility */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid rgba(214, 179, 106, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Type size={20} style={{ color: 'var(--color-gold)' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-light)', fontSize: '13px' }}>
                  Document Text Scale
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Adjust font size for reading comfort in archival inspection
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(['standard', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    sound.playClick(settings.soundEnabled);
                    onUpdateSettings({ textSize: size });
                  }}
                  className={settings.textSize === size ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
                  style={{ padding: '6px 10px', fontSize: '12px', textTransform: 'capitalize' }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid rgba(214, 179, 106, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={20} style={{ color: 'var(--color-gold)' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-light)', fontSize: '13px' }}>
                  Reduced Motion
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Disable animations for vestibular comfort
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick(settings.soundEnabled);
                onUpdateSettings({ reducedMotion: !settings.reducedMotion });
              }}
              className={settings.reducedMotion ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {settings.reducedMotion ? 'Active' : 'Off'}
            </button>
          </div>

          {/* Reset Investigation Danger Zone */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(211, 47, 47, 0.1)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <strong style={{ display: 'block', color: '#EF9A9A', fontSize: '13px' }}>
                Reset Investigation
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Erase Chapter 3 evidence, puzzles, and connections
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick(settings.soundEnabled);
                setShowConfirmReset(true);
              }}
              style={{
                background: 'rgba(211, 47, 47, 0.2)',
                border: '1px solid #D32F2F',
                color: '#EF9A9A',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="kalam-modal-footer">
          <button
            onClick={() => {
              sound.playClick(settings.soundEnabled);
              onClose();
            }}
            className="kalam-btn-secondary"
            style={{ padding: '6px 20px', fontSize: '13px' }}
          >
            Done
          </button>
        </div>
      </div>

      {/* Confirmation Sub-Modal */}
      {showConfirmReset && (
        <div className="kalam-modal-overlay" style={{ zIndex: 70 }}>
          <div className="kalam-modal-container" style={{ maxWidth: '380px', padding: '24px', textAlign: 'center', border: '1px solid #D32F2F' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(211, 47, 47, 0.2)',
              color: '#EF9A9A',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={24} />
            </div>
            <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: '8px' }}>
              Confirm Investigation Reset
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
              Are you sure? All collected evidence, solved puzzles, and verified connections will be erased.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="kalam-btn-secondary"
                style={{ flex: 1, padding: '8px 0', fontSize: '12px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  onResetInvestigation();
                  onClose();
                }}
                style={{
                  flex: 1,
                  background: '#D32F2F',
                  border: '1px solid #F44336',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
