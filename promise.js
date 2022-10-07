// global var
const fs = require("fs");
const { readFileSync } = require("node:fs");
var path = require("path");
var request = require("request");

// main function
const mdLinks = (route, validate) => {
  let isValid = true;
  if (!route || route === "") {
    isValid = false;
  }

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
  //ruta archivo
  function fileRoute() {
    return path.join(path.resolve(route), dir);
  }

  //filtra urls con nombre
  function filterUrl(content) {
    const matchRef =
      /\[(.+)\]\((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])\)/g;
    if (content.match(matchRef)) {
      let match = content.match(matchRef);
      return match;
    }
  }

  //filtra url
  function extractUrl(ref) {
    const matchLinks =
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    return ref.match(matchLinks)[0];
  }

  //filtra texto
  function extractText(ref) {
    const matchText = /(?:\[)(.+)(?:\])/;
    //console.log(ref.match(matchText)[0])
    //ojo retorna lo primero matcheado y después lo otro por eso hay q poner el 1
    return ref.match(matchText)[1];
  }

  //guarda md y sus urls
  let mdArchives = filterMd();
  let urlCollection = filterUrl(mdArchives);

  //pone a prueba las url
  function testUrl(url, text, file) {
    request(url)
      .on("response", function (response) {
        data = new Object();
        data.href = url;
        data.text = text;
        data.file = file;
        if (!validate) {
          console.log(data);
          return;
        }
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
        if (!validate) {
          console.log(data);
          return;
        }
        data.status = "no response";
        data.ok = "fail";
        data.error = err;
        console.log(data);
        return data;
      });
  }
  return new Promise((resolve) => {
    if (isValid === false) {
      console.log("invalid route");
    }

    resolve(
      urlCollection.forEach((element) => {
        testUrl(extractUrl(element), extractText(element), fileRoute());
      })
    );
  });
};

mdLinks("./", false);