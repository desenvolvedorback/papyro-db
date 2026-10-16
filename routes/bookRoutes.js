// importa o express para servidores na web
const express = require('express');

// importa o controller de livros
const controlador = require('../controller/bookController');

// cria o roteador das rotas de livro.
const rotas = express.Router();

//chama a rota para cadastrar um novo livro
rotas.post('/', controlador.cadastrar);

// exporta as rotas para serem usadas pelo servidor da web.
module.exports = rotas;