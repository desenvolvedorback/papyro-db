// importa o conexão com o banco de dados
const conexao = require('../database');

// função que faz a validação as datas
function validarData (data) {
      // Converte o texto recebido em uma data do JavaScript.
  const dataConvertida = new Date(data);

  // A data é válida quando segue o formato.
  return /^\d{4}-\d{2}-\d{2}$/.test(data) &&
    !isNaN(dataConvertida) &&
    dataConvertida.toISOString().slice(0, 10) === data;
}

// cria uma função que cadastra um novo emprestimo
async function cadastrar (req, res) {
    // recebe os dados enviados pela requisição
    let {id_leitor, id_exemplar, data_emprestimo, data_prevista_devolucao} = req.body;
 

 // verifica se todos os campos obrigatorios foram preenchidos
 if (!id_leitor || !id_exemplar || !data_emprestimo || !data_prevista_devolucao) {
     return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"}); //retorna uma mensagem de erro se algum campo obrigatório não for preenchido
 }

// verifica se as datas são validas 
if (!validarData(data_emprestimo) || validarData(data_prevista_devolucao)) {
    return res.status(400).json({erro: "Datas no formato inválido..."});
}

//  verifica se a data prevista de devolução é posterior a de emprestimo
if (data_prevista_devolucao <= data_emprestimo){
    return res.status(400).json({erro: "A data prevista de devolução deve ser posterior a de empréstimo."});
}

 try {

    // verifica se o leitor informado está cadastrado
    let [leitores] = await conexao.query("SELECT id FROM leitor WHERE id_leitor = ?", [id_leitor]); //verifica se o leitor existe

    if (leitores.length === 0) {
        return res.status(409).json({mensagem: "Leitor não encontrado..."}); //retorna uma mensagem de erro se o leitor não foi encontrado
    }

    // verifica se o exemplar informado está cadastrado
    let [exemplares] = await conexao.query("SELECT id FROM exemplar WHERE id = ?", [id]); //verifica se o exemplar existe

    if (exemplares.length > 0) {
        return res.status(409).json({mensagem: "Exemplar Não encontrado"}); //retorna uma mensagem de erro se o livro exemplar nao existe
    }

    // verifica se o exemplar de livro está disponivel para emprestimo
    if (exemplares[0].situacao !== 'Disponivel'){
        return res.status(409).json({mensagem: "Exemplar Não está disponível para empréstimo...."}); //retorna uma mensagem de erro se o livro ja foi emprestado
    }

    //executa o SQL para emprestar  o exemplar do livro
    let [resultado] = await conexao.query(
        "INSERT INTO emprestimo (id_leitor, id_exemplar, data_emprestimo, data_prevista_devolucao) VALUES (?, ?, ?, ?)",
        [id_leitor, id_exemplar, data_emprestimo, data_prevista_devolucao]
    );

    // atualiza a situação do exemplar para "Emprestado"
    await conexao.query(
        "UPDATE exemplar SET situacao = 'Emprestado' WHERE id = ?",
        [id_exemplar]
    );
    
    // retorna o resultado pro usuario
    res.status(201).json({mensagem: "Empréstimo feito com sucesso!"});

 } catch (erro) {
    console.log(erro.mensagem); //imprime o erro no console
    console.log(erro.sqlMessage); //imprime o erro no console
    res.status(500).json({erro: "Não foi possível atender a requisição!"}); //retorna uma mensagem de erro do servidor
 }
}

// exporta as funções para serem usadas.
module.exports = { cadastrar };