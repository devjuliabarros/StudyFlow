var database = require("../database/config");

function listar() {
    var instrucao = `
        SELECT * FROM tarefa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome) {
    var instrucao = `
        INSERT INTO tarefa (nome, disciplina, data, status, fkUsuario) VALUES ('${nome}', '${disciplina}', '${data}', 'pendente', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar
};

