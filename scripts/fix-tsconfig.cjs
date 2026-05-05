const fs = require('fs');
const files = ['tsconfig.json', 'tsconfig.app.json'];
files.forEach(f => {
  const config = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (config.compilerOptions && config.compilerOptions.moduleResolution === 'bundler') {
    config.compilerOptions.moduleResolution = 'node';
    fs.writeFileSync(f, JSON.stringify(config, null, 2));
    console.log(`Fixed ${f}`);
  }
});
