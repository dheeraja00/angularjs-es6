/* Weather card directive, to access weather template and show the report */

export default class WeatherCard {
	constructor() {
		this.template = require('./weather-card.html'); 
        this.restrict = 'E'; 
	}
}