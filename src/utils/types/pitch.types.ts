import { Position } from "./formation.types";

export interface FootballPitchProps {
  formation: string;
  positions: Position[];
  showFormation: boolean;
  flipPlayers: boolean;
  squadTitle: string;
  subtitle: string;
  showClubBadge: boolean;
  showManager: boolean;
  teamCaptain: string;
  manOfTheMatch: string;
  onPositionsChange?: (positions: Position[]) => void;
}

export interface PitchHeaderProps {
  formation: string;
  showFormation: boolean;
  squadTitle: string;
  subtitle: string;
}

export interface PitchMarkingsProps {
  className?: string;
}
