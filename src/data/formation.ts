import { Formation, PlayerCount } from "../utils/types";


export const FORMATIONS: Record<PlayerCount, Formation[]> = {
  5: [
    {
      name: "1-2-1-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 30, y: 70, role: "LM" },
        { x: 70, y: 70, role: "RM" },
        { x: 50, y: 50, role: "CM" },
        { x: 50, y: 30, role: "ST" },
      ],
    },
    {
      name: "1-2-2",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 30, y: 60, role: "CB" },
        { x: 70, y: 60, role: "CB" },
        { x: 30, y: 30, role: "CM" },
        { x: 70, y: 30, role: "CM" },
      ],
    },
    {
      name: "1-3-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 25, y: 60, role: "CB" },
        { x: 50, y: 60, role: "CB" },
        { x: 75, y: 60, role: "CB" },
        { x: 50, y: 30, role: "CM" },
      ],
    },
  ],
  7: [
    {
      name: "2-3-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 30, y: 75, role: "LB" },
        { x: 70, y: 75, role: "RB" },
        { x: 30, y: 55, role: "LM" },
        { x: 50, y: 55, role: "CM" },
        { x: 70, y: 55, role: "RM" },
        { x: 50, y: 35, role: "ST" },
      ],
    },
    {
      name: "3-2-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 30, y: 75, role: "CB" },
        { x: 50, y: 75, role: "CB" },
        { x: 70, y: 75, role: "CB" },
        { x: 30, y: 55, role: "CM" },
        { x: 70, y: 55, role: "CM" },
        { x: 50, y: 35, role: "ST" },
      ],
    },
  ],
  11: [
    {
      name: "4-4-2",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 20, y: 75, role: "LB" },
        { x: 40, y: 75, role: "CB" },
        { x: 60, y: 75, role: "CB" },
        { x: 80, y: 75, role: "RB" },
        { x: 20, y: 55, role: "LM" },
        { x: 40, y: 55, role: "CM" },
        { x: 60, y: 55, role: "CM" },
        { x: 80, y: 55, role: "RM" },
        { x: 35, y: 35, role: "ST" },
        { x: 65, y: 35, role: "ST" },
      ],
    },
    {
      name: "4-4-1-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 20, y: 75, role: "LB" },
        { x: 40, y: 75, role: "CB" },
        { x: 60, y: 75, role: "CB" },
        { x: 80, y: 75, role: "RB" },
        { x: 20, y: 55, role: "LM" },
        { x: 40, y: 55, role: "CM" },
        { x: 60, y: 55, role: "CM" },
        { x: 80, y: 55, role: "RM" },
        { x: 50, y: 45, role: "CAM" },
        { x: 50, y: 30, role: "ST" },
      ],
    },
    {
      name: "4-3-3",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 20, y: 75, role: "LB" },
        { x: 40, y: 75, role: "CB" },
        { x: 60, y: 75, role: "CB" },
        { x: 80, y: 75, role: "RB" },
        { x: 30, y: 55, role: "CM" },
        { x: 50, y: 55, role: "CM" },
        { x: 70, y: 55, role: "CM" },
        { x: 20, y: 35, role: "LW" },
        { x: 50, y: 35, role: "CF" },
        { x: 80, y: 35, role: "RW" },
      ],
    },
    {
      name: "3-4-2-1",
      positions: [
        { x: 50, y: 90, role: "GK" },
        { x: 30, y: 75, role: "CB" },
        { x: 50, y: 75, role: "CB" },
        { x: 70, y: 75, role: "CB" },
        { x: 20, y: 55, role: "LM" },
        { x: 40, y: 55, role: "CM" },
        { x: 60, y: 55, role: "CM" },
        { x: 80, y: 55, role: "RM" },
        { x: 30, y: 35, role: "ST" },
        { x: 70, y: 35, role: "ST" },
        { x: 50, y: 30, role: "CAM" },
      ],
    },
  ],
};
