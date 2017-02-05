import * as Discord from 'discord.js';

export default class PPC {
	players: Array<Discord.User>;
	private values: Array<PPCValue>;

	constructor(players: Array<Discord.User>){
		this.players = players;
		this.values = [0, 0];
	}

	getValues(): Array<PPCValue> {
		return this.values;
	}

	finished(): boolean {
		for (let e of this.values){
			if (!e){
				return false;
			}
		}

		return this.values.length === this.players.length;
	}

	private hasWin(playByFirstPlayer: PPCValue, playBySecondPlayer: PPCValue): boolean {
		return (playByFirstPlayer === PPCValue.Rock && playBySecondPlayer === PPCValue.Scissors) ||
			(playByFirstPlayer === PPCValue.Paper && playBySecondPlayer === PPCValue.Rock) ||
			(playByFirstPlayer === PPCValue.Scissors && playBySecondPlayer == PPCValue.Paper);

	}

	getResult(): Discord.User {
		if (this.hasWin(this.values[0], this.values[1])){
			return this.players[1];
		} else if (this.hasWin(this.values[1], this.values[0])){
			return this.players[0];
		} else {
			this.values = [];
			return undefined;
		}
	}

	set(player: Discord.User, value: PPCValue): void{
		for (let i = 0; i < this.players.length; i++){
			if (this.players[i].id === player.id) {
				this.values[i] = value;
				return;
			}
		}
	}
}

export enum PPCValue {
	Rock= 1,
	Paper,
	Scissors
}