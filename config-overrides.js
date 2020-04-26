const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(...addBabelPlugins('lodash'));
