export interface Pos { x: number; y: number };
export interface MultiPos {
  message: 'join' | 'play'
  playerId: number;
  position: Pos
  color: string;
}
