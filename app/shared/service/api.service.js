/* API service which helps to call different apis, currently calling weather api */

// Set $http to make http call
const HTTP = new WeakMap();

export default class APIService {
    constructor($http) {
        // Initilized $http dependency to weakmap
        HTTP.set(this, $http);
        // API key
        this.openweathermapAPI = 'ee878c9a6f9c276b38782179fb098e30';
    }

    // Function to make http request to get weather report
    getWeather(locationParam1, locationParam2, nolatlong = false, callback) {
        // Set url using lat, long or postalcode & country
        let url = this.getURL(locationParam1, locationParam2, nolatlong);

        HTTP.get(this).get(url)
        .then(function successCallback(response) {
            callback(response);
        }, function errorCallback(response) {
            console.log('Error:', response);
            callback(response);
        });
    }

    // Function to set the http url
    getURL(locationParam1, locationParam2, nolatlong = false) {
        // Base or common url
        let url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=' + this.openweathermapAPI;

        // If no latlong given then use postalcode or country code
        if(nolatlong) {
            if(locationParam1 && locationParam2) {
                url += '&zip=' + locationParam1 + ',' + locationParam2;
            } else if(locationParam1) {
                url += '&zip=' + locationParam1;
            } else {
                url += '&zip=' + locationParam2;
            }
        } else {
            url += '&lat=' + locationParam1 + '&lon=' + locationParam2;
        }

        return url;
    }

    // Declare service with dependencies
    static apiServiceFactory($http) {
        return new APIService($http);
    }
}

APIService.apiServiceFactory.$inject = ['$http'];
