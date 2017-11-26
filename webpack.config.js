/* Webpack config setup */

var webpack = require('webpack');

// Config to set the context, entry point, output, test envirnoment & loaders to loa es6, html, scss files
var config = {
	context: __dirname + '/app',
	entry: './app.js',
	output: {
		path: __dirname + '/dist',
		// output filename changed for production env
		filename: (process.env.NODE_ENV === 'production') ? 'bundle.min.js' : 'bundle.js'
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test'
		})
	],

	// Loaders to load different file types
	module: {
		loaders: [
			// Babel for es6
			{test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
			// Html file loader
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
			// Scss file loader, this complied scss to css 
			{test: /\.scss/, loader: 'style!css!sass', exclude: /node_modules/},
			// File loader to load fonts
			{test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file', exclude: /node_modules/}
		]
	}
};

// Uglify the script if project ready for production environment
if (process.env.NODE_ENV === 'production') {
	// Use uglify plugin to minify the code
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({}));
}

module.exports = config;