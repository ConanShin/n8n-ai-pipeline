const fs = require('fs');
let html = fs.readFileSync('preview.html', 'utf-8');
html = html.replace('<script type="text/babel">', '<script type="text/babel" data-presets="react,typescript">');
fs.writeFileSync('preview.html', html);
