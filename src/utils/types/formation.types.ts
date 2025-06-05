import { PlayerData } from "./player.types";

export type Formation = {
  name: string;
  positions: Position[];
};

export type Position = {
  x: number;
  y: number;
  role: string;
  playerData?: PlayerData;
};

export type PlayerCount = 5 | 7 | 11;
