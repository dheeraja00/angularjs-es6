/* Weather controller to make request for location & show weather of that location */

// Weather controlller, in ES6 controllers, services, directives are all classes
export default class WeatherController {
	constructor(apiService, $interval, $timeout, $rootScope) {
		// Intializing dependencies to the scope variable
		this.apiService = apiService;
		this.$interval = $interval;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;

		// Weather object to store weather details returned by API call
		this.weatherReport = {};
		// Form location modal, this will be sent to location API if used form
		this.location = {postal: '', country: ''};
		// Ask for location access in 10 secs
		this.timer = 10;
		// Check if weather details are fetched or not, this helps to show / hide weather details
		this.weatherFetched = false;
		// Show location form to enter location manually
		this.showLocationFrom = false;
		// Check API status success or failed
		this.apiStatus = true;
		this.errorMessage = '';

		// Show the 10secs timir
		let timer = this.$interval(() => {
        	this.timer -= 1;
        }, 1000);

		// Ask for location permission after 10 secss
        this.$timeout(() => {
        	// Clear the interval
        	this.$interval.cancel(timer);

        	// Check if geolocation is supported or not, if not show the form with the message geolocation not supported
        	if (navigator.geolocation && !this.showLocationFrom) {
        		// Watch for geolocation changes & call the api to get updated weather report
				navigator.geolocation.watchPosition((position) => {
					// Call weather report api
					this.apiService.getWeather(position.coords.latitude, position.coords.longitude, false, (response) => {
						// API response callback
						this.weatherCallback(response);
					});
				}, (err) => {
					// If user declined to give access for location show the form to manually entering location
					this.showLocationFrom = true;
					this.$rootScope.$apply();
				});
			} else if(!navigator.geolocation) {
				// If geolocation not supported show the form with below error message
				this.showLocationFrom = true;
				this.apiStatus = false;
				this.errorMessage = 'Geolocation not supported, please enter your location here'
			}
        }, this.timer * 1000);
	}

	// Function called after api response callback
	weatherCallback(response) {
		// If successfull response show the weather report else show the form with invalid location
		if (response.status == 200) {
			this.weatherSuccess(response.data);
		} else {
			this.weatherFailed(response.data);
		}
	}

	// Function to get called for successfull response
	weatherSuccess(response) {
		this.apiStatus = true;
		this.weatherFetched = true;
		this.weatherReport = response;
	}

	// Function to get called for failed response & show the error message
	weatherFailed(err) {
		this.apiStatus = false;
		this.showLocationFrom = true;
		this.errorMessage = 'Invalid location, please input valid & try again'
	}

	// If user entered location manually, call weather api with postal or country query params
	setLocation() {
		this.apiService.getWeather(this.location.postal, this.location.country, true, (response) => {
			this.weatherCallback(response);
		});
	}
}

// Injecting dependencies
WeatherController.$inject = ['apiService', '$interval', '$timeout', '$rootScope'];