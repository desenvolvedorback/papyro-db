// importa o express para servidores na web
const express = require('express');

// importa o controller de exemplares
const controlador = require('../controller/itemController');

// cria o roteador das rotas de exemplar.
const rotas = express.Router();

//chama a rota para cadastrar um novo exemplar
rotas.post('/', controlador.cadastrar);

// exporta as rotas para serem usadas pelo servidor da web.
module.exports = rotas;