const http = require('node:http');
const url = require('url');

const server = http.createServer((req, res) => {
    //1. obtener url desde el objeto request
    const urlActual = req.url
    const urlparseada = url.parse(urlActual,true);//el true hace que se convierta en querystain y se pase a un objeto
    //2. obtener la ruta
    const ruta = urlparseada.pathname;
    //3.quitamos el slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    //3.1 obtener el metodo http
    const metodo = req.method.toLocaleLowerCase();
    //3.2 obtenerlas variables del query url
    const {query = {}} = urlparseada; //explicacion de {query = {}}: haciendo esto se le dice que si no llegan querys que nos la haga un objeto vacio
    //3.3 obtener headers
    const {headers = {}} = req;
    console.log(headers);
    // 4. enviar respuesta dependiendo de la ruta
    switch (rutaLimpia) {
      case 'ruta':
        res.end('estas en /ruta');
        break;
        default:
          res.end('desconocida');
    }
   
    //console.log({ urlActual: urlparseada})
    //no se puede poner mas res.end
});

server.listen(8000, ()=> {
    console.log('servidor escuchando en el puerto 8000');
});