import fetch from 'node-fetch';
import YoutubeElement from './youtubeElement';
import * as Credentials from '../config/local.env';

const apiKey = Credentials.googleYoutubeAPIKey;
const ytSearchURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&key=' + apiKey + '&q=';

export default class Youtube {
	constructor(){
	}

	static extractLinkForFirstVideo(res: any): YoutubeElement{
		let item = res.items[0];

		if (item.snippet.channelTitle.indexOf('VEVO') !== -1){
			item = res.items[1];
		}

		return new YoutubeElement(item);
	}

	static search(terms : string, callback: (item: YoutubeElement) => void) : void{
		fetch(ytSearchURL + encodeURIComponent(terms))
			.then((res) => res.json())
			.then((res) => {
				callback(Youtube.extractLinkForFirstVideo(res));
			})
			.catch((err) => {
				console.log(err);
			});
	}
}