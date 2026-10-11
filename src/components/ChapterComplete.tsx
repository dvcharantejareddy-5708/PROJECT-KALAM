import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { EndingType } from '../types';
import { ENDINGS_DATA } from '../data/endingsData';
import { 
  Trophy, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ChapterCompleteProps {
  evidenceCount: number;
  totalMandatory: number;
  puzzlesCount: number;
  connectionsCount: number;
  assignedEnding: EndingType;
  onOpenJournal: () => void;
  onReviewEvidence: () => void;
  onReplayChapter: () => void;
  onMainMenu: () => void;
  soundEnabled: boolean;
}

export const ChapterComplete: React.FC<ChapterCompleteProps> = ({
  evidenceCount,
  totalMandatory,
  puzzlesCount,
  connectionsCount,
  assignedEnding,
  onOpenJournal,
  onReviewEvidence,
  onReplayChapter,
  onMainMenu,
  soundEnabled
}) => {
  const [showConfirmReplay, setShowConfirmReplay] = useState(false);
  const endingDetails = ENDINGS_DATA[assignedEnding] || ENDINGS_DATA.true_seeker;

  useEffect(() => {
    sound.playRocketRumble(soundEnabled);
    sound.playSuccess(soundEnabled);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D6B36A', '#EADCC5', '#388E3C', '#F6F2E7']
      });
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '50px' }}>
      
      {/* Central Majestic Completion Card */}
      <div className="kalam-panel" style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: '36px',
        textAlign: 'center',
        border: '2px solid var(--color-gold)',
        boxShadow: 'var(--shadow-panel)'
      }}>
        
        {/* Emblem */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-bronze)',
          border: '2px solid var(--color-gold)',
          color: 'var(--color-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: 'var(--shadow-gold)'
        }}>
          <Trophy size={28} />
        </div>

        {/* Title Header */}
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Investigation Complete • Chapter 3
        </span>
        <h1 className="font-heading" style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '0.05em', marginBottom: '6px' }}>
          SPACE DREAMER
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '24px' }}>
          "A Dream That Took India to Space"
        </p>

        {/* Rocket Liftoff Artwork Banner */}
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid rgba(214, 179, 106, 0.4)',
          position: 'relative',
          marginBottom: '24px',
          background: '#0E1A26'
        }}>
          <img
            src="/assets/chapter_complete_art.jpg"
            alt="SLV-3 Launch 18 July 1980"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(115%)' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(14, 26, 38, 0.85) 0%, transparent 60%)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            right: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>
              18 July 1980 • Sriharikota
            </span>
            <span className="kalam-badge-success" style={{ fontSize: '10px' }}>
              Rohini Satellite Orbit Confirmed
            </span>
          </div>
        </div>

        {/* Assigned Value-Based Ending Card */}
        <div style={{
          background: 'linear-gradient(180deg, #1A2838 0%, #142536 100%)',
          border: '2px solid var(--color-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Award size={18} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
              Your Investigative Ending:
            </span>
          </div>
          <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-light)' }}>
            {endingDetails.title}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontStyle: 'italic', display: 'block', marginBottom: '12px' }}>
            {endingDetails.subtitle}
          </span>
          <p style={{ fontSize: '13px', color: 'var(--color-aged-paper)', lineHeight: '1.6', marginBottom: '14px' }}>
            {endingDetails.description}
          </p>
          <div style={{ borderTop: '1px solid rgba(214, 179, 106, 0.25)', paddingTop: '10px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--color-text-light)', fontFamily: 'var(--font-heading)' }}>
              "{endingDetails.quote}"
            </p>
            <span style={{ fontSize: '11px', color: 'var(--color-gold)', display: 'block', marginTop: '2px' }}>
              — Dr. A.P.J. Abdul Kalam
            </span>
          </div>
        </div>

        {/* Investigation Summary Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>EVIDENCE</span>
            <span className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold)' }}>
              {evidenceCount}/{totalMandatory}
            </span>
            <span style={{ fontSize: '10px', color: '#81C784', display: 'block' }}>Mandatory Collected</span>
          </div>

          <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>PUZZLES</span>
            <span className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold)' }}>
              {puzzlesCount}/4
            </span>
            <span style={{ fontSize: '10px', color: '#81C784', display: 'block' }}>Decoded</span>
          </div>

          <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>CONNECTIONS</span>
            <span className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold)' }}>
              {connectionsCount}/5
            </span>
            <span style={{ fontSize: '10px', color: '#81C784', display: 'block' }}>Verified</span>
          </div>

          <div style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>REASONING</span>
            <span className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: '#81C784' }}>
              Complete
            </span>
            <span style={{ fontSize: '10px', color: '#81C784', display: 'block' }}>Synthesized</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          <button
            onClick={() => { sound.playClick(soundEnabled); onOpenJournal(); }}
            className="kalam-btn-primary"
          >
            <BookOpen size={16} />
            <span>View Journal</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onReviewEvidence(); }}
            className="kalam-btn-secondary"
          >
            <Search size={16} />
            <span>Review Evidence</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); setShowConfirmReplay(true); }}
            className="kalam-btn-secondary"
          >
            <RotateCcw size={16} />
            <span>Replay Chapter</span>
          </button>

          <button
            onClick={() => { sound.playClick(soundEnabled); onMainMenu(); }}
            className="kalam-btn-secondary"
          >
            <Home size={16} />
            <span>Main Menu</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Replay */}
      {showConfirmReplay && (
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
              Replay Chapter 3?
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.4' }}>
              This will reset collected evidence, puzzle solutions, and connections so you can experience the investigation anew.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirmReplay(false)}
                className="kalam-btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmReplay(false);
                  onReplayChapter();
                }}
                className="kalam-btn-primary"
                style={{ flex: 1, background: '#D32F2F', borderColor: '#ef5350' }}
              >
                Reset & Replay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
