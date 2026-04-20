// Importa o model responsável por acessar o banco de dados
var tarefaModel = require("../models/tarefaModel");

// Cadastrar a tarefa
function cadastrar(req, res) {

    // Captura os dados enviados pelo frontend (body da requisição)
    var nome = req.body.nome;
    var disciplina = req.body.disciplina;
    var data = req.body.data;

    // Define o status inicial da tarefa
    var status = "pendente";

    // ID do usuário dono da tarefa
    var fkUsuario = req.body.fkUsuario;

    // Chama o model para inserir no banco
    tarefaModel.cadastrar(nome, disciplina, data, status, fkUsuario)
        .then(() => 
            // Retorna sucesso para o frontend
            res.status(200).send("Tarefa cadastrada")
        )

        .catch(erro => 

            // Em caso de erro, retorna status 500 (erro interno)
            res.status(500).json(erro)
        );
}

// Listar as tarefas
function listar(req, res) {

    // Pega o ID do usuário pela URL (params)
    var fkUsuario = req.params.fkUsuario;

    // Busca as tarefas no banco
    tarefaModel.listarPorUsuario(fkUsuario)
        .then(function(resultado) {

            // Retorna os dados em formato JSON
            res.json(resultado);
        })
        .catch(function(erro) {

            // Loga erro no servidor
            console.log("Erro ao listar:", erro);

            // Retorna erro para o frontend
            res.status(500).json(erro);
        });
}

// Atualizar status da tarefa
function atualizarStatus(req, res) {

    // Dados enviados pelo frontend
    var idTarefa = req.body.idTarefa;
    var status = req.body.status;

    // Atualiza o status no banco
    tarefaModel.atualizarStatus(idTarefa, status)
        .then(() => res.status(200).send("Status atualizado"))
        .catch(erro => res.status(500).json(erro));
}

// Deletar a tarefa
function deletar(req, res) {

    // ID da tarefa a ser removida
    var idTarefa = req.body.idTarefa;

    // Chama o model para deletar
    tarefaModel.deletar(idTarefa)
        .then(() => res.status(200).send("Tarefa removida"))
        .catch(erro => res.status(500).json(erro));
}

// Atualizar a contagem de tarefas conforme o usuário altera o status
function contarTarefas(req, res) {

    // ID do usuário vindo da URL
    var fkUsuario = req.params.fkUsuario;

     // Busca contagem agrupada por status
    tarefaModel.contarPorStatus(fkUsuario)
        .then(resultado => {

            // Retorna os dados (ex: [{status: "pendente", total: 3}, ...])
            res.json(resultado);
        })
        .catch(erro => {

            // Log detalhado (especialmente útil para erro SQL)
            console.log("ERRO CONTAGEM:", erro.sqlMessage || erro);

            // Retorna erro tratado
            res.status(500).json(erro.sqlMessage || erro);
        });
}

// Dados da semana (gráfico)
function semana(req, res) {

    // ID do usuário vindo da URL
    var fkUsuario = req.params.fkUsuario;

    // Busca tarefas agrupadas por dia da semana
    tarefaModel.tarefasPorSemana(fkUsuario)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("ERRO SEMANA:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

// Dados do mês (gráfico)
function mes(req, res) {

    // ID do usuário vindo da URL
    var fkUsuario = req.params.fkUsuario;

     // Busca tarefas agrupadas por mês
    tarefaModel.tarefasPorMes(fkUsuario)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("ERRO MES:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

// Exporta todas as funções para serem usadas nas rotas
module.exports = {
    cadastrar,
    listar,
    atualizarStatus,
    deletar,
    contarTarefas,
    semana,
    mes
};