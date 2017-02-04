'use strict';

module.exports = {
	helpMessage: [
		'Voici ce que je peux faire : \n',
		'**!play** _urlYoutube_ -> Lance l\'audio de la vidéo Youtube\n',
		'**!play** _mots_ -> Lance la première vidéo Youtube avec les mots donnés\n',
		'**!queue** -> Affiche la file d\'attente des musiques\n',
		'**!skip** -> Lance la musique suivante'
	],
	playMessages: [
		'Et c\'est parti pour /music/.',
		'D\'accord Monsieur. Comme demandé, voici /music/.',
		'Je sens que le morceau /music/ est un excellent choix.',
		'Je trouve que /music/ reflète bien vos goûts douteux.',
		'Comme vous voulez. Voici /music/.',
		'Même le doggo n\'a pas fait de meilleurs morceaux que /music/.',
		'Je suis sûr que Harambe aurait aussi choisi /music/.',
		'Je ne pouvais rêver mieux que /music/. Merci.'
	],
	waitMessages: [
		'J\'ai mis /music/ de côté.',
		'Pour éviter de mettre fin à ce sublime morceau, je garde /music/ pour la suite.',
		'Encore du travail ! /music/ sera dans les prochains morceaux.',
		'Désolé Monsieur, mais /music/ ne sera pas joué tout de suite.'
	],
	noMusicMessages: [
		'Désolé Monsieur, mais tous les disques ont brûlés. :(',
		'Je ne sais pas quoi mettre d\autres Monsieur. Désolé. :\'(',
		'Pouvez-vous m\'indiquer un autre morceau s\'il vous plaît ?'
	],
	errorMessages: [
		'Désolé Monsieur, mais je n\'ai pas compris votre requête.',
		'Toutes mes confuses, j\ai été distrait par un oiseau.',
		'Je ne vois pas ce que vous voulez dire.',
		'Non.'
	]
};