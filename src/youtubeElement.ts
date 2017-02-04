type YoutubeVideoObject = {
	kind: string,
	etag: string,
	id: {
		kind: string,
		videoId: string,
		channelId: string,
		playlistId: string
	},
	snippet: {
		publishedAt: Date,
		channelId: string,
		title: string,
		description: string,
		thumbnails: {
			(key): {
				url: string,
				width: number,
				height: number
			}
		},
		channelTitle: string,
		liveBroadcastContent: string
	}
};

const ytPlayURL = 'https://www.youtube.com/watch?v=';

export default class YoutubeElement {
	url: string;
	title: string;
	styledTitle: string;

	constructor(baseElement: YoutubeVideoObject | string){
		if (typeof baseElement === 'string') {
			this.url = baseElement;
		} else {
			this.url = ytPlayURL + baseElement.id.videoId;
			this.title = baseElement.snippet.title;
			this.styledTitle = '**' + this.title + '**';
		}
	}
}