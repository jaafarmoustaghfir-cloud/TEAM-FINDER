
export enum Position {
  GK = 'Goalkeeper',
  DEF = 'Defender',
  MID = 'Midfielder',
  ATT = 'Attacker'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  PRO = 'Professional'
}

export type PlayerType = 'Defensive' | 'Offensive' | 'Playmaker' | 'Winger' | 'Striker' | 'Box-to-Box' | 'Target Man' | 'Sweeper';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  mimeType: string;
  name: string;
  category?: 'highlight' | 'match' | 'training';
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
  socialLink?: string;
  isContactVisible: boolean;
}

export interface RecruitmentNeed {
  id: string;
  position: Position;
  ageRange: [number, number];
  level: SkillLevel;
  preferredFoot: 'Left' | 'Right' | 'Both' | 'Any';
  description: string;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  position: Position;
  preferredFoot: 'Left' | 'Right' | 'Both';
  playerType: PlayerType;
  skillLevel: SkillLevel;
  skills: {
    speed: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defense: number;
  };
  careerHistory: string[];
  trainingExperience: number; // years
  videoUrl?: string; // Main highlight video
  location: string;
  availability: 'Free agent' | 'Looking for a team' | 'Signed';
  photo: string;
  bio: string;
  isApproved: boolean;
  isRecommended?: boolean;
  gallery?: MediaItem[];
  contactInfo: ContactInfo;
}

export interface TeamNeeds {
  position: Position | 'Any';
  playerType: PlayerType | 'Any';
  ageRange: [number, number];
  weightRange: [number, number];
  heightRange: [number, number];
  skillLevel: SkillLevel | 'Any';
  minSkills: {
    speed: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defense: number;
  };
  preferredFoot: 'Left' | 'Right' | 'Both' | 'Any';
  location: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  location: string;
  locationLink?: string; // For Google Maps/GPS
  level: string;
  description: string;
  needs: TeamNeeds;
  trainingSchedule: string;
  contactOption: string;
  isApproved: boolean;
  gallery?: MediaItem[];
  contactInfo: ContactInfo;
}
