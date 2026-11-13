// importa o conexão com o banco de dados
const conexao = require('../database');

// cria uma função que cadastra um novo exemplar
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {id_livro, codigo} = req.body;
 

 // verifica se todos os campos obrigatorios foram preenchidos
 if (!id_livro || !codigo) {
     return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
 }

 try {

    // verifica se o livro ja foi cadastrado
    let [livros] = await conexao.query("SELECT id FROM exemplar WHERE id = ?", [id_livro]); //verifica se o livro ja foi cadastrado

    if (livros.length > 0) {
        return res.status(409).json({erro: "Livro não encontrado....."}); //retorna uma mensagem de erro se o livro ja foi cadastrado
    }

    // verifica se o exemplar ja foi cadastrado
    let [exemplares] = await conexao.query("SELECT id FROM exemplar WHERE codigo = ?", [codigo]); //verifica se o exemplar ja foi cadastrado
    if (exemplares.length > 0) {
        return res.status(409).json({erro: "Exemplar já cadastrado....."}); //retorna uma mensagem de erro se o exemplar ja foi cadastrado
    }

    //executa o SQL para cadastrar o exemplar
    let [resultado] = await conexao.query(
        "INSERT INTO exemplar (id_livro, codigo, situacao) VALUES (?, ?, ?)",
        [id_livro, codigo, "Disponivel"]
    );
        
    // retorna o resultado pro usuario
    res.status(201).json({mensagem: "Exemplar cadastrado com sucesso!"});

 } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
 }
}

// cria uma função para listar todos os exemplares
async function listar(req, res) {

    try {
        // execula o SQL para buscar todos os exemplares.
        const [exemplares] = await conexao.query(
            `SELECT E.id, E.codigo, E.situacao, E.id_livro, L.titulo
	        FROM exemplar E
            JOIN livro L ON L.id = E.id_livro
            ORDER BY E.codigo`
            );
        res.status(200).json(exemplares);

    } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
}
}

// cria uma função para buscar dados de apenas um exemplar.
async function buscar(req, res) {

    try {
        // execula o SQL para buscar apenas um exemplar.
        const [exemplares] = await conexao.query(
            `SELECT E.id, E.codigo, E.situacao, E.id_livro, L.titulo
            FROM exemplar E
            JOIN livro L ON L.id = E.id_livro
            WHERE E.id = ?`, [req.params.id]
        );

        // verifica se o livro foi encontrado.
        if(exemplares.length === 0) {
            return res.status(404).json({erro: "Exemplar de Livro não encontrado..."})
        }
        res.status(200).json(exemplares[0]);

    } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
}
}

// exporta as funções para serem usadas.
module.exports = { cadastrar, listar, buscar };