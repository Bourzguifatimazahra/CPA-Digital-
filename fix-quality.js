const fs = require('fs');  
console.log('Fixing...');  
const tc = JSON.parse(fs.readFileSync('tsconfig.json','utf8'));  
