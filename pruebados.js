const fs = require("fs");
const { readFileSync } = require("node:fs");
var path = require("path");
var request = require("request");
const { resolve } = require("path");

//console.log(dir)

const mdLinks = (route) => {
  //funcion que filtra md
  function filterMd() {
    //filtro archivos md en el directorio
    var dir = fs.readdirSync(route);
    dir = dir.filter((element) => path.extname(element) === ".md");
    dir = dir.toString();
    //console.log(path)
    //leo archivos md
    let content = readFileSync(dir).toString("utf8");
    return content;
  }

  //filtra urls
  function filterUrl(content) {
    const regExp =
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
      if (content.match(regExp)) {
        let match = content.match(regExp);
        return match;
      }
    };
    
    //pone a prueba las url
    function testUrl(url) {
      request(url)
        .on("response", function (response) {
          console.log(response.statusCode); // <--- Here 200
        })
        .on("error", function (err) {
          console.log("Problem reaching URL: ", err);
        });
    };

    //link de prueba
    //let unLink = search()[0];
    //unLink = "https://en.wikipedia.org/chicoelvis";
    //console.log(unLink);
  
  if (route) {
    if (path.isAbsolute(route)) {
      console.log("es absoluto");
      return;
    }
    console.log("es relativo");
    let mdArchives = filterMd();
    let urlCollection = filterUrl(mdArchives);
    urlCollection.forEach((element) => {
      testUrl(element);
    });
    return;
  }
  console.log("path invalido");
};

//----PRUEBAS-----

//absoluto
//mdLinks('C:/Users/Carla/Desktop/')

//relativo
//mdLinks('./test')
mdLinks("./");

//nada -este no funciona pq nada distingue un path relativo de cualquier string, puede ser regexp o que lo lea y sea invalido
//mdLinks('!!!!')
