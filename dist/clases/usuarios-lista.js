"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuarioslista {
    constructor() {
        this.lista = [];
    }
    /// AGREGAR USUARIO
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    //ACTUALIZAR NOMBRE 
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario');
        console.log(this.lista);
    }
    //OBTENER LISTA DE USUARIOS
    getlista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    //OBTENER USUARIO
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    //OBTENER USUARIOS EN UNA SALA EN PARTICULAR
    getUsuarioEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    //BORRAR UN USUARIO 
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.Usuarioslista = Usuarioslista;
