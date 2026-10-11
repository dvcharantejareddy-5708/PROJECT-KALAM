import React, { useState, useEffect } from 'react';
import { CASSETTE_DATA } from '../data/audioData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  CassetteTape, 
  Sparkles, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { sound } from '../utils/sound';

interface AudioModalProps {
  onClose: () => void;
  onExtractClue: () => void;
  clueDiscovered: boolean;
  soundEnabled: boolean;
}

export const AudioModal: React.FC<AudioModalProps> = ({
  onClose,
  onExtractClue,
  clueDiscovered,
  soundEnabled
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isClueExtracted, setIsClueExtracted] = useState(clueDiscovered);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      sound.startTapePlayback(soundEnabled);
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= CASSETTE_DATA.duration) {
            setIsPlaying(false);
            sound.stopTapePlayback();
            return CASSETTE_DATA.duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      sound.stopTapePlayback();
    }

    return () => {
      clearInterval(interval);
      sound.stopTapePlayback();
    };
  }, [isPlaying, soundEnabled]);

  const handleTogglePlay = () => {
    sound.playClick(soundEnabled);
    if (currentTime >= CASSETTE_DATA.duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    sound.playClick(soundEnabled);
    setIsPlaying(false);
    setCurrentTime(0);
    sound.stopTapePlayback();
  };

  const handleClueClick = () => {
    sound.playDiscovery(soundEnabled);
    setIsClueExtracted(true);
    onExtractClue();
  };

  const activeTranscriptIndex = CASSETTE_DATA.transcript.reduce(
    (acc, line, idx) => (currentTime >= line.timeSeconds ? idx : acc),
    0
  );

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
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '2px solid rgba(214, 179, 106, 0.5)'
        }}
        role="dialog"
        aria-labelledby="audio-modal-title"
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
              <CassetteTape size={16} />
            </div>
            <div>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>
                Magnetic Tape Recording • 1979
              </span>
              <h2 id="audio-modal-title" className="font-heading" style={{ fontSize: '15px', fontWeight: 800 }}>
                {CASSETTE_DATA.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              sound.stopTapePlayback();
              onClose();
            }}
            className="kalam-icon-btn"
            style={{ width: '32px', height: '32px' }}
            title="Close Tape Deck"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          {/* Cassette Shell Box */}
          <div style={{
            width: '100%',
            maxWidth: '440px',
            background: '#1E1E1E',
            border: '3px solid #5A3A1E',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8)'
          }}>
            <div style={{
              background: '#EADCC5',
              color: '#221E1B',
              padding: '8px 12px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '12px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)'
            }}>
              <span>ISRO VSSC • C-60 REVIEW</span>
              <span style={{ color: '#5A3A1E' }}>{CASSETTE_DATA.date}</span>
            </div>

            {/* Reel Window */}
            <div style={{
              background: '#0E1A26',
              height: '90px',
              borderRadius: '8px',
              border: '2px solid #5A3A1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 24px',
              position: 'relative'
            }}>
              {/* Left Reel */}
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '4px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isPlaying ? 'spinReel 4s linear infinite' : 'none'
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#142536', border: '1px solid var(--color-gold)' }} />
              </div>

              {/* Tape Timer */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '4px 12px',
                borderRadius: '4px',
                border: '1px solid rgba(214, 179, 106, 0.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-gold)',
                fontWeight: 700
              }}>
                00:{currentTime.toString().padStart(2, '0')} / 00:45
              </div>

              {/* Right Reel */}
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '4px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isPlaying ? 'spinReel 4s linear infinite' : 'none'
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#142536', border: '1px solid var(--color-gold)' }} />
              </div>
            </div>

            {/* Tape Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleTogglePlay}
                  className="kalam-btn-primary"
                  style={{ minHeight: '34px', padding: '4px 14px', fontSize: '11px' }}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleRewind}
                  className="kalam-btn-secondary"
                  style={{ minHeight: '34px', padding: '4px 10px', fontSize: '11px' }}
                >
                  <RotateCcw size={13} /> Rewind
                </button>
              </div>

              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                {isPlaying ? 'Tape Active' : 'Standby'}
              </span>
            </div>
          </div>

          {/* Synchronized Transcript View */}
          <div className="kalam-paper" style={{ width: '100%', padding: '16px', maxHeight: '180px', overflowY: 'auto' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-bronze)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <FileText size={12} /> Synchronized Audio Transcript
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CASSETTE_DATA.transcript.map((line, idx) => {
                const isActive = idx === activeTranscriptIndex;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '4px',
                      background: isActive ? 'rgba(90, 58, 30, 0.15)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--color-bronze)' : '3px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-bronze)', fontWeight: 700 }}>
                      <span>{line.speaker}</span>
                      <span>00:{line.timeSeconds.toString().padStart(2, '0')}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#221E1B', marginTop: '2px', lineHeight: '1.4' }}>
                      {line.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extract Clue Button */}
          <div style={{
            width: '100%',
            background: 'var(--color-bg-secondary)',
            border: '1px solid rgba(214, 179, 106, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                Archival Clue Extraction
              </span>
              <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', marginTop: '2px' }}>
                Dr. Kalam’s directive on redundant valve actuation seals.
              </p>
            </div>

            {isClueExtracted ? (
              <span className="kalam-badge-success" style={{ fontSize: '11px' }}>
                <CheckCircle2 size={13} /> Clue Logged to Journal
              </span>
            ) : (
              <button
                onClick={handleClueClick}
                className="kalam-btn-primary"
                style={{ minHeight: '36px', padding: '4px 16px', fontSize: '11px' }}
              >
                <Sparkles size={13} /> Extract Clue
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinReel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
