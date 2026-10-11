import { TimelineEvent, LaunchStage } from '../types';

// PUZZLE A: TIMELINE BUILDER
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1962',
    year: '1962',
    eraTag: 'Foundational Committee',
    title: 'INCOSPAR Established',
    description: 'Indian National Committee for Space Research established under Dr. Homi Bhabha and Dr. Vikram Sarabhai; Kalam joins the rocket engineering team at Thumba.',
    correctIndex: 0,
    imageUrl: '/assets/timeline_1962.jpg'
  },
  {
    id: 'tl-1969',
    year: '1969',
    eraTag: 'National Space Agency',
    title: 'ISRO Formally Established',
    description: 'Indian Space Research Organisation formally established to harness satellite and launch technology for national development; Kalam leads rocket design.',
    correctIndex: 1,
    imageUrl: '/assets/timeline_1969.jpg'
  },
  {
    id: 'tl-1972',
    year: '1972',
    eraTag: 'Programme Leadership',
    title: 'Space Commission & SLV-3 Directorship',
    description: 'Government establishes the Space Commission and Department of Space; Prof. Satish Dhawan appoints Kalam as SLV-3 Project Director.',
    correctIndex: 2,
    imageUrl: '/assets/timeline_1972.jpg'
  },
  {
    id: 'tl-1979',
    year: '10 Aug 1979',
    eraTag: 'Flight Anomaly Analysis',
    title: 'First SLV-3 Launch Setback (E-01)',
    description: 'Experimental flight suffers second-stage oxidizer valve jam; vehicle splashes down into the Bay of Bengal 560 km offshore.',
    correctIndex: 3,
    imageUrl: '/assets/timeline_1979.jpg'
  },
  {
    id: 'tl-1980',
    year: '18 Jul 1980',
    eraTag: 'Maiden Orbital Triumph',
    title: 'Historic Rohini Launch Success (E-02)',
    description: 'SLV-3 lifts off flawlessly from Sriharikota, accurately injecting the 35 kg Rohini satellite (RS-1) into Earth orbit.',
    correctIndex: 4,
    imageUrl: '/assets/timeline_1980.jpg'
  }
];

export const TIMELINE_PUZZLE = {
  id: 'puzzle-timeline',
  title: 'Mission Timeline Reconstruction',
  instructions: 'Examine archival records and mission logs on the desk to deduce the chronological sequence of these five historical milestones (1962 to 1980).',
  hints: [
    {
      level: 1,
      text: 'Examine the foundation records, Dr. Kalam’s official ID card, and the E-01 flight report in the archive to establish the sequence of institutional milestones.'
    },
    {
      level: 2,
      text: 'Trace the organizational evolution: India’s space journey began with INCOSPAR at Thumba before ISRO was formed in 1969, followed by the Space Commission in 1972, prior to the two SLV-3 flight attempts.'
    },
    {
      level: 3,
      text: 'Chronological order: INCOSPAR (1962) → ISRO creation (1969) → SLV-3 Project Directorship (1972) → E-01 Test Flight Anomaly (1979) → Rohini Orbital Success (1980).'
    }
  ],
  explanation: 'Chronological timeline verified! You have deduced the organizational and technological progression from INCOSPAR to India’s sovereign orbital capability.'
};

// PUZZLE B: TELEMETRY DECODER
export const TELEMETRY_PUZZLE = {
  id: 'puzzle-telemetry',
  title: 'Telemetry Beacon Cryptanalysis',
  instructions: 'Examine the Sriharikota Tracking Log (ST-04) and Rohini satellite records to decode the 6-character telemetry transmission from the 18 July 1980 orbital beacon.',
  codedSequence: '18 - 15 - 8 - 9 - 14 - 9',
  numericValues: [18, 15, 8, 9, 14, 9],
  channelParameters: [
    { channel: 1, value: 18, parameter: 'Downlink Carrier Transponder' },
    { channel: 2, value: 15, parameter: 'Solar Array Voltage Index' },
    { channel: 3, value: 8, parameter: 'Attitude Gyro Beacon' },
    { channel: 4, value: 9, parameter: 'Thermal Core Monitor' },
    { channel: 5, value: 14, parameter: 'Subsystem Sequencer Sync' },
    { channel: 6, value: 9, parameter: 'Orbital Verification Signal' }
  ],
  correctAnswers: ['ROHINI', 'ROHINI-1', 'ROHINI SATELLITE', 'RS-1', 'RS1'],
  hints: [
    {
      level: 1,
      text: 'Inspect the Coded Telemetry Readout Sheet (ST-04) and the Rohini Satellite (RS-1) specification record in the archive.'
    },
    {
      level: 2,
      text: 'The 6 telemetry channel values transmit the alphabet cipher of the historic 35 kg satellite deployed into orbit by SLV-3.'
    },
    {
      level: 3,
      text: 'The decoded payload designation is the 6-letter name: R - O - H - I - N - I (18=R, 15=O, 8=H, 9=I, 14=N, 9=I).'
    }
  ],
  explanation: 'Telemetry signal confirmed: "ROHINI". The Rohini RS-1 satellite beacon confirmed successful orbital injection, admitting India to the elite space club.'
};

