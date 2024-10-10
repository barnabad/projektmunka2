import { Player } from "./PlayerClass.js";

export class Room {
  language: "english" | "hungarian";
  maxPlayers: number;
  maxRound: number;
  drawTime: number;
  ownerId: string;
  playersList: Player[]; // Összes játékos a szobában
  currentRound: number;
  currentDrawer: string;
  drawersList: string[]; // Játékosok akik rajzolhatnak az adott körben
  currentWord: string;

  constructor(
    language: "english" | "hungarian",
    maxPlayers: number,
    maxRound: number,
    drawTime: number,
    ownerId: string,
    players: Player[]
  ) {
    this.language = language;
    this.maxPlayers = maxPlayers;
    this.maxRound = maxRound;
    this.drawTime = drawTime;
    this.ownerId = ownerId;
    this.playersList = players;

    this.currentRound = 1;
    this.currentDrawer = "";
    this.drawersList = [ownerId];
    this.currentWord = "";
  }

  addPlayer(newPlayer: Player) {
    this.playersList.push(newPlayer);
  }

  removePlayer(id: string) {
    this.playersList = this.playersList.filter(
      (player) => player.playerId !== id
    );
  }

  containsPlayer(id: string): boolean {
    return this.playersList.some((player) => player.playerId === id);
  }
}
