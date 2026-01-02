
import { Player, Team, Position, SkillLevel } from './types';

export const BRAND_ASSETS = {
  LOGO_URL: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="50%" style="stop-color:%23003B73;stop-opacity:1" /><stop offset="50%" style="stop-color:%23F58220;stop-opacity:1" /></linearGradient></defs><path d="M250 50 L400 120 V250 C400 350 250 450 250 450 C250 450 100 350 100 250 V120 L250 50 Z" fill="none" stroke="url(%23shieldGrad)" stroke-width="20"/><circle cx="250" cy="250" r="120" fill="white" stroke="%23003B73" stroke-width="15"/><path d="M200 280 Q210 230 200 180" stroke="%23003B73" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M300 280 Q290 230 300 180" stroke="%23F58220" stroke-width="20" stroke-linecap="round" fill="none"/><line x1="220" y1="250" x2="280" y2="250" stroke="%23333" stroke-width="10" stroke-linecap="round"/><path d="M330 330 L420 420" stroke="%23333" stroke-width="25" stroke-linecap="round"/></svg>`,
  FAVICON_URL: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M250 50 L400 120 V250 C400 350 250 450 250 450 C250 450 100 350 100 250 V120 L250 50 Z" fill="%23003B73" /><circle cx="250" cy="250" r="120" fill="white"/><path d="M330 330 L420 420" stroke="%23333" stroke-width="40" stroke-linecap="round"/></svg>`,
  NAME: 'TEAM FINDER',
  SLOGAN: 'Find Your Squad.'
};

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Marco Rossi',
    age: 19,
    weight: 75,
    height: 182,
    position: Position.ATT,
    preferredFoot: 'Right',
    playerType: 'Striker',
    skillLevel: SkillLevel.ADVANCED,
    skills: { speed: 88, shooting: 85, passing: 72, dribbling: 90, defense: 30 },
    careerHistory: ['AC Milan Youth', 'Inter Academy'],
    trainingExperience: 8,
    location: 'Milan, Italy',
    availability: 'Looking for a team',
    photo: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop',
    bio: 'Explosive winger with a keen eye for goal. Quick in transition and clinical finisher.',
    isApproved: true,
    isRecommended: true,
    videoUrl: 'https://example.com/marco_highlights.mp4',
    contactInfo: {
      phone: '+39333444555',
      email: 'marco.rossi@example.com',
      whatsapp: '+39333444555',
      socialLink: 'https://instagram.com/marcorossi_football',
      isContactVisible: true
    },
    gallery: [
      { id: 'v1', url: '#', type: 'video', mimeType: 'video/mp4', name: 'Milan Derby Goal', category: 'highlight' },
      { id: 'v2', url: '#', type: 'video', mimeType: 'video/mp4', name: 'Training Session', category: 'training' }
    ]
  },
  {
    id: 'p2',
    name: 'David Alaba Jr',
    age: 22,
    weight: 80,
    height: 185,
    position: Position.DEF,
    preferredFoot: 'Left',
    playerType: 'Defensive',
    skillLevel: SkillLevel.PRO,
    skills: { speed: 75, shooting: 60, passing: 85, dribbling: 70, defense: 92 },
    careerHistory: ['FC Bayern Campus'],
    trainingExperience: 10,
    location: 'Munich, Germany',
    availability: 'Free agent',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop',
    bio: 'Composed center back with excellent distribution and tactical awareness.',
    isApproved: true,
    isRecommended: true,
    videoUrl: 'https://example.com/david_defending.mp4',
    contactInfo: {
      phone: '+491701234567',
      email: 'david.alaba.jr@example.com',
      isContactVisible: true
    }
  },
  {
    id: 'p3',
    name: 'Sarah Jenkins',
    age: 20,
    weight: 62,
    height: 170,
    position: Position.MID,
    preferredFoot: 'Both',
    playerType: 'Playmaker',
    skillLevel: SkillLevel.ADVANCED,
    skills: { speed: 82, shooting: 78, passing: 94, dribbling: 85, defense: 65 },
    careerHistory: ['Chelsea Academy'],
    trainingExperience: 7,
    location: 'London, UK',
    availability: 'Looking for a team',
    photo: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=400&fit=crop',
    bio: 'Visionary midfielder with exceptional passing range and close control.',
    isApproved: true,
    isRecommended: true,
    videoUrl: 'https://example.com/sarah_passes.mp4',
    contactInfo: {
      phone: '+442012345678',
      email: 'sarah.jenkins@example.com',
      whatsapp: '+442012345678',
      isContactVisible: true
    }
  },
  {
    id: 'p4',
    name: 'Leo Muro',
    age: 17,
    weight: 68,
    height: 175,
    position: Position.ATT,
    preferredFoot: 'Left',
    playerType: 'Winger',
    skillLevel: SkillLevel.INTERMEDIATE,
    skills: { speed: 92, shooting: 70, passing: 65, dribbling: 88, defense: 20 },
    careerHistory: ['Local Club'],
    trainingExperience: 4,
    location: 'Barcelona, Spain',
    availability: 'Looking for a team',
    photo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop',
    bio: 'Lightning fast winger with great potential in 1v1 situations.',
    isApproved: true,
    isRecommended: false,
    contactInfo: {
      phone: '+34600112233',
      email: 'leo.muro@example.com',
      isContactVisible: false
    }
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Red Star Academy',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop',
    location: 'Paris, France',
    level: 'Academy',
    description: 'Premier youth development club focusing on explosive attacking football and tactical discipline.',
    needs: {
      position: Position.ATT,
      playerType: 'Striker',
      ageRange: [16, 21],
      weightRange: [65, 85],
      heightRange: [175, 195],
      skillLevel: SkillLevel.ADVANCED,
      minSkills: { speed: 70, shooting: 70, passing: 50, dribbling: 60, defense: 0 },
      preferredFoot: 'Any',
      location: 'France'
    },
    trainingSchedule: 'Mon-Fri: 16:00 - 18:30',
    contactOption: 'recruitment@redstar.fr',
    isApproved: true,
    contactInfo: {
      phone: '+33123456789',
      email: 'recruitment@redstar.fr',
      whatsapp: '+33123456789',
      socialLink: 'https://redstar.fr',
      isContactVisible: true
    }
  }
];
