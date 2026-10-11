import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { sound } from '../utils/sound';

interface ChapterIntroProps {
  onBegin: () => void;
  soundEnabled: boolean;
}

export const ChapterIntro: React.FC<ChapterIntroProps> = ({ onBegin, soundEnabled }) => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at 50% 30%, #142536 0%, #0E1A26 70%, #080D14 100%)',
      position: 'relative',
      overflow: 'hidden'
    }} className="animate-fade-in">
      
      {/* Background with subtle blur */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('/assets/archive_room_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        filter: 'blur(2px)'
      }} />

      {/* Intro Briefing Card */}
      <div className="kalam-panel" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '720px',
        width: '100%',
        padding: '36px',
        textAlign: 'center',
        border: '2px solid rgba(214, 179, 106, 0.45)',
        background: 'rgba(20, 37, 54, 0.95)',
        boxShadow: 'var(--shadow-panel)'
      }}>
        
        {/* Banner Image */}
        <div style={{
          width: '100%',
          height: '180px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '24px',
          border: '1px solid rgba(214, 179, 106, 0.4)',
          position: 'relative'
        }}>
          <img
            src="/assets/chapter_title_banner.jpg"
            alt="Chapter 3 Title Banner - Space Dreamer"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(14, 26, 38, 0.85) 0%, transparent 60%)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '14px',
            right: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>Declassified Dossier</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}>1970 — 1980</span>
          </div>
        </div>

        {/* Chapter Header */}
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Historical Investigation — Chapter 3
        </span>
        <h1 className="font-heading" style={{ fontSize: '32px', fontWeight: 900, marginBottom: '14px', letterSpacing: '0.04em' }}>
          SPACE DREAMER
        </h1>

        {/* Verified Kalam Quote */}
        <div style={{
          background: 'rgba(14, 26, 38, 0.8)',
          borderLeft: '4px solid var(--color-gold)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'left',
          marginBottom: '20px'
        }}>
          <p style={{ fontStyle: 'italic', fontSize: '15px', color: 'var(--color-aged-paper)', lineHeight: '1.5', fontFamily: 'var(--font-heading)' }}>
            "Man needs his difficulties because they are necessary to enjoy success."
          </p>
          <span style={{ display: 'block', textAlign: 'right', fontSize: '12px', color: 'var(--color-gold)', marginTop: '6px', fontWeight: 600 }}>
            — Dr. A.P.J. Abdul Kalam
          </span>
        </div>

        {/* Mission Briefing */}
        <div style={{ textAlign: 'left', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>
            In the early 1970s, India stood on the threshold of the modern space age. Under the visionary direction of 
            <strong style={{ color: 'var(--color-text-light)' }}> Dr. A.P.J. Abdul Kalam</strong> at the Vikram Sarabhai Space Centre, 
            a devoted team set out to engineer India's first satellite launch vehicle: <strong style={{ color: 'var(--color-gold)' }}>SLV-3</strong>.
          </p>
          <p>
            Facing technological embargoes and severe resource constraints, the team suffered a devastating public heartbreak 
            when the first experimental flight splashed down in the Bay of Bengal on 10 August 1979. Yet through relentless scientific 
            discipline and mutual trust, they rebounded to achieve complete orbital insertion on 18 July 1980.
          </p>
          <p style={{ color: 'var(--color-aged-paper)', fontWeight: 500 }}>
            Your mission as research intern: investigate the documents, blueprints, and telemetry logs in the classified archive 
            to reconstruct India's first step into Earth orbit.
          </p>
        </div>

        {/* Begin Button */}
        <button
          onClick={() => {
            sound.playClick(soundEnabled);
            onBegin();
          }}
          className="kalam-btn-primary"
          style={{ height: '48px', padding: '0 32px', fontSize: '14px' }}
        >
          <Compass size={18} />
          <span>Begin Investigation</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
