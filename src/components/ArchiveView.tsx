import React, { useState } from 'react';
import { EvidenceItem, EvidenceCategory } from '../types';
import { 
  Search, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  FileText,
  Image as ImageIcon,
  Wrench,
  Bookmark
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ArchiveViewProps {
  evidenceList: EvidenceItem[];
  inspectedIds: string[];
  collectedIds: string[];
  onInspectItem: (item: EvidenceItem) => void;
  onProceedToDecode: () => void;
  isStageComplete: boolean;
  soundEnabled: boolean;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  evidenceList,
  inspectedIds,
  collectedIds,
  onInspectItem,
  onProceedToDecode,
  isStageComplete,
  soundEnabled
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | EvidenceCategory>('all');
  const [activeEnvironmentView, setActiveEnvironmentView] = useState<'room' | 'desk'>('room');

  const filteredEvidence = evidenceList.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const mandatoryItems = evidenceList.filter((i) => i.isMandatory);
  const collectedMandatoryCount = mandatoryItems.filter((i) => collectedIds.includes(i.id)).length;
  const totalMandatoryCount = mandatoryItems.length;

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-6 max-w-7xl mx-auto flex flex-col gap-6 select-none animate-fade-in">
      
      {/* Top Controls & Status Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 panel-dark p-4 sm:p-5 border border-[#D6B36A]/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-gold text-[10px]">STAGE 1: DISCOVER</span>
            <span className="text-xs text-[#A7B0B8]">Search & Collect Evidence</span>
          </div>
          <h2 className="font-heading text-lg sm:text-2xl font-bold text-[#F6F2E7]">
            Dr. Kalam's Research Archive & Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B0B8] mt-1 max-w-2xl">
            Examine the blueprints, handwritten directives, launch sequence records, and photographs.
            Collect all 8 mandatory historical documents to unlock Stage 2: DECODE.
          </p>
        </div>

        {/* Progress Counter & Stage Completion Banner */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="p-3 rounded bg-[#142536] border border-[#D6B36A]/30 text-center min-w-[160px]">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A7B0B8] block">
              Mandatory Evidence
            </span>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="font-heading text-xl font-bold text-[#D6B36A]">
                {collectedMandatoryCount}
              </span>
              <span className="text-sm text-[#A7B0B8]">/</span>
              <span className="font-heading text-base font-semibold text-[#F6F2E7]">
                {totalMandatoryCount}
              </span>
            </div>
            <div className="w-full bg-[#1E1E1E] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5A3A1E] to-[#D6B36A] h-full transition-all duration-300"
                style={{ width: `${(collectedMandatoryCount / totalMandatoryCount) * 100}%` }}
              />
            </div>
          </div>

          {isStageComplete && (
            <button
              onClick={() => {
                sound.playSuccess(soundEnabled);
                onProceedToDecode();
              }}
              className="btn-primary py-3 px-5 text-xs sm:text-sm whitespace-nowrap shadow-lg animate-pulse"
            >
              <span>Proceed to Stage 2 (Decode)</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Atmospheric Environment Showcase */}
      <div className="relative w-full rounded-lg overflow-hidden border border-[#D6B36A]/40 shadow-xl bg-[#0E1A26]">
        {/* Environment Background */}
        <div 
          className="w-full h-48 sm:h-64 lg:h-80 bg-cover bg-center transition-all duration-500 filter contrast-110"
          style={{
            backgroundImage: `url('${
              activeEnvironmentView === 'room'
                ? '/assets/archive_room_bg.jpg'
                : '/assets/desk_closeup_bg.jpg'
            }')`
          }}
        >
          {/* Subtle vignette and lamp warmth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A26] via-transparent to-black/40" />
          <div className="absolute inset-0 desk-lamp-glow" />

          {/* Environment Switcher Tabs */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              onClick={() => {
                sound.playClick(soundEnabled);
                setActiveEnvironmentView('room');
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide border cursor-pointer transition-all ${
                activeEnvironmentView === 'room'
                  ? 'bg-[#5A3A1E] text-[#F6F2E7] border-[#D6B36A]'
                  : 'bg-[#142536]/80 text-[#A7B0B8] border-transparent hover:text-white'
              }`}
            >
              Archive Room Overview
            </button>
            <button
              onClick={() => {
                sound.playClick(soundEnabled);
                setActiveEnvironmentView('desk');
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide border cursor-pointer transition-all ${
                activeEnvironmentView === 'desk'
                  ? 'bg-[#5A3A1E] text-[#F6F2E7] border-[#D6B36A]'
                  : 'bg-[#142536]/80 text-[#A7B0B8] border-transparent hover:text-white'
              }`}
            >
              Desk & Workbench Close-Up
            </button>
          </div>

          {/* Ambient Historical Inscription */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between pointer-events-none">
            <div className="bg-[#0E1A26]/85 backdrop-blur-md p-2.5 sm:p-3 rounded border border-[#D6B36A]/30 max-w-lg pointer-events-auto">
              <span className="text-[10px] font-mono uppercase text-[#D6B36A] block font-bold">
                Archival Workspace • 1970–1980
              </span>
              <p className="text-xs text-[#EADCC5] italic">
                {activeEnvironmentView === 'room'
                  ? '"You have to dream before your dreams can come true." — Dr. A.P.J. Abdul Kalam'
                  : 'Classified SLV-3 folders, technical drafts, telemetry tapes, and handwritten logs.'}
              </p>
            </div>
            <span className="badge-gold text-[10px] hidden sm:inline-flex shrink-0">
              {filteredEvidence.length} Artefacts Catalogued
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#D6B36A]/20 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              setActiveCategory('all');
            }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#5A3A1E] text-[#F6F2E7] border border-[#D6B36A]'
                : 'bg-[#142536] text-[#A7B0B8] hover:text-[#F6F2E7] border border-[#D6B36A]/20'
            }`}
          >
            All Items ({evidenceList.length})
          </button>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              setActiveCategory('document');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              activeCategory === 'document'
                ? 'bg-[#5A3A1E] text-[#F6F2E7] border border-[#D6B36A]'
                : 'bg-[#142536] text-[#A7B0B8] hover:text-[#F6F2E7] border border-[#D6B36A]/20'
            }`}
          >
            <FileText size={13} />
            Documents
          </button>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              setActiveCategory('technical');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              activeCategory === 'technical'
                ? 'bg-[#5A3A1E] text-[#F6F2E7] border border-[#D6B36A]'
                : 'bg-[#142536] text-[#A7B0B8] hover:text-[#F6F2E7] border border-[#D6B36A]/20'
            }`}
          >
            <Wrench size={13} />
            Blueprints & Telemetry
          </button>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              setActiveCategory('photograph');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              activeCategory === 'photograph'
                ? 'bg-[#5A3A1E] text-[#F6F2E7] border border-[#D6B36A]'
                : 'bg-[#142536] text-[#A7B0B8] hover:text-[#F6F2E7] border border-[#D6B36A]/20'
            }`}
          >
            <ImageIcon size={13} />
            Photographs
          </button>
          <button
            onClick={() => {
              sound.playClick(soundEnabled);
              setActiveCategory('collectible');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              activeCategory === 'collectible'
                ? 'bg-[#5A3A1E] text-[#F6F2E7] border border-[#D6B36A]'
                : 'bg-[#142536] text-[#A7B0B8] hover:text-[#F6F2E7] border border-[#D6B36A]/20'
            }`}
          >
            <Bookmark size={13} />
            Artefacts & Badges
          </button>
        </div>

        <span className="text-xs text-[#A7B0B8] hidden md:inline font-mono">
          Click any object to open full inspection
        </span>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEvidence.map((item) => {
          const isCollected = collectedIds.includes(item.id);
          const isInspected = inspectedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                sound.playClick(soundEnabled);
                onInspectItem(item);
              }}
              className="group relative panel-dark p-3.5 border border-[#D6B36A]/25 hover:border-[#D6B36A] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Item Thumbnail */}
              <div className="relative w-full h-40 bg-[#0E1A26] rounded overflow-hidden border border-[#D6B36A]/20 flex items-center justify-center p-2 mb-3">
                <img
                  src={item.assetUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badges Overlay */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {isCollected ? (
                    <span className="p-1 rounded-full bg-[#388E3C] text-white shadow-md" title="Collected in Journal">
                      <CheckCircle2 size={13} />
                    </span>
                  ) : isInspected ? (
                    <span className="p-1 rounded-full bg-[#142536] border border-[#D6B36A] text-[#D6B36A]" title="Inspected">
                      <Eye size={13} />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-[#1E1E1E]/80 border border-[#A7B0B8]/40 text-[#A7B0B8]" title="Unexamined">
                      <Sparkles size={13} />
                    </span>
                  )}
                </div>

                {item.isMandatory && (
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#5A3A1E]/90 text-[#D6B36A] font-bold border border-[#D6B36A]/40">
                      Mandatory
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta & Title */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#A7B0B8] mb-1 font-mono">
                  <span className="uppercase text-[#D6B36A]">{item.category}</span>
                  <span>{item.date || 'Circa 1977'}</span>
                </div>
                <h3 className="font-heading text-xs sm:text-sm font-bold text-[#F6F2E7] group-hover:text-[#D6B36A] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#A7B0B8] line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>

              {/* Card Footer Button Indicator */}
              <div className="mt-3 pt-2 border-t border-[#D6B36A]/15 flex items-center justify-between text-[11px]">
                <span className="text-[#D6B36A] font-medium group-hover:underline flex items-center gap-1">
                  <Search size={12} /> Inspect Detail
                </span>
                {isCollected ? (
                  <span className="text-[#81C784] font-medium">Collected</span>
                ) : (
                  <span className="text-[#A7B0B8]">Tap to open</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner if all mandatory collected */}
      {isStageComplete && (
        <div className="panel-dark p-5 border border-[#388E3C] bg-[#142536]/90 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#388E3C]/20 border border-[#388E3C] text-[#81C784] flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-[#F6F2E7]">
                Stage 1 Complete: All Mandatory Evidence Discovered!
              </h3>
              <p className="text-xs text-[#A7B0B8]">
                You have gathered the foundational blueprints, telemetry logs, and handwritten notes. You are ready to decode the puzzles.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playSuccess(soundEnabled);
              onProceedToDecode();
            }}
            className="btn-primary py-2.5 px-6 text-xs sm:text-sm shrink-0 whitespace-nowrap"
          >
            <span>Proceed to Stage 2 (Decode)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
