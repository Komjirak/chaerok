const fs = require('fs');
const ko = JSON.parse(fs.readFileSync('src/locales/ko.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
console.log('KO Ontology:', ko.ontology.title1, ko.ontology.title2);
console.log('EN Ontology:', en.ontology.title1, en.ontology.title2);
