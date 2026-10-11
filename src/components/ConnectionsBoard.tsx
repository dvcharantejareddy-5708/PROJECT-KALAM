import React, { useState } from 'react';
import { CONNECTION_NODES, REQUIRED_CONNECTIONS } from '../data/connectionsData';
import { ConnectionLink } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Undo2, 
  Send, 
  ArrowRight,
  Flame, 
  Layers, 
  Navigation, 
  Rocket, 
  Clock, 
  AlertTriangle,
  BookOpen,
  Radio,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ConnectionsBoardProps {
  verifiedConnections: ConnectionLink[];
  onVerifyConnections: (connections: ConnectionLink[]) => void;
  onProceedToUnderstand: () => void;
  soundEnabled: boolean;
  isStageComplete: boolean;
}

export const ConnectionsBoard: React.FC<ConnectionsBoardProps> = ({
  verifiedConnections,
  onVerifyConnections,
  onProceedToUnderstand,
  soundEnabled,
  isStageComplete
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [links, setLinks] = useState<ConnectionLink[]>(verifiedConnections);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: isStageComplete ? 'correct' : 'idle',
    message: isStageComplete
      ? 'All historical relationships have been verified! You have connected the engineering innovations to the mission outcomes.'
      : ''
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame': return <Flame size={18} style={{ color: 'var(--color-gold)' }} />;
      case 'Layers': return <Layers size={18} style={{ color: 'var(--color-gold)' }} />;
      case 'Navigation': return <Navigation size={18} style={{ color: 'var(--color-gold)' }} />;
      case 'Clock': return <Clock size={18} style={{ color: 'var(--color-gold)' }} />;
      case 'AlertTriangle': return <AlertTriangle size={18} style={{ color: '#EF9A9A' }} />;
      case 'BookOpen': return <BookOpen size={18} style={{ color: '#81C784' }} />;
      case 'Rocket': return <Rocket size={18} style={{ color: 'var(--color-gold)' }} />;
      case 'Radio': return <Radio size={18} style={{ color: '#81C784' }} />;
      default: return <Sparkles size={18} style={{ color: 'var(--color-gold)' }} />;
    }
  };

  const handleSelectNode = (id: string) => {
    if (isStageComplete) return;
    sound.playClick(soundEnabled);

    if (!selectedNodeId) {
      setSelectedNodeId(id);
    } else if (selectedNodeId === id) {
      setSelectedNodeId(null);
    } else {
      // Connect selectedNodeId with id
      const existingIndex = links.findIndex(
        (l) => (l.fromId === selectedNodeId && l.toId === id) || (l.fromId === id && l.toId === selectedNodeId)
      );

      if (existingIndex >= 0) {
        // Toggle off
        setLinks(links.filter((_, idx) => idx !== existingIndex));
      } else {
        setLinks([...links, { fromId: selectedNodeId, toId: id }]);
      }
      setSelectedNodeId(null);
    }
  };

  const handleUndo = () => {
    if (isStageComplete || links.length === 0) return;
    sound.playClick(soundEnabled);
    setLinks(links.slice(0, -1));
    setFeedback({ status: 'idle', message: '' });
  };

  const handleReset = () => {
    if (isStageComplete) return;
    sound.playClick(soundEnabled);
    setLinks([]);
    setSelectedNodeId(null);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleSubmit = () => {
    if (isStageComplete) return;

    if (links.length < REQUIRED_CONNECTIONS.length) {
      sound.playError(soundEnabled);
      setFeedback({
        status: 'incorrect',
        message: `Please establish all required relationships (currently ${links.length} of ${REQUIRED_CONNECTIONS.length} connected).`
      });
      return;
    }

    // Check if every rule in REQUIRED_CONNECTIONS is present in links (bidirectional check)
    const allMatches = REQUIRED_CONNECTIONS.every((rule) =>
      links.some(
        (l) =>
          (l.fromId === rule.fromId && l.toId === rule.toId) ||
          (l.fromId === rule.toId && l.toId === rule.fromId)
      )
    );

    if (allMatches) {
      sound.playSuccess(soundEnabled);
      setFeedback({
        status: 'correct',
        message: 'All relationships historically verified! Each engineering breakthrough and operational lesson directly shaped the 18 July 1980 success.'
      });
      onVerifyConnections(links);
    } else {
      sound.playError(soundEnabled);
      setFeedback({
        status: 'incorrect',
        message: 'Some connections do not reflect historical causality. Re-examine the engineering milestones and how the 1979 lesson led to the 1980 launch.'
      });
    }
  };

  return (
    <div className="kalam-container animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div className="kalam-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="kalam-badge-gold">Stage 3: Connect</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Cause & Effect Historical Synthesis</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800 }}>
              Evidence & Milestone Connection Board
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '720px', marginTop: '4px' }}>
              Select two nodes to establish a relationship. Connect indigenous engineering choices, flight sequences, 
              the 1979 anomaly, and lessons learned to the 18 July 1980 orbital triumph.
            </p>
          </div>

          {/* Progress Tracker & Advance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid rgba(214, 179, 106, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
              textAlign: 'center',
              minWidth: '160px'
            }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block' }}>
                Required Links
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '2px 0' }}>
                <span className="font-heading" style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-gold)' }}>
                  {links.length}
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                <span className="font-heading" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-light)' }}>
                  {REQUIRED_CONNECTIONS.length}
                </span>
              </div>
              <div style={{ width: '100%', height: '5px', background: '#1E1E1E', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(links.length / REQUIRED_CONNECTIONS.length) * 100}%`,
                  background: 'linear-gradient(90deg, #5A3A1E, #D6B36A)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {isStageComplete && (
              <button
                onClick={() => {
                  sound.playSuccess(soundEnabled);
                  onProceedToUnderstand();
                }}
                className="kalam-btn-primary"
                style={{ height: '48px', padding: '0 24px' }}
              >
                <span>Proceed to Stage 4 (Understand)</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(214, 179, 106, 0.15)'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--color-aged-paper)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LinkIcon size={14} style={{ color: 'var(--color-gold)' }} />
            {selectedNodeId
              ? `Source Selected: "${CONNECTION_NODES.find(n => n.id === selectedNodeId)?.title}". Click a second node to connect.`
              : 'Click any node to begin drawing a historical link.'}
          </span>

          {!isStageComplete && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                disabled={links.length === 0}
                onClick={handleUndo}
                className="kalam-btn-secondary"
                style={{ minHeight: '34px', padding: '6px 14px', fontSize: '11px' }}
              >
                <Undo2 size={13} /> Undo Link
              </button>
              <button
                disabled={links.length === 0}
                onClick={handleReset}
                className="kalam-btn-secondary"
                style={{ minHeight: '34px', padding: '6px 14px', fontSize: '11px' }}
              >
                <RotateCcw size={13} /> Reset Board
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 8 Connection Nodes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {CONNECTION_NODES.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const connectedLinks = links.filter((l) => l.fromId === node.id || l.toId === node.id);
          const hasLinks = connectedLinks.length > 0;

          return (
            <div
              key={node.id}
              onClick={() => handleSelectNode(node.id)}
              className="kalam-panel"
              style={{
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isSelected
                  ? 'var(--color-bronze)'
                  : hasLinks
                  ? 'rgba(20, 37, 54, 0.95)'
                  : 'var(--color-bg-secondary)',
                border: isSelected
                  ? '2px solid var(--color-gold)'
                  : hasLinks
                  ? '1px solid var(--color-gold)'
                  : '1px solid rgba(214, 179, 106, 0.25)',
                boxShadow: isSelected ? 'var(--shadow-gold)' : undefined
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#0E1A26',
                  border: '1px solid rgba(214, 179, 106, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getIcon(node.iconName)}
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block' }}>
                    {node.subtitle}
                  </span>
                  <h4 className="font-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-light)', marginTop: '2px' }}>
                    {node.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                    {node.description}
                  </p>
                </div>
              </div>

              {/* Connected Badges */}
              {hasLinks && (
                <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(214, 179, 106, 0.15)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {connectedLinks.map((link, idx) => {
                    const otherId = link.fromId === node.id ? link.toId : link.fromId;
                    const otherNode = CONNECTION_NODES.find((n) => n.id === otherId);
                    return (
                      <span key={idx} className="kalam-badge-gold" style={{ fontSize: '9px' }}>
                        ↔ {otherNode?.title}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Verify Relationships Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        {!isStageComplete ? (
          <button
            onClick={handleSubmit}
            className="kalam-btn-primary"
            style={{ padding: '0 32px' }}
          >
            <Send size={15} />
            <span>Verify Relationships</span>
          </button>
        ) : (
          <div className="kalam-badge-success" style={{ padding: '8px 18px', fontSize: '13px' }}>
            <CheckCircle2 size={16} />
            <span>All 5 Historical Relationships Confirmed</span>
          </div>
        )}
      </div>

      {/* Verified Explanations */}
      {isStageComplete && (
        <div className="kalam-panel" style={{ marginTop: '20px', padding: '20px' }}>
          <h4 className="font-heading" style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Historical Explanations of Confirmed Connections
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {REQUIRED_CONNECTIONS.map((rule, idx) => {
              const fromNode = CONNECTION_NODES.find(n => n.id === rule.fromId);
              const toNode = CONNECTION_NODES.find(n => n.id === rule.toId);

              return (
                <div key={idx} style={{ background: '#0E1A26', border: '1px solid rgba(214, 179, 106, 0.25)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '4px' }}>
                    <span>{fromNode?.title}</span>
                    <span>→</span>
                    <span>{toNode?.title}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                    {rule.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {feedback.status !== 'idle' && (
        <div style={{
          marginTop: '16px',
          padding: '14px',
          borderRadius: 'var(--radius-sm)',
          background: feedback.status === 'correct' ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
          border: feedback.status === 'correct' ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
          color: feedback.status === 'correct' ? '#81C784' : '#EF9A9A',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          fontSize: '13px'
        }}>
          {feedback.status === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <div>
            <strong style={{ display: 'block', marginBottom: '2px' }}>
              {feedback.status === 'correct' ? 'Connections Validated!' : 'Connection Validation Failed'}
            </strong>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
