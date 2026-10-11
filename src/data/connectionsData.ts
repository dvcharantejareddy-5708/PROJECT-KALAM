import { ConnectionNode, ConnectionRule } from '../types';

export const CONNECTION_NODES: ConnectionNode[] = [
  {
    id: 'node-solid-fuel',
    category: 'cause',
    title: 'Solid-Fuel Propulsion',
    subtitle: '4-Stage Indigenous Motors',
    description: 'Indigenous solid propellant motors developed at VSSC for all four launch vehicle stages.',
    iconName: 'Flame'
  },
  {
    id: 'node-composite-structure',
    category: 'cause',
    title: 'Lightweight Structure',
    subtitle: 'Glass-Fibre Motor Casings',
    description: 'Filament-wound composite casings that drastically minimized structural dead-weight.',
    iconName: 'Layers'
  },
  {
    id: 'node-guidance',
    category: 'cause',
    title: 'Guidance and Control',
    subtitle: 'Closed-Loop Inertial Control',
    description: 'Autonomous micro-electronic sequencer and rate gyros for real-time trajectory correction.',
    iconName: 'Navigation'
  },
  {
    id: 'node-launch-sequence',
    category: 'event',
    title: 'Launch Sequence',
    subtitle: 'Autonomous Staging (T - 0 to T + 420s)',
    description: 'Coordinated sequence from ignition to stage separation and orbital injection.',
    iconName: 'Clock'
  },
  {
    id: 'node-setback-1979',
    category: 'event',
    title: 'The 1979 Setback',
    subtitle: 'Flight E-01 (10 Aug 1979)',
    description: 'Second-stage oxidizer valve jam caused premature splashdown in the Bay of Bengal.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'node-lessons-learned',
    category: 'lesson',
    title: 'Lessons Learned',
    subtitle: 'Telemetry Diagnosis & Leadership',
    description: 'Exhaustive failure analysis and collective responsibility modeled by Prof. Dhawan and Dr. Kalam.',
    iconName: 'BookOpen'
  },
  {
    id: 'node-success-1980',
    category: 'outcome',
    title: 'The Successful 1980 Launch',
    subtitle: 'Flight E-02 (18 Jul 1980)',
    description: 'Flawless liftoff from Sriharikota, validating India’s first satellite launch vehicle.',
    iconName: 'Rocket'
  },
  {
    id: 'node-rohini-orbit',
    category: 'outcome',
    title: 'Rohini Satellite in Orbit',
    subtitle: 'RS-1 Orbital Insertion (35 kg)',
    description: 'Accurately inserted into a 305 x 919 km orbit, admitting India to the sovereign space club.',
    iconName: 'Radio'
  }
];

export const REQUIRED_CONNECTIONS: ConnectionRule[] = [
  {
    fromId: 'node-solid-fuel',
    toId: 'node-success-1980',
    explanation: 'Indigenous solid propellant technology provided repeatable, reliable thrust that propelled SLV-3 into orbit.'
  },
  {
    fromId: 'node-composite-structure',
    toId: 'node-rohini-orbit',
    explanation: 'Lightweight glass-fibre composite motor casings cut dead-weight, allowing the rocket to loft the 35 kg satellite.'
  },
  {
    fromId: 'node-guidance',
    toId: 'node-launch-sequence',
    explanation: 'Onboard closed-loop guidance autonomously executed the complex 6-step launch staging protocol.'
  },
  {
    fromId: 'node-setback-1979',
    toId: 'node-lessons-learned',
    explanation: 'The August 1979 suborbital splashdown provided vital flight data and triggered the diagnostic overhaul.'
  },
  {
    fromId: 'node-lessons-learned',
    toId: 'node-success-1980',
    explanation: 'Correcting the second-stage valve logic and maintaining team morale transformed the 1979 lesson into the 1980 triumph.'
  }
];
