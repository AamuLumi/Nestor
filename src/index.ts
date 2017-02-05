/// <reference path="../typings/index.d.ts" />

import BotTools from './botTools';
import * as Credentials from '../config/local.env';
import * as Discord from 'discord.js';
import * as Messages from '../config/messages';
import Tools from './tools';
import Youtube from './youtube';
import YoutubeElement from './youtubeElement';
import {PPCValue} from "./ppc";

const bot = new Discord.Client();
const botTools = new BotTools(bot);

const botToken = Credentials.discordBotToken;
const textChannel = Credentials.textChannelIdToUse;
const vocalChannel = Credentials.vocalChannelIdToConnect;

const firstConnection = true;

bot.on('ready', () => {
	botTools.connectToVocalChannel(vocalChannel);
	botTools.setTextChannel(textChannel);
	if (firstConnection){
		botTools.sendMessage('Bonjour ! Je suis de retour pour vous servir. :)');
	} else {
		botTools.sendMessage('[DEBUG] Bot has been disconnected, and reconnect.');
	}
});

bot.on('disconnect', () => {
	bot.login(botToken);
});

bot.on('message', message => {
	if (message.channel instanceof Discord.DMChannel){
		let content = message.content.toLowerCase();
		if (content.indexOf('pierre')) {
			botTools.ppcSet(message.author, PPCValue.Rock);
		} else if (content.indexOf('papier')) {
			botTools.ppcSet(message.author, PPCValue.Paper);
		} else if (content.indexOf('ciseau')) {
			botTools.ppcSet(message.author, PPCValue.Scissors);
		}
	}
	if (message.channel.id !== textChannel || message.author.bot){
		return;
	}

	if (message.content.indexOf('!play') === 0) {
		let musicString = message.content.substring('!play '.length);
		if (musicString.indexOf('http') !== 0) {
			return Youtube.search(musicString, (ytElement) => botTools.playMusic(ytElement));
		}

		botTools.playMusic(new YoutubeElement(musicString));
	} else if (message.content.indexOf('!queue') === 0) {
		botTools.sendQueue();
	} else if (message.content.indexOf('!skip') === 0) {
		botTools.nextMusic();
	} else if (message.content.indexOf('!help') === 0) {
		botTools.sendHelp();
	} else if (message.content.indexOf('!ppc') === 0) {
		let userToAsk = message.mentions.users.first()
		if (userToAsk) {
			botTools.ppcAsk(message.author, userToAsk)
		} else if (message.content.toLowerCase().indexOf('oui')) {
			botTools.ppcAccept(message.author);
		} else if (message.content.toLowerCase().indexOf('oui')) {
			botTools.ppcRefuse(message.author);
		}
	} else {
		botTools.sendMessage(Tools.getRandomFromArray(Messages.errorMessages));
	}
});

bot.login(botToken);