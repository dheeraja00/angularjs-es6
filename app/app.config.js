// injecting routing providers
routing.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routing($urlRouterProvider, $locationProvider) {
	// For html5 mode disabled base
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
  	});
  	// Setting base url to this, my working local url was localhost that's why kept it to root, this can be changed user to user
  	$urlRouterProvider.otherwise('/');
}