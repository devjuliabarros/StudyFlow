var tarefaModel = require("../models/tarefaModel");

function listar(req, res) {
    tarefaModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var disciplina = req.body.disciplina;
    var data = req.body.data;
    var fkUsuario = req.body.fkUsuario;

    // console.log(nome, disciplina, data, fkUsuario);
    console.log("BODY:", req.body);

    tarefaModel.cadastrar(nome, disciplina, data, fkUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    listar,
    cadastrar
}