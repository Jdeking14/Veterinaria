const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const callbackDelServidor = http.createServer((req, res) => {
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
   //3.4 obtener el payload, en el caso de haber uno
   const decoder = new StringDecoder('utf-8'); // explicacion esto lo que va a hacer es obtener un string, una fuente de datos que en este caso la manda un navegador en pedazos
   
   //3.4.1 ir acumulando la data cuando el request reciba un payload
    let buffer = '';

    req.on('data', (chunk) => {
        buffer += decoder.write(chunk);
    });
    //3.4.2 Terminar de acumular datos y decirle al decoder que finalize
    req.on('end', () => {
        buffer += decoder.end(); // No uses .end() aquí, ya que estás usando .write() en el evento 'data'
    //3.6 elegir el manejador dependiendo de la ruta y asignarle funcion que el enrutador tiene
        const payload = buffer;

        const data = {
            ruta: rutaLimpia,
            metodo: metodo,
            query: query,
            headers: headers,
            payload: payload
        };

        let handler;
        if (rutaLimpia) {
            handler = enrutador[rutaLimpia] || enrutador.default;
        } else {
            handler = enrutador.default;
        }
      // 4. ejecutar handler (manejador) para enviar la respuesta al cliente
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.writeHead(statusCode);
                res.end(respuesta);
            });
        }
    });
    //console.log({ urlActual: urlparseada})
    //no se puede poner mas res.end
});

const enrutador = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Esta ruta es /ruta' });
    },
    default: (data, callback) => {
        callback(404, { mensaje: 'Esta ruta no existe' });
    }
};

callbackDelServidor.listen(8000, () => {
    console.log('servidor escuchando en el puerto 8000');
});
