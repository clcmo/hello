const fs = require('node:fs');
const path = require('node:path');
const pug = require('pug');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const site = require(path.join(root, 'config/site.json'));

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), output, {
  recursive: true,
  filter(source) {
    return !source.endsWith('.pug') && !source.endsWith('.md');
  }
});

const pages = [
  ['public/index.pug', 'index.html'],
  ['public/en.pug', path.join('en', 'index.html')],
  ['public/regras.pug', path.join('regras', 'index.html')],
  ['public/rules.pug', path.join('rules', 'index.html')]
];

for (const [source, destination] of pages) {
  const target = path.join(output, destination);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  let html = pug.renderFile(path.join(root, source), { site });
  if (destination !== 'index.html') {
    html = html
      .replaceAll('href="./style/style.css"', 'href="../style/style.css"')
      .replaceAll('href="./regras"', 'href="../regras"')
      .replaceAll('href="./"', 'href="../"');
  }

  fs.writeFileSync(target, html);
}

fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Static Pages build created in ${output}`);
