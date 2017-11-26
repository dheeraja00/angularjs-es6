/* Entry file - Webpack will read this & render directives / services / controlelrs*/

// Imported angular to create the base module
import angular from 'angular';
// App config to set base routing & other configuration
import routing from './app.config';
// Imported ui-router to support routing
import uirouter from 'angular-ui-router';
// Main scss file, this contains all other child scss files, this will get processed to css via webpack
import '../assets/css/scss/main.scss';

// Import all required controleller, directives & services
import WeatherController from './weather/weather.controller';
import WeatherCard from './shared/directives/weather-card/weather.directive';
import LocationForm from './shared/directives/location-form/location.directive';
import APIService from './shared/service/api.service';

// Created base module
angular.module('weather', [uirouter])
	.config(routing)
	.factory('apiService', APIService.apiServiceFactory)
	.controller('WeatherController', WeatherController)
	.directive('weatherCard', () => new WeatherCard())
	.directive('locationForm', () => new LocationForm());
	