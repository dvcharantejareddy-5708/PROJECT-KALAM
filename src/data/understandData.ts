import { FactInterpretationItem, ReasoningQuestion } from '../types';

export const FACT_INTERPRETATION_ITEMS: FactInterpretationItem[] = [
  {
    id: 'fi-1',
    statement: 'On 18 July 1980, SLV-3 E-02 placed the 35 kg Rohini satellite (RS-1) into an orbit of 305 km x 919 km.',
    type: 'fact',
    explanation: 'Documented Archival Fact: Verified by ISRO telemetry stations, Car Nicobar tracking, and global radars.'
  },
  {
    id: 'fi-2',
    statement: 'The August 1979 setback was the single most valuable catalyst that united the engineering team and ensured future reliability.',
    type: 'interpretation',
    explanation: 'Historical Interpretation: An insightful deduction supported by memoirs and team accounts, reflecting the psychological turning point.'
  },
  {
    id: 'fi-3',
    statement: 'SLV-3 was engineered as a four-stage rocket utilizing solid propellants across all stages.',
    type: 'fact',
    explanation: 'Documented Archival Fact: Specified in the baseline technical blueprint and VSSC manufacturing archives.'
  },
  {
    id: 'fi-4',
    statement: 'India’s space programme demonstrated that ethical leadership and psychological safety are more critical to aerospace success than massive financial budgets.',
    type: 'interpretation',
    explanation: 'Historical Interpretation: A defensible philosophical insight derived from how Dhawan and Kalam managed team morale.'
  }
];

export const REASONING_QUESTIONS: ReasoningQuestion[] = [
  {
    id: 'rq-1',
    question: 'Why did ISRO choose an indigenous all-solid propellant architecture for SLV-3 rather than purchasing foreign rocket stages?',
    options: [
      {
        id: 'rq1-opt-a',
        text: 'Solid propellants could be manufactured indigenously in Thiruvananthapuram, ensuring self-reliance and immunity to international embargoes.',
        isCorrect: true,
        explanation: 'Historically verified: India lacked access to cryogenic or advanced liquid stages due to technology denial regimes. Formulating solid propellants domestically ensured complete sovereign autonomy.'
      },
      {
        id: 'rq1-opt-b',
        text: 'Solid rocket engines are lighter than satellites and require no ignition mechanism.',
        isCorrect: false,
        explanation: 'Incorrect: Solid motors require complex pyrotechnic ignition systems and careful grain casting.'
      },
      {
        id: 'rq1-opt-c',
        text: 'Foreign nations offered free liquid engines, but ISRO declined to preserve launch secrecy.',
        isCorrect: false,
        explanation: 'Incorrect: High-technology liquid engines were not freely available and were strictly controlled under missile technology regimes.'
      }
    ]
  },
  {
    id: 'rq-2',
    question: 'How did ISRO Chairman Prof. Satish Dhawan handle the public press briefing after the August 1979 launch failure?',
    options: [
      {
        id: 'rq2-opt-a',
        text: 'He canceled the project and suspended the second-stage propulsion engineering team.',
        isCorrect: false,
        explanation: 'Incorrect: Dhawan gave the team complete backing and confidence to diagnose the fault.'
      },
      {
        id: 'rq2-opt-b',
        text: 'He personally took full responsibility for the failure before the press, shielding Project Director Kalam and his engineers.',
        isCorrect: true,
        explanation: 'Historically verified: Dhawan faced the harsh press alone in 1979. When the 1980 mission succeeded, he stepped aside and asked Kalam to lead the triumphant briefing—a legendary benchmark of leadership.'
      },
      {
        id: 'rq2-opt-c',
        text: 'He blamed external weather conditions and delayed the second launch attempt by ten years.',
        isCorrect: false,
        explanation: 'Incorrect: The team rectified the valve anomaly and launched successfully within eleven months.'
      }
    ]
  },
  {
    id: 'rq-3',
    question: 'What made the successful Rohini launch on 18 July 1980 a milestone of strategic global significance?',
    options: [
      {
        id: 'rq3-opt-a',
        text: 'It proved that India was the first nation to reach the Moon.',
        isCorrect: false,
        explanation: 'Incorrect: The Rohini launch was near-Earth orbital, not lunar.'
      },
      {
        id: 'rq3-opt-b',
        text: 'It made India only the sixth sovereign nation in the world capable of launching its own satellites using a domestic rocket.',
        isCorrect: true,
        explanation: 'Historically verified: India joined the USSR, USA, France, Japan, and China as nations with independent, sovereign orbital launch capability.'
      },
      {
        id: 'rq3-opt-c',
        text: 'It eliminated the need for future launch vehicles such as PSLV and GSLV.',
        isCorrect: false,
        explanation: 'Incorrect: SLV-3 was the foundational stepping-stone that paved the way for ASLV, PSLV, and GSLV.'
      }
    ]
  }
];
