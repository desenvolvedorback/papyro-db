// importa o conexão com o banco de dados
const conexao = require('../database');

// cria uma função que cadastra um novo livro
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {isbn, titulo, autor, editora, ano_publicacao, edicao, genero} = req.body;
 

 // verifica se todos os campos obrigatorios foram preenchidos
 if (!isbn || !titulo || !autor || !editora || !ano_publicacao || !edicao || !genero) {
     return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
 }

 try {

    // verifica se o livro ja foi cadastrado
    let [livros] = await conexao.query("SELECT id FROM livro WHERE isbn = ?", [isbn]); //verifica se o livro ja foi cadastrado

    if (livros.length > 0) {
        return res.status(409).json({mensagem: "Livro já cadastrado!"}); //retorna uma mensagem de erro se o livro ja foi cadastrado
    }

    //executa o SQL para cadastrar o livro
    let [resultado] = await conexao.query(
        "INSERT INTO livro (isbn, titulo, autor, editora, ano_publicacao, edicao, genero) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [isbn, titulo, autor, editora, ano_publicacao, edicao, genero]
    );
        
    // retorna o resultado pro usuario
    res.status(201).json({mensagem: "Livro cadastrado com sucesso!"});

 } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
 }
}

// cria uma função para listar todos os livros
async function listar(req, res) {

    try {
        // execulta o SQL para buscar todos os livros.
        const [livros] = await conexao.query("SELECT * FROM livro ORDER BY titulo");
        res.status(200).json(livros);

    } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
}
}

// cria uma função para buscar dados de apenas um livro.
async function buscar(req, res) {

    try {
        // execula o SQL para buscar apenas um livro.
        const [livros] = await conexao.query("SELECT * FROM livro WHERE id = ?", [id]);

        // verifica se o livro foi encontrado.
        if(livros.length === 0) {
            return res.status(404).json({erro: "Livro não encontrado..."})
        }
        res.status(200).json(livros[0]);

    } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
}
}
// exporta as funções para serem usadas.
module.exports = { cadastrar, listar, buscar };