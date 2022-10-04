const { doesNotReject } = require('assert');


//module.exports = () => 
{
  //variables
  const fs = require('fs')
  const { readFileSync } = require('node:fs');

  let texto = readFileSync('hola.txt').toString('utf8')
  console.log(texto)
//ver si es md
var path = require('path');
var oneExt = path.extname('README.md');
let markdown = false
if (oneExt === '.md') {
  markdown = true
}
console.log(markdown);
//leer directorio, abrir carpetas
var dir = fs.readdirSync('./')
console.log(dir)
//mostrar extension
var ext = dir.map(path.extname)
var allMd = ext.filter((element) => element === '.md')
console.log(allMd)
//ver si tienen links adentro


//juntar archivos si son md
//leer archivos
//ver si hay links

}


/* crear una función a la que le paso directorio (por ahora solo eso)
abra el directorio, lo recorra, y para cada archivo:
vea las extensiones
si no es md, no hagas nada
si es md, léelo y dime primero si hay links
después, ve si est*/