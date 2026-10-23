// campos do leitor

const conexao = require('../database');

// cria uma função que cadastra um novo leitor
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {matricula, cpf, nome, tipo, turma, telefone, email} = req.body;
 
    // verifica se todos os campos obrigatorios foram preenchidos
    if (!matricula || !cpf || !nome || !tipo || !turma || !telefone || !email) {
        return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
    }

    try {
        // verifica se o leitor ja foi cadastrado
        let [leitores] = await conexao.query("SELECT id FROM leitor WHERE matricula = ?", [matricula]); //verifica se o leitor ja foi cadastrado
        if (leitores.length > 0) {
            return res.status(409).json({mensagem: "Leitor já cadastrado!"}); //retorna uma mensagem de erro se o leitor ja foi cadastrado
        }

        //executa o SQL para cadastrar o leitor
        let [resultado] = await conexao.query(
            "INSERT INTO leitor (matricula, cpf, nome, tipo, turma, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [matricula, cpf, nome, tipo, turma, telefone, email]
        );
            
        // retorna o resultado pro usuario
        res.status(201).json({mensagem: "Leitor cadastrado com sucesso!"});

     } catch (erro) {
        console.log(erro.mensagem); //imprime o erro no console
        console.log(erro.sqlMessage); //imprime o erro no console
        res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
     }
}

// exporta as funções para serem usadas.
module.exports = { cadastrar };