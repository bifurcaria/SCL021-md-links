const fs = require("fs");
const { readFileSync } = require("node:fs");
var path = require("path");
var request = require("request");
const { resolve } = require("path");
const { url } = require("inspector");

//console.log(dir)

const mdLinks = (route) => {
  //funcion que filtra md
  var dir = fs.readdirSync(route);
  function filterMd() {
    //filtro archivos md en el directorio
    dir = dir.filter((element) => path.extname(element) === ".md");
    dir = dir.toString();
    //leo archivos md
    let content = readFileSync(dir).toString("utf8");
    return content;
  }

  function fileRoute() {
    return path.join(path.resolve(route), dir)
  }

  //filtra urls
  function filterUrl(content) {
    const matchRef =
      /\[(.+)\]\((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])\)/g;
    //const matchLinks =
    // /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    if (content.match(matchRef)) {
      let match = content.match(matchRef);
      return match;
    }
  }

  function extractUrl(ref) {
    const matchLinks =
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    return ref.match(matchLinks)[0];
  }

  function extractText(ref) {
    const matchText = /(?:\[)(.+)(?:\])/;
    //console.log(ref.match(matchText)[0])
    //ojo retorna lo primero matcheado y después lo otro por eso hay q poner el 1
    return ref.match(matchText)[1];
  }




  let mdArchives = filterMd();
  let urlCollection = filterUrl(mdArchives);

  //ESTO ES LO Q NECESITO JEJE ES EL TEXTO, MATCHREF

  //pone a prueba las url
  function testUrl(url, text, file) {
    request(url)
      .on("response", function (response) {
        data = new Object();
        data.href = url;
        data.text = text;
        data.file = file;
        data.status = response.statusCode;
        data.ok = response.statusCode === 200 ? "ok" : "fail";
        console.log(data);
        return data;
      })
      .on("error", function (err) {
        data = new Object();
        data.href = url;
        data.text = text;
        data.file = file;
        data.status = "no response";
        data.ok = "fail";
        data.error = err;
        console.log(data);
        return data;
      });
  }

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

    //let collection = urlOnly
    //console.log (extractUrl(urlCollection))

   
    urlCollection.forEach((element) => {
      //console.log(element.toString())
      testUrl(extractUrl(element), extractText(element), fileRoute());
    });

    //let match = content.match(matchLinks);

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
