'use strict';
const fs = require('node:fs');
const path = require('node:path');
const apiOrigin = 'https://fcc-timestamp-api-uahh.onrender.com';
const destination = path.join(__dirname, '../dist');
fs.mkdirSync(destination, { recursive: true });
fs.cpSync(path.join(__dirname, '../public'), destination, { recursive: true });
fs.writeFileSync(path.join(destination, 'config.js'), `window.TIMESTAMP_API_ORIGIN = ${JSON.stringify(apiOrigin)};\n`);
console.log(`UI built for API ${apiOrigin}`);
