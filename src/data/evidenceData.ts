import { EvidenceItem } from '../types';

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  // 1. SLV-III Technical Blueprint (Mandatory)
  {
    id: 'ev-blueprint',
    title: 'SLV-III Technical Blueprint',
    category: 'technical',
    assetUrl: '/assets/blueprint_slv3.jpg',
    date: 'March 1975',
    shortDesc: 'Engineering blueprint detailing the 4-stage solid propellant launch vehicle architecture.',
    fullTranscription: `ISRO — SATELLITE LAUNCH VEHICLE (SLV-III)
Length: 22.7 metres | Take-off Mass: ~17 tonnes
Stage 1: Solid propellant booster (high-thrust composite motor)
Stage 2: Solid motor with secondary injection thrust vector control
Stage 3: High-strength glass-fibre composite motor
Stage 4: Upper stage solid motor for orbital injection
Payload: Rohini Satellite (RS-1) — 35 kg`,
    historicalContext: 'India chose an all-solid propulsion architecture for SLV-3 because solid propellants offered reliability and could be formulated indigenously at VSSC Thiruvananthapuram without relying on embargoed cryogenic imports.',
    clues: [
      'Confirms the 4-stage solid rocket propulsion system.',
      'Identifies the primary payload as the Rohini Satellite.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'VSSC / ISRO Technical Archives (SLV-3 Specification Document).',
    deskPosition: { top: 22, left: 16, width: 140, rotate: -3 }
  },

  // 2. Handwritten Project Director's Note (Mandatory)
  {
    id: 'ev-project-note',
    title: "Project Director's Handwritten Note",
    category: 'document',
    assetUrl: '/assets/project_note.jpg',
    date: '12 August 1977',
    shortDesc: 'A handwritten principle written by Dr. Kalam outlining the team ethos for SLV-3.',
    fullTranscription: `From the Project Director's Desk:
Our goal is clear — An indigenous Satellite Launch Vehicle by India, for India.
Every failure is a lesson. Every lesson brings us closer to success.
— A.P.J. Abdul Kalam, 12 Aug 1977`,
    historicalContext: 'During the grueling development of SLV-3, Dr. Kalam maintained an uplifting working atmosphere where engineers were encouraged to experiment boldly without fear of punitive measures for technical setbacks.',
    clues: [
      'Contains Dr. Kalam’s foundational philosophy on setbacks.',
      'Explicitly pairs "failure" with "lesson".'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'Documented archival note; verified historical philosophy of Dr. A.P.J. Abdul Kalam.',
    deskPosition: { top: 62, left: 45, width: 130, rotate: 2 }
  },

  // 3. Launch Sequence Checklist (Mandatory)
  {
    id: 'ev-launch-sequence',
    title: 'Launch Sequence Protocol Sheet',
    category: 'document',
    assetUrl: '/assets/launch_sequence.jpg',
    date: 'July 1980',
    shortDesc: 'Official countdown and flight sequence milestones from system check to payload insertion.',
    fullTranscription: `SLV-III LAUNCH SEQUENCE PROTOCOL
1. SYSTEM CHECK: Ground telemetry, command destruct, guidance sync (-60 min)
2. FUELING / ARMING: Pyrotechnic arming plugs inserted (-15 min)
3. IGNITION: Automatic sequencer trigger (T - 0 sec)
4. LIFT-OFF: Stage 1 booster burns out at T + 49 sec
5. STAGE SEPARATION: Clean pyrotechnic separation of Stage 1 & ignition of Stage 2
6. PAYLOAD INSERTION: 4th stage injects Rohini into near-Earth orbit at T + 420 sec`,
    historicalContext: 'Precision staging and autonomous sequencer control were groundbreaking achievements for ISRO in 1980, requiring domestic development of micro-electronic sequencers and pyrotechnic cutters.',
    clues: [
      'Details the 6 sequential flight milestones: System Check, Fueling, Ignition, Lift-off, Stage Separation, Payload Insertion.',
      'Key to solving the Technical Diagram puzzle.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'SDSC SHAR Mission Documentation.',
    deskPosition: { top: 48, left: 28, width: 125, rotate: -4 }
  },

  // 4. Coded Telemetry Data Sheet (Mandatory)
  {
    id: 'ev-telemetry-readout',
    title: 'Coded Telemetry Readout Sheet',
    category: 'technical',
    assetUrl: '/assets/telemetry_readout.jpg',
    date: '18 July 1980',
    shortDesc: 'Archival telemetry transmission containing encoded payload verification numbers.',
    fullTranscription: `TELEMETRY LOG — 18 JULY 1980
SRIHARIKOTA RANGE TRACKING STATION (ST-04)
CHANNEL DATA (ORBITAL PAYLOAD BEACON):
18  15  8  9  14  9
[NUMERIC KEY: A=1, B=2, C=3 ... Z=26]
DECODE PRIMARY SATELLITE DESIGNATION TO CONFIRM INSERTION.`,
    historicalContext: 'Telemetry downlinks from Sriharikota and downrange ships in the Indian Ocean transmitted coded hex and decimal frequency shifts to track beacon health.',
    clues: [
      'Numeric sequence: 18 - 15 - 8 - 9 - 14 - 9',
      'Substitution key: 18=R, 15=O, 8=H, 9=I, 14=N, 9=I -> ROHINI'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'Historical Rohini telemetry format specification.',
    deskPosition: { top: 38, left: 74, width: 130, rotate: 5 }
  },

  // 5. SLV-III Project Team Photograph (Mandatory)
  {
    id: 'ev-team-photo',
    title: 'SLV-III Engineering Team Photograph',
    category: 'photograph',
    assetUrl: '/assets/team_photo.jpg',
    date: '1976',
    shortDesc: 'Dr. Kalam with core engineering leads examining rocket designs at Thumba.',
    fullTranscription: `Photograph Inscription:
"SLV-III Core Project Team at Thumba Equatorial Rocket Launching Station (TERLS).
Pictured: Dr. A.P.J. Abdul Kalam (Project Director) reviewing structural integration with mechanical, guidance, and propellant subsystem heads."`,
    historicalContext: 'Dr. Kalam fostered an interdisciplinary culture where technicians, young graduates, and veteran scientists collaborated horizontally across multiple ISRO centers including VSSC, SHAR, and SAC.',
    clues: [
      'Visual record of the team that engineered India’s first launch vehicle.',
      'Demonstrates collegiate horizontal leadership.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'ISRO Historical Photographic Archive.',
    deskPosition: { top: 68, left: 14, width: 120, rotate: 6 }
  },

  // 6. Launch-Pad Photograph (Mandatory)
  {
    id: 'ev-launch-pad-photo',
    title: 'SLV-III on Launch Pad (Sriharikota)',
    category: 'photograph',
    assetUrl: '/assets/launch_pad_photo.jpg',
    date: 'August 1979',
    shortDesc: 'Historical photograph of SLV-3 mounted on the umbilical launch pad at Sriharikota.',
    fullTranscription: `Sriharikota Range (SHAR), East Coast of India:
The 22-metre slender rocket mounted on the launch rail umbilical tower prior to the first experimental test flight (E-01).`,
    historicalContext: 'Sriharikota island in Andhra Pradesh was selected as India’s primary spaceport due to its proximity to the equator and eastern sea coast, allowing eastward launches over the Bay of Bengal for an Earth-rotation velocity boost.',
    clues: [
      'Identifies Sriharikota (SHAR) as India’s sovereign spaceport.',
      'Shows the umbilical launch tower structure.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'Satish Dhawan Space Centre (SDSC SHAR) Archives.',
    deskPosition: { top: 22, left: 82, width: 120, rotate: -5 }
  },

  // 7. Mission Log: First Experimental Flight E-01 (Mandatory)
  {
    id: 'ev-test-log',
    title: 'Test Log: First Experimental Flight (E-01)',
    category: 'document',
    assetUrl: '/assets/test_log_sdsc.jpg',
    date: '10 August 1979',
    shortDesc: 'Official flight incident record of the first SLV-3 launch attempt and anomaly review.',
    fullTranscription: `ISRO FLIGHT INCIDENT REPORT — SDSC SHAR
Mission: SLV-III First Experimental Flight (E-01) | Date: 10 August 1979
Result: Not Successful (Suborbital splashdown at T + 317 seconds)
OBSERVATIONS:
- Stage 1 burned normally.
- Stage 2 oxidizer control valve jam caused control leak.
- Vehicle splashed into the Bay of Bengal 560 km offshore.
REMARKS BY PROJECT DIRECTOR KALAM:
"The second stage anomaly provides rich flight dynamics data. We have identified the valve leakage mechanism. The team accepts the setback as our greatest design teacher."`,
    historicalContext: 'After the 1979 failure, ISRO Chairman Prof. Satish Dhawan took full responsibility at the press conference, shielding Dr. Kalam. When the 1980 flight succeeded, Dhawan told Kalam to lead the press conference, establishing a legendary lesson in leadership.',
    clues: [
      'Date of first attempt: 10 August 1979.',
      'Identifies the 2nd stage control valve leak as the sole root cause.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'ISRO Historical Mission Records.',
    deskPosition: { top: 58, left: 63, width: 125, rotate: -2 }
  },

  // 8. Rohini Satellite Record (Mandatory)
  {
    id: 'ev-rohini',
    title: 'Rohini Satellite (RS-1) Mission Record',
    category: 'technical',
    assetUrl: '/assets/rohini_satellite.jpg',
    date: '18 July 1980',
    shortDesc: 'Technical schematic of the 35 kg indigenous experimental satellite.',
    fullTranscription: `ROHINI SATELLITE RS-1 SPECIFICATION:
Mass: 35 kg | Shape: Polyhedral prism with solar panels
Power: 16 Watts (solar array + Ni-Cd battery)
Orbit: 305 km perigee x 919 km apogee, inclination 44.7°
Payload: Digital sun sensor, four-channel telemetry, RF beacon on 137.4 MHz
Mission Life: Completed over 5,000 orbits`,
    historicalContext: 'Rohini RS-1 was designed primarily to measure the launch vehicle’s 4th stage injection accuracy and demonstrate in-orbit thermal and power telemetry.',
    clues: [
      'Payload name: Rohini (RS-1).',
      'Confirmed successful orbital injection on 18 July 1980.'
    ],
    isMandatory: true,
    collected: false,
    inspected: false,
    sourceAttribution: 'ISRO Satellite Centre (ISAC) Records.',
    deskPosition: { top: 18, left: 52, width: 130, rotate: 1 }
  },

  // OPTIONAL ARTEFACTS
  // 9. Confidential Project Folder
  {
    id: 'ev-folder',
    title: 'Project SLV-III Classified Dossier',
    category: 'document',
    assetUrl: '/assets/folder_slv3.jpg',
    date: '1973',
    shortDesc: 'Confidential archive folder containing baseline engineering plans.',
    fullTranscription: `PROJECT SLV-III — CONFIDENTIAL DOSSIER
Vikram Sarabhai Space Centre, Trivandrum
Subject: Baseline Architecture for Indigenous Satellite Launch Vehicle
Authorisation: Department of Space / Space Commission`,
    historicalContext: 'Initiated under Dr. Vikram Sarabhai’s vision and approved by the Space Commission, SLV-3 established India’s domestic aerospace supply chain.',
    clues: ['Contains project governance records and government approvals.'],
    isMandatory: false,
    collected: false,
    inspected: false,
    sourceAttribution: 'VSSC Classified Archival Series.',
    deskPosition: { top: 35, left: 5, width: 110, rotate: 8 }
  },

  // 10. ISRO ID Card
  {
    id: 'ev-id-card',
    title: "Dr. Kalam's Official ISRO Identification Card",
    category: 'collectible',
    assetUrl: '/assets/id_card.jpg',
    date: '1977',
    shortDesc: 'Official staff badge identifying A.P.J. Abdul Kalam as Project Director, SLV-3.',
    fullTranscription: `INDIAN SPACE RESEARCH ORGANISATION (ISRO)
Name: A.P.J. Abdul Kalam
Designation: Project Director, SLV-III Project
Issued at: VSSC Thumba, Trivandrum`,
    historicalContext: 'Dr. Kalam was entrusted with the SLV-3 project leadership in 1972 by Prof. Satish Dhawan.',
    clues: ['Identifies Kalam’s role as Project Director.'],
    isMandatory: false,
    collected: false,
    inspected: false,
    sourceAttribution: 'ISRO Staff Documentation.',
    deskPosition: { top: 74, left: 33, width: 85, rotate: -8 }
  },

  // 11. 1977 Pocket Diary
  {
    id: 'ev-pocket-diary',
    title: '1977 Engineering Pocket Diary',
    category: 'collectible',
    assetUrl: '/assets/pocket_diary.jpg',
    date: '1977',
    shortDesc: 'Dr. Kalam’s personal work diary with technical milestone notes.',
    fullTranscription: `DIARY ENTRY — 1977:
"Review with propulsion division: solid fuel casting uniformity is paramount. We must maintain rigorous quality circles across all shifts."`,
    historicalContext: 'Dr. Kalam was known for carrying small pocket notebooks to record technical ideas and team feedback.',
    clues: ['Emphasizes rigorous quality control across all shifts.'],
    isMandatory: false,
    collected: false,
    inspected: false,
    sourceAttribution: 'Personal Archival Collection of Dr. Kalam.',
    deskPosition: { top: 72, left: 85, width: 95, rotate: 12 }
  },

  // 12. The Hindu Newspaper Clipping
  {
    id: 'ev-newspaper',
    title: 'The Hindu: "India Takes a Giant Step into Space"',
    category: 'document',
    assetUrl: '/assets/newspaper_clipping.jpg',
    date: '19 July 1980',
    shortDesc: 'National newspaper front-page report announcing the triumph of SLV-3.',
    fullTranscription: `THE HINDU — 19 JULY 1980
"INDIA LAUNCHES INDIGENOUS SATELLITE LAUNCH VEHICLE — ROHINI IN ORBIT
Sriharikota, July 18: In an exhilarating moment of national triumph, the 17-tonne all-solid propellant SLV-3 rocket soared gracefully into the sky this morning, placing the 35 kg Rohini satellite into orbit around the Earth."`,
    historicalContext: 'The victory transformed national morale and established India’s sovereign technological capability.',
    clues: ['Confirms national acclaim and orbital success date of 18 July 1980.'],
    isMandatory: false,
    collected: false,
    inspected: false,
    sourceAttribution: 'The Hindu Archives, July 1980.',
    deskPosition: { top: 12, left: 34, width: 120, rotate: -7 }
  },

  // 13. Audio Cassette: 1979 Review Meeting
  {
    id: 'ev-cassette',
    title: 'Audio Cassette: 1979 Review Meeting',
    category: 'collectible',
    assetUrl: '/assets/cassette.jpg',
    date: '16 January 1979',
    shortDesc: 'Debrief recording of Dr. Kalam addressing team leads before the experimental campaign.',
    fullTranscription: `TAPE TRANSCRIPT:
"Colleagues, we are building something that has never existed in our country. Every subsystem is created with our own hands. We must not be afraid of teething problems. Our goal is self-reliance."`,
    historicalContext: 'Tape recordings captured the debates and relentless optimization that preceded each milestone.',
    clues: ['Emphasizes self-reliance and indigenous manufacturing.'],
    isMandatory: false,
    collected: false,
    inspected: false,
    sourceAttribution: 'Archival audio transcript reconstructed from Dr. Kalam’s published memoirs.',
    deskPosition: { top: 40, left: 88, width: 105, rotate: -10 }
  }
];
