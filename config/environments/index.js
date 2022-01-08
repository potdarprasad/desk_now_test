const path = require('path');
const _ = require('lodash');

const environment = process.env.NODE_ENV || 'development';

const envConfig = require('./' + environment);

module.exports = _.assign(envConfig);