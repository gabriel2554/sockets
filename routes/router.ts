
import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../clases/grafica';

const router = Router();

const grafica = new GraficaData();




router.get('/grafica', ( req: Request, res: Response) => {

    res.json( grafica.getDataGrafica() );

    
});

router.post('/grafica', ( req: Request, res: Response) => {
    
    const mes = req.body.mes;
    const unidades = Number (req.body.unidades);

    grafica.incrementarValor(mes, unidades );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() );

     res.json(grafica.getDataGrafica() );


});






router.post('/mensajes', ( req: Request, res: Response) => {
    
    const id:any  = req.headers.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
     
     const payload = {
         de,
         cuerpo
 }

 const server = Server.instance;

 server.io.in(id).emit( 'mensaje-privado', payload );

     res.json({
         ok:true,
         de,
         cuerpo,
         id
     });

});

//SERVICIO PARA OBTENER TODOS LOS IDs DE LOS USUARIOS 

router.get('/usuarios', ( req: Request, res: Response) => {

    const server = Server.instance;

    server.io.clients( (err:any,clientes: string [] ) =>{

        if (err) {
            return res.json({
                ok:false,
                err:Error
            })
        }

        res.json({
            ok:true,
            clientes
        });
    });

});


//OBTENER NOMBRES 

router.get('/usuarios/detalle', ( req: Request, res: Response) => {

    
    res.json({
        ok:true,
        clientes:usuariosConectados.getlista() 
        

    })








});




export default router;