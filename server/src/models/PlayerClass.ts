export class Player {
  playerId: string;
  name: string;
  score: number;
  guessed: boolean;
  playerAvatar: string;

  constructor(playerId: string, name: string) {
    this.playerId = playerId;
    this.name = name;
    this.score = 0;
    this.guessed = false;
    this.playerAvatar="";
  }
}
