import React, { useState } from 'react';
import { Play, RotateCcw, BookOpen, Settings as SettingsIcon, Info, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/sound';

interface MainMenuProps {
  hasSavedGame: boolean;
  onNewGame: () => void;
  onContinueGame: () => void;
  onOpenJournal: () => void;
  onOpenSettings: () => void;
  onOpenCredits: () => void;
  soundEnabled: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  hasSavedGame,
  onNewGame,
  onContinueGame,
  onOpenJournal,
  onOpenSettings,
  onOpenCredits,
  soundEnabled
}) => {
  const [showConfirmNew, setShowConfirmNew] = useState(false);

  const handleStartNewClick = () => {
    sound.playClick(soundEnabled);
    if (hasSavedGame) {
      setShowConfirmNew(true);
    } else {
      onNewGame();
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at 50% 40%, #142536 0%, #0E1A26 60%, #080D14 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Background Graphic with Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('/assets/archive_room_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'contrast(120%) blur(1px)'
      }} />

      {/* Main Terminal Menu Frame */}
      <main className="kalam-panel animate-fade-in" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '680px',
        width: '100%',
        padding: '36px 32px',
        textAlign: 'center',
        border: '2px solid rgba(214, 179, 106, 0.45)',
        background: 'rgba(20, 37, 54, 0.92)',
        boxShadow: 'var(--shadow-panel)'
      }}>
        
        {/* Emblem Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          marginBottom: '16px',
          borderRadius: '20px',
          background: 'rgba(14, 26, 38, 0.8)',
          border: '1px solid var(--color-gold)',
          color: 'var(--color-gold)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)' }} />
          Declassified Historical Archive
        </div>

        {/* Title */}
        <h1 className="font-heading" style={{
          fontSize: '38px',
          fontWeight: 900,
          color: 'var(--color-text-light)',
          letterSpacing: '0.08em',
          textShadow: '0 4px 16px rgba(0, 0, 0, 0.8)',
          marginBottom: '4px'
        }}>
          PROJECT KALAM
        </h1>
        <h2 style={{
          fontSize: '13px',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-gold)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          The Hidden Archive
        </h2>

        {/* Chapter 3 Banner */}
        <div style={{
          background: '#0E1A26',
          borderTop: '1px solid rgba(214, 179, 106, 0.3)',
          borderBottom: '1px solid rgba(214, 179, 106, 0.3)',
          padding: '10px 16px',
          margin: '16px auto',
          maxWidth: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            CHAPTER 3
          </span>
          <span style={{ color: 'var(--color-gold)' }}>•</span>
          <h3 className="font-heading" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-light)' }}>
            SPACE DREAMER
          </h3>
        </div>

        {/* Tagline & Mission Intro */}
        <p style={{
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-heading)',
          marginBottom: '8px'
        }}>
          "Connect the History. Decode the Evidence. Discover the Dream."
        </p>
        <p style={{
          fontSize: '13px',
          color: 'var(--color-aged-paper)',
          lineHeight: '1.6',
          maxWidth: '540px',
          margin: '0 auto 28px auto'
        }}>
          You have discovered a digital repository of technical blueprints, launch sequence logs, and personal notes 
          chronicling Dr. A.P.J. Abdul Kalam and India's early space programme. Investigate the archive to reconstruct the story of SLV-3.
        </p>

        {/* Action Menu Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto' }}>
          {hasSavedGame && (
            <button
              onClick={() => {
                sound.playClick(soundEnabled);
                onContinueGame();
              }}
              className="kalam-btn-primary"
              style={{ height: '48px', fontSize: '14px' }}
            >
              <RotateCcw size={18} />
              <span>Continue Investigation</span>
            </button>
          )}

          <button
            onClick={handleStartNewClick}
            className={hasSavedGame ? 'kalam-btn-secondary' : 'kalam-btn-primary'}
            style={{ height: '48px', fontSize: '14px' }}
          >
            <Play size={18} />
            <span>{hasSavedGame ? 'New Investigation' : 'Start Investigation'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              onOpenJournal();
            }}
            className="kalam-btn-secondary"
            style={{ height: '44px' }}
          >
            <BookOpen size={16} />
            <span>Evidence Journal</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => {
                sound.playClick(soundEnabled);
                onOpenSettings();
              }}
              className="kalam-btn-secondary"
              style={{ height: '42px', fontSize: '11px' }}
            >
              <SettingsIcon size={15} />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(soundEnabled);
                onOpenCredits();
              }}
              className="kalam-btn-secondary"
              style={{ height: '42px', fontSize: '11px' }}
            >
              <Info size={15} />
              <span>Credits</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '28px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(214, 179, 106, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'rgba(167, 176, 184, 0.7)'
        }}>
          <span>Non-Commercial Educational Tribute</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>ISRO Heritage 1970–1980</span>
        </div>
      </main>

      {/* Confirmation Modal for Resetting Game */}
      {showConfirmNew && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 100
        }}>
          <div className="kalam-panel" style={{ maxWidth: '420px', padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(90, 58, 30, 0.4)',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <AlertTriangle size={24} />
            </div>
            <h4 className="font-heading" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
              Start New Investigation?
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.4' }}>
              A saved investigation exists. Starting a new investigation will reset your Chapter 3 progress and collected evidence.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirmNew(false)}
                className="kalam-btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmNew(false);
                  onNewGame();
                }}
                className="kalam-btn-primary"
                style={{ flex: 1, background: '#D32F2F', borderColor: '#ef5350' }}
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
