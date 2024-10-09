export class Player{
  playerId: string;
  name: string;
  score: number;

  constructor(playerId: string, name: string){
    this.playerId = playerId;
    this.name = name;
    this.score = 0;
  }

  public getName(): string{
    return this.name;
  }

  public getScore(): number{
    return this.score;
  }

  public setScore(score: number){
    this.score = score;
  }
}