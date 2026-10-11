export interface AudioTranscriptLine {
  timeSeconds: number;
  speaker: string;
  text: string;
}

export const CASSETTE_DATA = {
  id: 'cassette-slv3-review-1979',
  title: 'Project Meeting: SLV-III Critical Review',
  date: '16 January 1979',
  tapeType: 'C-60 Magnetic Cassette',
  duration: 45, // seconds for full playback demo
  recordingNote: 'Reconstructed archival transcript of Dr. A.P.J. Abdul Kalam briefing team leaders at VSSC Thumba.',
  clueTitle: 'Key Technical Directive Identified',
  clueDescription: 'Dr. Kalam instructed the second-stage propulsion and telemetry teams to ensure redundant valve actuation seals and continuous real-time telemetry downlink before flight clearance.',
  transcript: [
    {
      timeSeconds: 0,
      speaker: 'Tape Audio',
      text: '[Magnetic tape whir and atmospheric radio background static]'
    },
    {
      timeSeconds: 5,
      speaker: 'Prof. Satish Dhawan',
      text: 'Good morning colleagues. Abdul, please present the readiness appraisal for the SLV-III integration phase.'
    },
    {
      timeSeconds: 14,
      speaker: 'Dr. A.P.J. Abdul Kalam',
      text: 'Thank you, Professor. All four solid motor segments have completed static proof testing. The thrust vector control and secondary injection valves must remain our primary scrutiny.'
    },
    {
      timeSeconds: 27,
      speaker: 'Dr. A.P.J. Abdul Kalam',
      text: 'Remember, self-reliance is not gifted; it is forged through relentless testing. Every anomaly in the test bay is a potential failure prevented in the sky.'
    },
    {
      timeSeconds: 38,
      speaker: 'Team Engineer',
      text: 'Telemetry channel 4 has been recalibrated for the beacon payload. Sequence timer is locked.'
    }
  ] as AudioTranscriptLine[]
};
