// importa o conexão com o banco de dados
const conexao = require('../database');

// cria uma função que cadastra um novo livro
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {isbn, titulo, autor, editora, ano_publicacao, edicao, genero} = req.body;
 }

 // verifica se todos os campos obrigatorios foram preenchidos
 if (!isbn || !titulo || !autor || !editora || !ano_publicacao || !edicao || !genero) {
     return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
 }

 try {

    // verifica se o livro ja foi cadastrado
    let [livros] = await conexao.query("SELECT id FROM livros WHERE isbn = ?", [isbn]); //verifica se o livro ja foi cadastrado

    if (livros.length > 0) {
        return res.status(409).json({mensagem: "Livro já cadastrado!"}); //retorna uma mensagem de erro se o livro ja foi cadastrado
    }

    //executa o SQL para cadastrar o livro
    let [resultado] = await conexao.query(
        "INSERT INTO livros (isbn, titulo, autor, editora, ano_publicacao, edicao, genero) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [isbn, titulo, autor, editora, ano_publicacao, edicao, genero]
    );
        
    // retorna o resultado pro usuario
    res.status(201).json({mensagem: "Livro cadastrado com sucesso!"});

 } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
 }

// exporta as funções para serem usadas.
module.exports = { cadastrar };