var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const PORT = process.env.PORT || 5000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(PORT, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Our app is running on port ${ PORT }`);

    console.log('Listening at http://localhost:5000/');
});