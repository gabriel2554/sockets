import { Usuario } from './usuario';


export class Usuarioslista {

    private lista: Usuario[] = [];

    constructor() { }

/// AGREGAR USUARIO
    public agregar (usuario: Usuario ) {

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;


    }

    //ACTUALIZAR NOMBRE 

    public actualizarNombre( id: string,nombre: string ) {

        for( let usuario of this.lista) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('Actualizando usuario');
        console.log( this.lista);
    }

    //OBTENER LISTA DE USUARIOS

    public getlista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    //OBTENER USUARIO

    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    //OBTENER USUARIOS EN UNA SALA EN PARTICULAR

    public getUsuarioEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala);

    }

    //BORRAR UN USUARIO 

    public borrarUsuario( id: string ) {

        const tempUsuario = this.getUsuario (id);

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log(this.lista);

        return tempUsuario;
    }
}