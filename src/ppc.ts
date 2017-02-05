import * as Discord from 'discord.js';

export default class PPC {
	players: Array<Discord.User>;
	private values: Object;

	constructor(players: Array<Discord.User>){
		this.players = players;
		this.values = {};
	}

	getValues(): Object {
		return this.values;
	}

	getUserWithId(id: string): Discord.User {
		for (let p of this.players){
			if (p.id === id){
				return p;
			}
		}

		return undefined;
	}

	finished(): boolean {
		for (let p of this.players){
			if (!this.values[p.id]){
				return false;
			}
		}

		return true;
	}

	private hasWin(playByFirstPlayer: PPCValue, playBySecondPlayer: PPCValue): boolean {
		return (playByFirstPlayer === PPCValue.Rock && playBySecondPlayer === PPCValue.Scissors) ||
			(playByFirstPlayer === PPCValue.Paper && playBySecondPlayer === PPCValue.Rock) ||
			(playByFirstPlayer === PPCValue.Scissors && playBySecondPlayer == PPCValue.Paper);
	}

	getResult(): Discord.User {
		let playerOne = this.players[0].id, playerTwo = this.players[1].id;
		if (this.hasWin(this.values[playerOne], this.values[playerTwo])){
			return this.getUserWithId(playerOne);
		} else if (this.hasWin(this.values[playerTwo], this.values[playerOne])){
			return this.getUserWithId(playerTwo);
		} else {
			this.values = {};
			return undefined;
		}
	}

	set(player: Discord.User, value: PPCValue): void{
		this.values[player.id] = value;
	}
}

export enum PPCValue {
	Rock = 1,
	Paper = 2,
	Scissors = 3
}