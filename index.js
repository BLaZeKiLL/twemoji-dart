import fs from 'fs/promises';

const data = (await fs.readFile('./download/twemoji.css')).toString();

const names = data.match(/(?<=.twa-)(.*)(?= {)/g);
const urls = data.match(/(?<=url\()(.*)(?=\))/g);

console.log(`Names Found : ${names.length}`);
console.log(`Urls Found : ${names.length}`);

let dart = 'class Twemoji {\n';

for (let i = 0; i < names.length; i++) {
  dart += `  static const String tw_${names[i].replace(/-/g, '_')} = ${urls[i].replace(/"/g, '\'')};\n`;
}

dart += '}\n';

await fs.writeFile('./build/twemoji.dart', dart);