import { TimelineEvent, LaunchStage } from '../types';

// PUZZLE A: TIMELINE BUILDER
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1962',
    year: '1962',
    title: 'INCOSPAR Established',
    description: 'Indian National Committee for Space Research established under Dr. Homi Bhabha and Dr. Vikram Sarabhai; Kalam joins the rocket engineering team.',
    correctIndex: 0,
    imageUrl: '/assets/timeline_1962.jpg'
  },
  {
    id: 'tl-1969',
    year: '1969',
    title: 'ISRO Established',
    description: 'Indian Space Research Organisation formally established to harness space technology for national development; Kalam leads rocket projects.',
    correctIndex: 1,
    imageUrl: '/assets/timeline_1969.jpg'
  },
  {
    id: 'tl-1972',
    year: '1972',
    title: 'Space Commission & Dept of Space',
    description: 'Government establishes the Space Commission and Department of Space; Prof. Satish Dhawan appoints Kalam as SLV-3 Project Director.',
    correctIndex: 2,
    imageUrl: '/assets/timeline_1972.jpg'
  },
  {
    id: 'tl-1979',
    year: '10 Aug 1979',
    title: 'First SLV-3 Launch Setback (E-01)',
    description: 'Experimental flight suffers second-stage valve control leakage; rocket splashes down into the Bay of Bengal 560 km offshore.',
    correctIndex: 3,
    imageUrl: '/assets/timeline_1979.jpg'
  },
  {
    id: 'tl-1980',
    year: '18 Jul 1980',
    title: 'Historic Rohini Launch Success (E-02)',
    description: 'SLV-3 lifts off flawlessly from Sriharikota, accurately placing the 35 kg Rohini satellite (RS-1) into Earth orbit.',
    correctIndex: 4,
    imageUrl: '/assets/timeline_1980.jpg'
  }
];

export const TIMELINE_PUZZLE = {
  id: 'puzzle-timeline',
  title: 'Mission Timeline Builder',
  instructions: 'Arrange these five historical milestones in chronological sequence from 1962 to 1980.',
  hints: [
    {
      level: 1,
      text: 'Examine the dates on the evidence documents: INCOSPAR was founded in 1962, followed by ISRO in 1969 and the Space Commission in 1972.'
    },
    {
      level: 2,
      text: 'The order is: 1962 (INCOSPAR) -> 1969 (ISRO) -> 1972 (Space Commission) -> 1979 (First Flight Setback) -> 18 July 1980 (Rohini Orbit).'
    }
  ],
  explanation: 'Chronological timeline verified! You have reconstructed the organizational and technological progression from INCOSPAR to India’s maiden orbital flight.'
};

// PUZZLE B: TELEMETRY DECODER
export const TELEMETRY_PUZZLE = {
  id: 'puzzle-telemetry',
  title: 'Telemetry Code Decoder',
  instructions: 'Decode the numeric telemetry transmission from the 18 July 1980 orbital beacon using the alphanumeric substitution cipher (A=1, B=2 ... Z=26).',
  codedSequence: '18 - 15 - 8 - 9 - 14 - 9',
  numericValues: [18, 15, 8, 9, 14, 9],
  correctAnswers: ['ROHINI', 'ROHINI-1', 'ROHINI SATELLITE', 'RS-1', 'RS1'],
  hints: [
    {
      level: 1,
      text: 'Apply the substitution key: 1=A, 2=B, 3=C... 18=R. The decoded word is the name of the satellite.'
    },
    {
      level: 2,
      text: 'Letters decode to: 18=R, 15=O, 8=H, 9=I, 14=N, 9=I. Enter the 6-letter name: ROHINI.'
    }
  ],
  explanation: 'Telemetry signal decoded: "ROHINI". The Rohini RS-1 satellite beacon confirmed successful orbital injection, admitting India to the elite space club.'
};

// PUZZLE C: HANDWRITTEN NOTE / MISSING WORD
export const MISSING_WORD_PUZZLE = {
  id: 'puzzle-missing-word',
  title: 'Handwritten Project Directive',
  instructions: "Examine Dr. Kalam's handwritten project note and identify the missing word in his guiding principle.",
  quoteSentence: 'Every failure is a ______ . Every lesson brings us closer to success.',
  correctAnswers: ['lesson', 'lessons', 'a lesson'],
  hints: [
    {
      level: 1,
      text: 'Inspect the project note dated 12 August 1977 on Dr. Kalam’s desk. Look at how he defines a setback.'
    },
    {
      level: 2,
      text: 'The missing keyword begins with L and ends with N: "Every failure is a l _ _ _ _ n."'
    }
  ],
  explanation: 'Directive verified: "lesson". In Dr. Kalam’s leadership, failure was never an endpoint but an indispensable engineering lesson that made the 1980 success possible.'
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
  instructions: 'Arrange the six critical flight phases in their exact chronological countdown and flight order (Steps 1 to 6).',
  hints: [
    {
      level: 1,
      text: 'Consult the Launch Sequence Sheet in the archive: ground checks occur first, then fuelling, followed by ignition and lift-off.'
    },
    {
      level: 2,
      text: 'Order: 1. System Check -> 2. Fuelling -> 3. Ignition -> 4. Lift-off -> 5. Stage Separation -> 6. Payload Insertion.'
    }
  ],
  explanation: 'Flight Sequence Confirmed! You have correctly verified the autonomous flight sequence programmed into the SLV-3 onboard guidance computer.'
};
