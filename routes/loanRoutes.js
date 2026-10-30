// importa o express para servidores na web
const express = require('express');

// importa o controller de emprestimos
const controlador = require('../controller/loanController');

// cria o roteador das rotas de emprestimo.
const rotas = express.Router();

//chama a rota para cadastrar um novo emprestimo
rotas.post('/', controlador.cadastrar);

// exporta as rotas para serem usadas pelo servidor da web.
module.exports = rotas;