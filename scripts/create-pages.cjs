// GitHub Pages serves each portfolio page directly, including on refresh.
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
for (const page of ['research', 'publications', 'experience', 'projects', '404']) {
  fs.writeFileSync(path.join(__dirname, `../build/${page}.html`), template);
}
