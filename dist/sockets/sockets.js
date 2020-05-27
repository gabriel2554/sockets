"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../clases/usuarios-lista");
const usuario_1 = require("../clases/usuario");
exports.usuariosConectados = new usuarios_lista_1.Usuarioslista();
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
    io.emit('usuarios-activos', exports.usuariosConectados.getlista());
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        console.log('usuario eliminado');
        io.emit('usuarios-activos', exports.usuariosConectados.getlista());
    });
};
//ESCUCHAR MENSAJES
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje nuevo', payload);
    });
};
//OBTENER USUARIOS 
exports.config = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getlista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado exitosamente`
        });
    });
};
exports.getUsers = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getlista());
    });
};
