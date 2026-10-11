import React, { useState } from 'react';
import { EvidenceItem, EvidenceCategory } from '../types';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  Wrench, 
  Image as ImageIcon, 
  Bookmark,
  Eye,
  Info,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ArchiveDeskSceneProps {
  evidenceList: EvidenceItem[];
  inspectedIds: string[];
  collectedIds: string[];
  onInspectItem: (item: EvidenceItem) => void;
  onProceedToDecode: () => void;
  isStageComplete: boolean;
  soundEnabled: boolean;
}

export const ArchiveDeskScene: React.FC<ArchiveDeskSceneProps> = ({
  evidenceList,
  inspectedIds,
  collectedIds,
  onInspectItem,
  onProceedToDecode,
  isStageComplete,
  soundEnabled
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mandatory' | EvidenceCategory>('all');
  const [viewMode, setViewMode] = useState<'dossier_showcase' | 'workbench'>('dossier_showcase');

  const mandatoryItems = evidenceList.filter((i) => i.isMandatory);
  const totalMandatoryCount = mandatoryItems.length; // 8
  const collectedMandatoryCount = mandatoryItems.filter((i) => collectedIds.includes(i.id)).length;

  const filteredEvidence = evidenceList.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'mandatory') return item.isMandatory;
    return item.category === activeCategory;
  });

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* 1. Archive Atmosphere Banner */}
      <div className="kalam-panel" style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: '20px',
        border: '1px solid rgba(214, 179, 106, 0.4)',
        background: 'radial-gradient(circle at 60% 30%, #1A2E44 0%, #0E1A26 80%, #080D14 100%)'
      }}>
        {/* Ambient Room Backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/archive_room_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.28,
          filter: 'contrast(125%)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="kalam-badge-gold">Stage 1: Discover</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Declassified VSSC / SDSC Research Archive
              </span>
            </div>
            <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 900, color: 'var(--color-text-light)', margin: '0 0 6px 0', letterSpacing: '0.04em' }}>
              Dr. Kalam's Research Archive & Workbench
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--color-aged-paper)', maxWidth: '720px', lineHeight: '1.6', margin: 0 }}>
              Inspect the technical blueprints, flight logs, coded telemetry, and team photographs chronicling India's early 
              satellite launch programme. Collect all <strong>8 mandatory records</strong> to proceed to the cryptanalysis stage.
            </p>
          </div>

          {/* Progress Tracker Card & Advance Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(14, 26, 38, 0.92)',
              border: '1px solid rgba(214, 179, 106, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: '180px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
            }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', display: 'block' }}>
                Mandatory Evidence
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '3px 0' }}>
                <span className="font-heading" style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-gold)' }}>
                  {collectedMandatoryCount}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '18px' }}>/</span>
                <span className="font-heading" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                  {totalMandatoryCount}
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1E1E1E', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(collectedMandatoryCount / totalMandatoryCount) * 100}%`,
                  background: 'linear-gradient(90deg, #5A3A1E, #D6B36A)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {isStageComplete && (
              <button
                onClick={() => {
                  sound.playSuccess(soundEnabled);
                  onProceedToDecode();
                }}
                className="kalam-btn-primary animate-pulse-glow"
                style={{ height: '48px', padding: '0 24px', fontSize: '13px' }}
              >
                <span>Proceed to Stage 2: Decode</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter & View Switcher Bar */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '12px 28px',
          background: 'rgba(14, 26, 38, 0.95)',
          borderTop: '1px solid rgba(214, 179, 106, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('all'); }}
              className={activeCategory === 'all' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              All Records ({evidenceList.length})
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('mandatory'); }}
              className={activeCategory === 'mandatory' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              <ShieldCheck size={12} /> Mandatory Only ({collectedMandatoryCount}/{totalMandatoryCount})
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('technical'); }}
              className={activeCategory === 'technical' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              <Wrench size={12} /> Blueprints & Telemetry
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('document'); }}
              className={activeCategory === 'document' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              <FileText size={12} /> Historical Notes & Logs
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('photograph'); }}
              className={activeCategory === 'photograph' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              <ImageIcon size={12} /> Photographs
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setActiveCategory('collectible'); }}
              className={activeCategory === 'collectible' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 12px', fontSize: '11px' }}
            >
              <Bookmark size={12} /> Personal Artefacts
            </button>
          </div>

          {/* View Mode Switcher */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => { sound.playClick(soundEnabled); setViewMode('dossier_showcase'); }}
              className={viewMode === 'dossier_showcase' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 14px', fontSize: '11px' }}
              title="Clean gallery order with high visual clarity"
            >
              <Layers size={13} /> Dossier Showcase
            </button>
            <button
              onClick={() => { sound.playClick(soundEnabled); setViewMode('workbench'); }}
              className={viewMode === 'workbench' ? 'kalam-btn-primary' : 'kalam-btn-secondary'}
              style={{ minHeight: '32px', padding: '4px 14px', fontSize: '11px' }}
              title="Spatial research workbench view"
            >
              <Compass size={13} /> Archive Workbench
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY VIEW: CLEAN DOSSIER SHOWCASE (Clean order & high visual clarity) */}
      {viewMode === 'dossier_showcase' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '16px'
        }}>
          {filteredEvidence.map((item, index) => {
            const isCollected = collectedIds.includes(item.id);
            const isInspected = inspectedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => {
                  sound.playClick(soundEnabled);
                  onInspectItem(item);
                }}
                className="kalam-panel"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  border: isCollected 
                    ? '1px solid var(--color-gold)' 
                    : item.isMandatory 
                      ? '1px solid rgba(214, 179, 106, 0.4)' 
                      : '1px solid rgba(214, 179, 106, 0.2)',
                  background: isCollected 
                    ? 'linear-gradient(180deg, rgba(20, 37, 54, 0.95) 0%, rgba(14, 26, 38, 0.95) 100%)' 
                    : 'rgba(20, 37, 54, 0.85)',
                  boxShadow: isCollected 
                    ? '0 6px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(214, 179, 106, 0.15)' 
                    : 'var(--shadow-panel)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isCollected 
                    ? 'var(--color-gold)' 
                    : item.isMandatory 
                      ? 'rgba(214, 179, 106, 0.4)' 
                      : 'rgba(214, 179, 106, 0.2)';
                }}
              >
                <div>
                  {/* Card Header: Record Number & Tag */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <span style={{
                      color: item.isMandatory ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}>
                      RECORD {String(index + 1).padStart(2, '0')}
                    </span>

                    {item.isMandatory ? (
                      <span className="kalam-badge-gold" style={{ fontSize: '9px', padding: '2px 8px' }}>
                        MANDATORY
                      </span>
                    ) : (
                      <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>
                        ARTEFACT
                      </span>
                    )}
                  </div>

                  {/* Clean, High-Clarity Image Window */}
                  <div style={{
                    width: '100%',
                    height: '190px',
                    background: '#080E16',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: '14px',
                    border: '1px solid rgba(214, 179, 106, 0.25)',
                    boxShadow: 'inset 0 0 18px rgba(0, 0, 0, 0.8)'
                  }}>
                    <img
                      src={item.assetUrl}
                      alt={item.title}
                      style={{
                        maxHeight: '92%',
                        maxWidth: '92%',
                        objectFit: 'contain',
                        filter: isCollected ? 'contrast(105%)' : 'contrast(100%) brightness(95%)',
                        transition: 'transform 0.3s ease'
                      }}
                    />

                    {/* Collection Status Watermark */}
                    <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                      {isCollected ? (
                        <span className="kalam-badge-success" style={{ fontSize: '10px' }}>
                          <CheckCircle2 size={12} /> Collected
                        </span>
                      ) : isInspected ? (
                        <span className="kalam-badge-gold" style={{ fontSize: '10px' }}>
                          <Eye size={12} /> Inspected
                        </span>
                      ) : (
                        <span className="kalam-badge-gold" style={{ fontSize: '10px', opacity: 0.7 }}>
                          Unexamined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date & Category Sub-Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-gold)',
                    marginBottom: '4px'
                  }}>
                    <span>{item.category.toUpperCase()}</span>
                    <span>{item.date || '1975–1980'}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading" style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--color-text-light)',
                    marginBottom: '6px',
                    lineHeight: '1.4'
                  }}>
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {item.shortDesc}
                  </p>
                </div>

                {/* Footer Action Strip */}
                <div style={{
                  marginTop: '14px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(214, 179, 106, 0.15)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isCollected ? '#81C784' : 'var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isCollected ? (
                      <>
                        <CheckCircle2 size={13} /> Collected in Journal
                      </>
                    ) : (
                      <>
                        <Eye size={13} /> Click to Inspect & Collect →
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. WORKBENCH VIEW: CLEAN, SPACED STATIONS (Zero overlap) */}
      {viewMode === 'workbench' && (
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '620px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid rgba(214, 179, 106, 0.4)',
          background: 'radial-gradient(circle at 50% 30%, #1A2E44 0%, #0E1A26 80%, #080D14 100%)',
          boxShadow: 'var(--shadow-panel)'
        }}>
          {/* Authentic Room Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/assets/archive_room_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            filter: 'contrast(120%)'
          }} />

          {/* Workbench Instruction Header */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            padding: '16px 20px',
            background: 'rgba(14, 26, 38, 0.9)',
            borderBottom: '1px solid rgba(214, 179, 106, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px'
          }}>
            <span style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={14} /> Workbench Stations: Click any document or photograph below to open the inspection dossier.
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '11px' }}>
              {collectedMandatoryCount} of {totalMandatoryCount} Mandatory Records Collected
            </span>
          </div>

          {/* Clean Stations Grid on the Desk */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '18px'
          }}>
            {filteredEvidence.map((item, idx) => {
              const isCollected = collectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick(soundEnabled);
                    onInspectItem(item);
                  }}
                  style={{
                    background: 'rgba(20, 37, 54, 0.88)',
                    border: isCollected ? '1px solid var(--color-gold)' : '1px solid rgba(214, 179, 106, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = isCollected ? 'var(--color-gold)' : 'rgba(214, 179, 106, 0.3)';
                  }}
                >
                  {/* Clean Preview Thumbnail */}
                  <div style={{
                    width: '100%',
                    height: '130px',
                    background: '#091118',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    border: '1px solid rgba(214, 179, 106, 0.2)',
                    position: 'relative'
                  }}>
                    <img
                      src={item.assetUrl}
                      alt={item.title}
                      style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
                    />
                    <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                      {isCollected ? (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--color-success)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <CheckCircle2 size={12} />
                        </div>
                      ) : (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--color-gold)',
                          color: '#000',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {idx + 1}
                        </div>
                      )}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: item.isMandatory ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '2px'
                  }}>
                    {item.isMandatory ? 'Mandatory Record' : 'Artefact'}
                  </span>
                  <h4 className="font-heading" style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-text-light)',
                    margin: '0 0 4px 0',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: isCollected ? '#81C784' : 'var(--color-text-muted)' }}>
                    {isCollected ? 'Collected in Journal ✓' : 'Click to Inspect'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. STAGE 1 COMPLETION CELEBRATION BANNER */}
      {isStageComplete && (
        <div className="kalam-panel animate-fade-in" style={{
          marginTop: '28px',
          padding: '24px',
          border: '2px solid var(--color-success)',
          background: 'linear-gradient(180deg, rgba(20, 37, 54, 0.98) 0%, rgba(14, 26, 38, 0.98) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 142, 60, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(56, 142, 60, 0.25)',
              border: '2px solid var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#81C784',
              flexShrink: 0
            }}>
              <CheckCircle2 size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="kalam-badge-success">Discovery Complete</span>
                <span style={{ fontSize: '11px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
                  8 of 8 Mandatory Evidence Records Assembled
                </span>
              </div>
              <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-light)', margin: 0 }}>
                Historical Evidence Archive Fully Documented!
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-aged-paper)', marginTop: '4px', maxWidth: '640px', lineHeight: '1.5' }}>
                You have collected the SLV-III blueprint, Dr. Kalam's directive, countdown sequence, telemetry log, 
                and launch pad records. Stage 2 (Decode) is now unlocked.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess(soundEnabled);
              onProceedToDecode();
            }}
            className="kalam-btn-primary"
            style={{ height: '48px', padding: '0 28px', fontSize: '14px' }}
          >
            <span>Proceed to Stage 2 (Decode)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
