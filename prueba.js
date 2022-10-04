const fs = require("fs");
const { readFileSync } = require("node:fs");
var path = require("path");
var dir = fs.readdirSync("./");
var request = require("request");

//filtro archivos md en el directorio
dir = dir.filter((element) => path.extname(element) === ".md");
dir = dir.toString();
//console.log(dir)

//leo archivos md
let content = readFileSync(dir).toString("utf8");

//separo urls
const regexp =
  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
const search = () => {
  if (content.match(regexp)) {
    return content.match(regexp);
  }
};

//link de prueba
//let unLink = search()[0];
//unLink = "https://en.wikipedia.org/chicoelvis";
//console.log(unLink);

//pruebo status con mi link de prueba
request(unLink)
  .on("response", function (response) {
    console.log(response.statusCode); // <--- Here 200
  })
  .on("error", function (err) {
    console.log("Problem reaching URL: ", err);
  });
