// importa o express para servidores na web
const express = require('express');

// importa o controller de leitores
const controlador = require('../controller/readerController');

// cria o roteador das rotas de leitor.
const rotas = express.Router();

//chama a rota para cadastrar um novo leitor
rotas.post('/', controlador.cadastrar);

// exporta as rotas para serem usadas pelo servidor da web.
module.exports = rotas;