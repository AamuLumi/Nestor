export default class Tools {
	static getRandomFromArray<T>(array: Array<T>): T {
		return array[Math.floor(Math.random() * array.length)];
	}
}