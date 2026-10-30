// campos do leitor

const conexao = require('../database');

// cria uma função que cadastra um novo leitor
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {matricula, cpf, nome, tipo, turma, telefone, email} = req.body;
 
    // verifica se todos os campos obrigatorios foram preenchidos
    if (!matricula || !cpf || !nome || !tipo || !telefone || !email) {
        return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
    }

    // verifica se o tipo de cadastro é igual ao banco de dados
    if (tipo !== "aluno" && tipo !== "professor") {
        return res.status(400).json({erro: "Tipo de cadastro incorreto (Aluno ou Professor)"}); //retorna uma mensagem de erro se o tipo de cadastro for inválido
    }

    try {
        // verifica se o leitor ja foi cadastrado
        let [leitores] = await conexao.query("SELECT id FROM leitor WHERE cpf = ?", [cpf]); //verifica se o leitor ja foi cadastrado
        if (leitores.length > 0) {
            return res.status(409).json({erro: "Cpf já cadastrado!"}); //retorna uma mensagem de erro se o leitor ja foi cadastrado
        }

        //executa o SQL para cadastrar o leitor
        let [resultado] = await conexao.query(
            "INSERT INTO leitor (matricula, cpf, nome, tipo, turma, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [matricula, cpf, nome, tipo, turma || null, telefone, email]
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