const http=require('http');
const url=require('url');
const fs=require('fs');


const servidor=http.createServer(
    (pedido,respuesta)=>{
        const objetoURL=url.parse(pedido.url);
        let camino='public/'+objetoURL.pathname;
        if(camino=='public/'){
            camino='public/listado.html';
            encaminar(pedido,respuesta,camino);
        }
    }
);

servidor.listen(8080);

function encaminar(pedido,respuesta,camino){
    console.log(camino);
    switch(camino){
        case 'public/listado':{
            recuperar(pedido,respuesta);
            break;
        }
        case 'public/listadoTabla':{
            listar(pedido,respuesta);
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
    
            respuesta.writeHead(200,{'Context-Type':'text/html'});
            respuesta.write(contenido);
            const pagina=`<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title></title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    
                </head>
                <body>`
                for (let i = 0; i < 20; i++) {
                    pagina+= `<a href="listado?num=${i}">s{f}</a><br>`;                    
                }
                pagina+=`</body></html>`;
            respuesta.end(pagina);
        }

function listar(pedido,respuesta){
    let valor=url.parse(pedido.url,true).query.num;
            respuesta.writeHead(200,{'Context-Type':'text/html'});
            respuesta.write(contenido);
            const pagina=`<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title></title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    
                </head>
                <body>`
                for (let i = 0; i < 20; i++) {
                    pagina+= `${valor}*${i}=${valor*i}<br>`;                    
                }
                pagina+=`</body></html>`;
            respuesta.end(pagina);
}

console.log('servidor corriendo');