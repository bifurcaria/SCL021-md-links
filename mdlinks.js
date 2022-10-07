const mdLinks = new Promise( (resolutionFunc,rejectionFunc) => {
    resolutionFunc(777);
  });
  mdLinks.then( (val) => console.log("el registro asíncrono tiene val:",val) );
  console.log("registro inmediato");
  rejectionFunc(888);
  mdLinks.then( (val) => console.log("jsdhjs"))



  if (condicion) {
    reject(`Razón`);
  } else {
    //haceralgo
    resolve('arreglo');
  }