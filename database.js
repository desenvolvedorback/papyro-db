// importa o Dotenv para ler variáveis de ambiente
require('dotenv').config();

// importa o mysql2 para conexão com o banco de dados
const mysql = require('mysql2/promise');

// cria uma variavel de conexão com o banco de dados
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// exporta a conexão para que os outros arquivos ultilizem
module.exports = conexao;
