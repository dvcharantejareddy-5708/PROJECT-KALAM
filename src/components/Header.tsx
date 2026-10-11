import React from 'react';
import { Screen, Stage } from '../types';
import { 
  Compass, 
  KeyRound, 
  GitFork, 
  Lightbulb, 
  Trophy, 
  BookOpen, 
  CassetteTape, 
  Volume2, 
  VolumeX, 
  Settings, 
  Home 
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentScreen: Screen;
  currentStage: Stage;
  onNavigate: (screen: Screen) => void;
  evidenceCollectedCount: number;
  totalMandatoryEvidence: number;
  puzzlesSolvedCount: number;
  connectionsVerifiedCount: number;
  deductionCompleted: boolean;
  onOpenJournal: () => void;
  onOpenAudio: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentObjective: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  evidenceCollectedCount,
  totalMandatoryEvidence,
  puzzlesSolvedCount,
  connectionsVerifiedCount,
  deductionCompleted,
  onOpenJournal,
  onOpenAudio,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  currentObjective
}) => {
  const isDecodeUnlocked = evidenceCollectedCount >= totalMandatoryEvidence;
  const isConnectUnlocked = isDecodeUnlocked && puzzlesSolvedCount >= 4;
  const isUnderstandUnlocked = isConnectUnlocked && connectionsVerifiedCount >= 5;
  const isUnlockUnlocked = isUnderstandUnlocked && deductionCompleted;

  const stages: { stage: Stage; shortLabel: string; fullLabel: string; screen: Screen; icon: React.ReactNode; unlocked: boolean }[] = [
    { stage: 'discover', shortLabel: '1. Discover', fullLabel: 'Stage 1: Discover', screen: 'archive', icon: <Compass size={14} />, unlocked: true },
    { stage: 'decode', shortLabel: '2. Decode', fullLabel: 'Stage 2: Decode', screen: 'puzzles', icon: <KeyRound size={14} />, unlocked: isDecodeUnlocked },
    { stage: 'connect', shortLabel: '3. Connect', fullLabel: 'Stage 3: Connect', screen: 'connect', icon: <GitFork size={14} />, unlocked: isConnectUnlocked },
    { stage: 'understand', shortLabel: '4. Understand', fullLabel: 'Stage 4: Understand', screen: 'understand', icon: <Lightbulb size={14} />, unlocked: isUnderstandUnlocked },
    { stage: 'unlock', shortLabel: '5. Unlock', fullLabel: 'Stage 5: Unlock', screen: 'unlock', icon: <Trophy size={14} />, unlocked: isUnlockUnlocked }
  ];

  return (
    <header style={{
      width: '100%',
      background: 'var(--color-bg-primary)',
      borderBottom: '1px solid rgba(214, 179, 106, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        
        {/* Brand Identity / Home */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              onNavigate('main_menu');
            }}
            className="kalam-icon-btn"
            style={{ width: '44px', height: '44px' }}
            title="Return to Main Menu"
            aria-label="Main Menu"
          >
            <Home size={18} />
          </button>
          <div>
            <span style={{
              fontSize: '9px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-gold)',
              fontWeight: 700,
              display: 'block'
            }}>
              PROJECT KALAM
            </span>
            <span className="font-heading" style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--color-text-light)',
              display: 'block',
              lineHeight: '1.2'
            }}>
              Chapter 3: Space Dreamer
            </span>
          </div>
        </div>

        {/* 5 Stages Navigation (Touch-friendly, horizontal scroll on mobile) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '2px 0',
          WebkitOverflowScrolling: 'touch'
        }}>
          {stages.map((st) => {
            const isActive = currentScreen === st.screen;
            const isClickable = st.unlocked;

            return (
              <button
                key={st.stage}
                disabled={!isClickable}
                onClick={() => {
                  sound.playClick(soundEnabled);
                  onNavigate(st.screen);
                }}
                className={isActive ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
                style={{
                  minHeight: '44px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  opacity: isClickable ? 1 : 0.45,
                  cursor: isClickable ? 'pointer' : 'not-allowed',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
                title={st.unlocked ? `Go to ${st.fullLabel}` : 'Complete previous milestone to unlock'}
                aria-label={st.fullLabel}
              >
                {st.icon}
                <span>{st.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Investigation Tools (44x44 touch targets) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenAudio(); }}
            className="kalam-btn-secondary"
            style={{ minHeight: '44px', padding: '6px 10px', fontSize: '11px' }}
            title="Audio Cassette Tape Player"
            aria-label="Audio Tape Player"
          >
            <CassetteTape size={16} />
            <span className="hide-on-mobile">Audio</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenJournal(); }}
            className="kalam-btn-secondary"
            style={{ minHeight: '44px', padding: '6px 10px', fontSize: '11px', gap: '6px' }}
            title="Evidence Journal"
            aria-label="Evidence Journal"
          >
            <BookOpen size={16} />
            <span className="hide-on-mobile">Journal</span>
            <span style={{
              background: 'var(--color-bronze)',
              color: 'var(--color-gold)',
              borderRadius: '2px',
              padding: '1px 5px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {evidenceCollectedCount}/{totalMandatoryEvidence}
            </span>
          </button>

          <button
            onClick={onToggleSound}
            className="kalam-icon-btn"
            style={{ width: '44px', height: '44px' }}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            aria-label={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenSettings(); }}
            className="kalam-icon-btn"
            style={{ width: '44px', height: '44px' }}
            title="Settings & Accessibility"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Sub-Header: Mission Objective & Progress Ribbon */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6px 12px',
        borderTop: '1px solid rgba(214, 179, 106, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        fontSize: '11px',
        color: 'var(--color-text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: '220px' }}>
          <span style={{
            color: 'var(--color-gold)',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)'
          }}>
            OBJECTIVE:
          </span>
          <span style={{ color: 'var(--color-text-light)', fontWeight: 500, lineHeight: '1.3' }}>
            {currentObjective}
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          flexShrink: 0
        }}>
          <span>Records: <strong style={{ color: 'var(--color-gold)' }}>{evidenceCollectedCount}/{totalMandatoryEvidence}</strong></span>
          <span>Puzzles: <strong style={{ color: 'var(--color-gold)' }}>{puzzlesSolvedCount}/4</strong></span>
          <span>Links: <strong style={{ color: 'var(--color-gold)' }}>{connectionsVerifiedCount}/5</strong></span>
        </div>
      </div>
    </header>
  );
};
