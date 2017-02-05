import * as YTDL from 'ytdl-core';
import * as Credentials from '../config/local.env';
import * as Discord from 'discord.js';
import * as Messages from '../config/messages';
import Tools from './tools';
import YoutubeElement from './youtubeElement';
import PPC, {PPCValue} from './ppc';

const family = Credentials.family;
const ip = Credentials.localAddress;

export default class BotTools {
	audioDispatcher: Discord.StreamDispatcher;
	bot: Discord.Client;
	playing: boolean;
	playedMusic: YoutubeElement;
	ppc: PPC;
	queue: Array<YoutubeElement>;
	textChannel: Discord.TextChannel;
	voiceChannel: Discord.VoiceChannel;
	voiceConnection: Discord.VoiceConnection;

	constructor(bot: Discord.Client) {
		this.bot = bot;
		this.queue = [];
	}

	getChannelById<T extends Discord.Channel>(id: string): T {
		return <T>this.bot.channels.filter((v) => v.id === id).first();
	}

	connectToVocalChannel(id: string): void {
		this.voiceChannel = this.getChannelById<Discord.VoiceChannel>(id);

		if (this.voiceChannel) {
			this.voiceChannel.join().then(connection => {
				this.voiceConnection = connection;
				this.playing = false;
			});
		}
	}

	setTextChannel(id: string): void {
		this.textChannel = this.getChannelById<Discord.TextChannel>(id);
	}

	playMusic(ytElement: YoutubeElement): void {
		if (this.playing) {
			this.queue.push(ytElement);
			this.sendMessage(Tools.getRandomFromArray<string>(Messages.waitMessages)
				.replace('/music/', (ytElement.title ? ytElement.styledTitle : ytElement.url)));
			return;
		}

		this.playing = true;
		this.sendMessage(Tools.getRandomFromArray<string>(Messages.playMessages)
			.replace('/music/', (ytElement.title ? ytElement.styledTitle : 'votre vidéo Youtube')));

		let options = {filter: 'audioonly', requestOptions: {}};

		if (ip && family) {
			options.requestOptions = {
				localAddress: ip,
				family: family
			};
		}

		const stream = YTDL(ytElement.url, options);
		this.audioDispatcher = this.voiceConnection.playStream(stream, {seek: 0, volume: 0.5});

		this.setPlayedMusic(ytElement);

		this.audioDispatcher.on('end', () => {
			this.playing = false;

			if (this.queue[0]) {
				this.playMusic(this.queue[0]);
				this.queue.shift();
			} else {
				this.sendMessage(Tools.getRandomFromArray<string>(Messages.noMusicMessages));
				this.setPlayedMusic(undefined);
			}
		});
	}

	setPlayedMusic(ytElement: YoutubeElement){
		this.playedMusic = ytElement;

		if (ytElement) {
			this.bot.user.setPresence({
				status: 'online',
				afk: false,
				game: {
					name: ytElement.title ? ytElement.title : 'une musique',
					url: ytElement.url
				}
			});
		} else {
			this.bot.user.setPresence({
				status: 'idle',
				afk: true,
				game: {}
			});
		}
	}

	sendQueue(): void {
		let queueStr = 'Voici les lectures en cours :\n';
		let i = 1;

		queueStr += '[En cours] ' +
			(this.playedMusic.title ? this.playedMusic.styledTitle : this.playedMusic.url);

		for (let ytElement of this.queue) {
			queueStr += '[' + i + '] ' + (ytElement.title ? ytElement.styledTitle : ytElement.url) + '\n';
			i++;
		}

		this.textChannel.send(queueStr);
	}

	isPlaying(): boolean {
		return this.playing;
	}

	nextMusic(): void {
		if (this.audioDispatcher) {
			this.audioDispatcher.end();
		}
	}

	sendMessage(message: string): void {
		this.textChannel.send(message);
	}

	sendHelp(): void {
		this.sendMessage(Messages.helpMessage.join(''));
	}

	ppcAsk(from: Discord.User, to: Discord.User): void {
		if (!this.ppc) {
			this.sendMessage(from.username + ' défie ' + to.username + '. J\'attends la réponse.');
			this.ppc = new PPC([from, to]);
		}
	}

	ppcAccept(from: Discord.User): void {
		if (from.id === this.ppc.players[1].id){
			this.sendMessage('Duel accepté. Dites-moi Papier, Pierre ou Ciseaux en message' +
				' privé. Que le meilleur gagne !');
		}
	}

	ppcRefuse(from: Discord.User): void {
		if (from.id === this.ppc.players[1].id){
			this.ppc = undefined;
			this.sendMessage('Le duel a été refusé');
		}
	}

	ppcSet(from: Discord.User, value: PPCValue): void {
		this.ppc.set(from, value);

		if (this.ppc.finished()){
			let winner = this.ppc.getResult();
			if (winner){
				this.sendMessage(winner.username + ' a gagné. Bravo à lui !');
				this.ppc = undefined;
			} else {
				this.sendMessage('Manche nulle ! Veuillez me renvoyer un nouveau coup.');
			}
		}
	}
}