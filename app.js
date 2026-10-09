// importa o express para servidores na web
const express = require('express');

// importa as rotas de cada tabela do banco de dados
const rotasLivros = require('./routes/bookRoutes');

// cria a aplicação na web
const app = express();

// permite que o expresse entenda requisições em JSON
app.use(express.json());

// define a porta para o servidor
const porta = 3000;

// cria uma rota que responde na raiz da web com um texto
app.get('/', (req, res) => {
    res.send('Servidor da web da Papyro no ar!');
});

// liga as rotas de cada tabela ao seu endereço na web
app.use('/livros', rotasLivros);

// escuta as requisições feita ao sevidor da web
app.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
});