import {Socket} from 'socket.io';
import socketIO from 'socket.io';
import { Usuarioslista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';
import Server from '../clases/server';


export const usuariosConectados = new Usuarioslista();
export const conectarCliente = ( cliente: Socket,io:socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
   
    io.emit('usuarios-activos', usuariosConectados.getlista ())
}


export const desconectar = ( cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect',() => {
        console.log('Cliente desconectado');
    
      
        usuariosConectados.borrarUsuario( cliente.id );
        console.log('usuario eliminado');
        io.emit('usuarios-activos', usuariosConectados.getlista ());
    });
}

//ESCUCHAR MENSAJES
export const mensaje = (cliente:Socket, io: socketIO.Server) => {
    
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido', payload );
        io.emit('mensaje nuevo',payload);
    });


}

//OBTENER USUARIOS 
export const config = (cliente:Socket, io:socketIO.Server) => {
    cliente.on('configurar-usuario',(payload: { nombre:string } , callback: Function ) =>{
        
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre)
        io.emit('usuarios-activos', usuariosConectados.getlista ())


        callback({
            ok: true,
            mensaje:`Usuario ${payload.nombre} configurado exitosamente`
        });
    })
}

export const getUsers = (cliente:Socket, io:socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to( cliente.id). emit('usuarios-activos', usuariosConectados.getlista() );
    })
}


