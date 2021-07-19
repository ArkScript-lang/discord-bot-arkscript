'use strict';

require('dotenv').config();

const { loadCommands } = require('../utils.js');

module.exports = client => {
    let start = +new Date();
    loadCommands(client);
    console.log(`Commands registered in ${+new Date() - start}ms`);
};