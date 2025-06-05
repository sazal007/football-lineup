import { Position } from "./formation.types";

export interface PlayerData {
  id?: number;
  shortName?: string;
  knownName?: string;
  positions?: string[];
  imgSrc?: string;
  nationality?: string;
  nationalitySrc?: string;
  club?: string;
  clubId?: number;
  clubSrc?: string;
  kitNumber?: number;
  rating?: number;
  age?: number;
}

export interface PlayerPosition {
  role: string;
  position: Position;
  index: number;
  isTeamCaptain: boolean;
  isMotm: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  playerData: PlayerData;
}
