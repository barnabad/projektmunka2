export class Player {
  playerId: string;
  name: string;
  score: number;
  guessed: boolean;
  avatarUrl: string;

  constructor(playerId: string, name: string, avatarUrl: string) {
    this.playerId = playerId;
    this.name = name;
    this.score = 0;
    this.guessed = false;
    this.avatarUrl = avatarUrl;
  }
}
