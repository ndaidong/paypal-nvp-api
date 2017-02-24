/**
 * Starting app
 * @ndaidong
**/

var main = require('./src/paypal-nvp-api');
main.version = require('./package').version;

module.exports = main;
