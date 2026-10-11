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

  const stages: { stage: Stage; label: string; screen: Screen; icon: React.ReactNode; unlocked: boolean }[] = [
    { stage: 'discover', label: '1. Discover', screen: 'archive', icon: <Compass size={14} />, unlocked: true },
    { stage: 'decode', label: '2. Decode', screen: 'puzzles', icon: <KeyRound size={14} />, unlocked: isDecodeUnlocked },
    { stage: 'connect', label: '3. Connect', screen: 'connect', icon: <GitFork size={14} />, unlocked: isConnectUnlocked },
    { stage: 'understand', label: '4. Understand', screen: 'understand', icon: <Lightbulb size={14} />, unlocked: isUnderstandUnlocked },
    { stage: 'unlock', label: '5. Unlock', screen: 'unlock', icon: <Trophy size={14} />, unlocked: isUnlockUnlocked }
  ];

  return (
    <header style={{
      width: '100%',
      background: 'var(--color-bg-primary)',
      borderBottom: '1px solid rgba(214, 179, 106, 0.3)',
      padding: '8px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        
        {/* Logo & Chapter Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              onNavigate('main_menu');
            }}
            className="kalam-icon-btn"
            title="Return to Main Menu"
          >
            <Home size={18} />
          </button>
          <div>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>
              Project Kalam
            </span>
            <span className="font-heading" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-light)' }}>
              Chapter 3: Space Dreamer
            </span>
          </div>
        </div>

        {/* 5 Stages Navigation Buttons */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
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
                className={isActive ? 'kalam-btn-primary' : isClickable ? 'kalam-btn-secondary' : 'kalam-btn-secondary'}
                style={{
                  minHeight: '34px',
                  padding: '4px 12px',
                  fontSize: '11px',
                  opacity: isClickable ? 1 : 0.4,
                  cursor: isClickable ? 'pointer' : 'not-allowed'
                }}
                title={st.unlocked ? `Go to ${st.label}` : 'Complete prior stage to unlock'}
              >
                {st.icon}
                <span>{st.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenAudio(); }}
            className="kalam-btn-secondary"
            style={{ minHeight: '34px', padding: '4px 10px', fontSize: '11px' }}
            title="Audio Cassette Tape Player"
          >
            <CassetteTape size={14} />
            <span>Audio Deck</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenJournal(); }}
            className="kalam-btn-secondary"
            style={{ minHeight: '34px', padding: '4px 10px', fontSize: '11px' }}
            title="Evidence Journal"
          >
            <BookOpen size={14} />
            <span>Journal</span>
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
            style={{ width: '34px', height: '34px' }}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenSettings(); }}
            className="kalam-icon-btn"
            style={{ width: '34px', height: '34px' }}
            title="Settings & Accessibility"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Objective Banner */}
      <div style={{
        maxWidth: '1400px',
        margin: '4px auto 0 auto',
        paddingTop: '4px',
        borderTop: '1px solid rgba(214, 179, 106, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'var(--color-text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
            CURRENT OBJECTIVE:
          </span>
          <span style={{ color: 'var(--color-text-light)', fontWeight: 500 }}>
            {currentObjective}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
          <span>Evidence: <strong style={{ color: 'var(--color-gold)' }}>{evidenceCollectedCount}/{totalMandatoryEvidence}</strong></span>
          <span>Puzzles: <strong style={{ color: 'var(--color-gold)' }}>{puzzlesSolvedCount}/4</strong></span>
          <span>Links: <strong style={{ color: 'var(--color-gold)' }}>{connectionsVerifiedCount}/5</strong></span>
        </div>
      </div>
    </header>
  );
};