// PUZZLE C: HANDWRITTEN NOTE / MISSING WORD
export const MISSING_WORD_PUZZLE = {
  id: 'puzzle-missing-word',
  title: 'Handwritten Project Directive',
  instructions: "Examine Dr. Kalam's handwritten directive and the E-01 Flight Review log to identify his guiding philosophy regarding setbacks.",
  quoteSentence: 'Our goal is clear — An indigenous Satellite Launch Vehicle by India, for India.\nEvery failure is our greatest ______ . Every setback brings us closer to orbital triumph.',
  correctAnswers: ['lesson', 'lessons', 'teacher', 'learning', 'stepping stone'],
  hints: [
    {
      level: 1,
      text: 'Inspect Dr. Kalam’s handwritten note dated 12 August 1977 and his remarks in the E-01 Flight Incident Report on the desk.'
    },
    {
      level: 2,
      text: 'Consider how Dr. Kalam addressed the team after the August 1979 valve failure: he insisted that setbacks are not defeats, but essential educational opportunities.'
    },
    {
      level: 3,
      text: 'Dr. Kalam declared: "The team accepts the setback as our greatest design teacher / lesson." Enter the keyword "lesson".'
    }
  ],
  explanation: 'Directive verified: "lesson". In Dr. Kalam’s leadership, failure was never an endpoint but an indispensable engineering lesson that made the 1980 orbital triumph possible.'
};

// PUZZLE D: LAUNCH SEQUENCE STAGES (DIAGRAM / TECHNICAL CLUE)
export const LAUNCH_STAGES: LaunchStage[] = [
  {
    id: 'stage-check',
    stepNumber: 1,
    name: 'System Check',
    description: 'Ground telemetry verification, guidance gyros calibration, and command destruct sync (-60 min).'
  },
  {
    id: 'stage-fueling',
    stepNumber: 2,
    name: 'Fuelling / Arming',
    description: 'Pyrotechnic arming plugs inserted and safe-arm mechanisms set to live flight mode (-15 min).'
  },
  {
    id: 'stage-ignition',
    stepNumber: 3,
    name: 'Ignition',
    description: 'Automatic master sequencer triggers Stage 1 solid propellant core booster (T - 0 sec).'
  },
  {
    id: 'stage-liftoff',
    stepNumber: 4,
    name: 'Lift-off',
    description: 'Rocket clears the launch rail; first stage accelerates vehicle through dynamic pressure (T + 2 sec).'
  },
  {
    id: 'stage-separation',
    stepNumber: 5,
    name: 'Stage Separation',
    description: 'Pyrotechnic cutters sever interstage rings; Stage 1 burns out and Stage 2 ignites cleanly (T + 53 sec).'
  },
  {
    id: 'stage-insertion',
    stepNumber: 6,
    name: 'Payload Insertion',
    description: 'Fourth-stage solid motor burns out, deploying the Rohini satellite into orbit at 8 km/sec (T + 420 sec).'
  }
];

export const DIAGRAM_PUZZLE = {
  id: 'puzzle-diagram',
  title: 'Launch Sequence Protocol',
  instructions: 'Arrange the six critical flight phases in their exact chronological countdown and flight order (Steps 1 to 6) using the Launch Sequence Protocol Sheet.',
  hints: [
    {
      level: 1,
      text: 'Consult the Launch Sequence Protocol Sheet and the SLV-III Technical Blueprint in the archive records.'
    },
    {
      level: 2,
      text: 'Ground checks and pyrotechnic arming occur prior to ignition; Stage 1 burnout must precede stage separation, and satellite deployment is the final orbital step.'
    },
    {
      level: 3,
      text: 'Chronological order: 1. System Check (-60m) → 2. Fuelling/Arming (-15m) → 3. Ignition (T-0) → 4. Lift-off (T+2s) → 5. Stage Separation (T+53s) → 6. Payload Insertion (T+420s).'
    }
  ],
  explanation: 'Flight Sequence Confirmed! You have correctly verified the autonomous flight sequence programmed into the SLV-3 onboard guidance computer.'
};
