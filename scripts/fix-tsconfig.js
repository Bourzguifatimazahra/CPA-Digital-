const fs = require('fs');  
const files = ['tsconfig.json', 'tsconfig.app.json'];  
files.forEach(f = 
  const config = JSON.parse(fs.readFileSync(f, 'utf8'));  
