const http=require('http');
const url=require('url');
const fs=require('fs');
const querystring=require('querystring');

const servidor=http.createServer(
    (pedido,respuesta)=>{
        const objetoURL=url.parse(pedido.url);
        let camino='public/'+objetoURL.pathname;
        if(camino=='public/'){
            camino='public/index.html';
            encaminar(pedido,respuesta,camino);
        }
    }
);

servidor.listen(8080);

function encaminar(pedido,respuesta,camino){
    console.log(camino);
    switch(camino){
        case 'public/recuperarDatos':{
            recuperar(pedido,respuesta);
            break;
        }
        default:{
            fs.stat(camino, error=>{
                if (!error) {
                    fs.readFile(camino,(error,contenido)=>{
                        if (error) {
                            respuesta.writeHead(500,{'Context-Type':'text/plane'});
                            respuesta.write('erro interno del servicio');
                            respuesta.end();
                        } else {
                            respuesta.writeHead(200,{'Context-Type':'text/html'});
                            respuesta.write(contenido);
                            respuesta.end();
                            
                        }
                    });
                } else {
                    respuesta.writeHead(404,{'Context-Type':'text/html'});
                    respuesta.write(`<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <title></title>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            
                        </head>
                        <body>
                        <h1>No se encontró recurso</h1>
                        </body>
                    </html>`);
                    respuesta.end();
                }
            }
            );
        }
    }
}

function recuperar(pedido,respuesta){
    let info='';
    pedido.on(
        'data',datosParciales=>{
            info+=datosParciales;
        }
    );
    pedido.on(
        'end',()=>{
            const formulario=querystring.parse(info);
            respuesta.writeHead(200,{'Context-Type':'text/html'});
            respuesta.write(contenido);
            const pagina=`<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title></title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    
                </head>
                <body>
                Nombre usuario:${formulario['nombre']}<br>
                Clave usuario:${formulario['clave']}<br>
                <a href="index.html">Retornar</a>
                </body>
            </html>`;
            respuesta.end(pagina);
        }
    );
}


console.log('servidor corriendo');