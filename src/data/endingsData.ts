import { EndingDetails, EndingType } from '../types';

export const ENDINGS_DATA: Record<EndingType, EndingDetails> = {
  true_seeker: {
    type: 'true_seeker',
    title: 'The True Seeker',
    subtitle: 'Precision, Empirical Rigor & Archival Mastery',
    description: 'You approached the archive with the discipline of a senior scientist. By rigorously dissecting telemetry frequencies, flight sequencing, and chronological milestones, you reconstructed the historical reality of India’s space programme with uncompromising fidelity.',
    quote: 'To succeed in your mission, you must have single-minded devotion to your goal.',
    criteria: 'Player meticulously examined all archival records, verified the timeline without error, and prioritized empirical evidence.'
  },
  dream_believer: {
    type: 'dream_believer',
    title: 'The Dream Believer',
    subtitle: 'Resilience, Moral Courage & Overcoming Failure',
    description: 'You grasped the emotional and philosophical heart of the mission. You recognized that the true glory of SLV-3 lay not in an effortless victory, but in the perseverance that turned the heartbreak of August 1979 into the triumph of 18 July 1980.',
    quote: 'Man needs his difficulties because they are necessary to enjoy success.',
    criteria: 'Player focused on the lessons of failure, leadership ethics, and the transformative power of perseverance.'
  },
  ignited_mind: {
    type: 'ignited_mind',
    title: 'The Ignited Mind',
    subtitle: 'Scientific Curiosity & Responsible Innovation',
    description: 'You unlocked the enduring visionary legacy of Dr. Kalam. You understood that self-reliance in space was never about national prestige alone, but about igniting the curiosity of a generation, fostering collective leadership, and using science to uplift humanity.',
    quote: 'Dreams are not that which you see while sleeping; dreams are that which do not let you sleep.',
    criteria: 'Player synthesized engineering, ethics, and national purpose, reflecting on the lasting impact of knowledge.'
  }
};
