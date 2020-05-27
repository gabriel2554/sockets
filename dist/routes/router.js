"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const sockets_1 = require("../sockets/sockets");
const grafica_1 = require("../clases/grafica");
const router = express_1.Router();
const grafica = new grafica_1.GraficaData();
router.get('/grafica', (req, res) => {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    grafica.incrementarValor(mes, unidades);
    const server = server_1.default.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
router.post('/mensajes', (req, res) => {
    const id = req.headers.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        de,
        cuerpo,
        id
    });
});
//SERVICIO PARA OBTENER TODOS LOS IDs DE LOS USUARIOS 
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({
                ok: false,
                err: Error
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
//OBTENER NOMBRES 
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getlista()
    });
});
exports.default = router;
