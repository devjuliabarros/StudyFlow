var database = require("../database/config")

// Função que autentica o login do usuario
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Funcção que cadastra o usuario
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função que atualiza os dados
function atualizar(idUsuario, nome, email, senha) {

    // Array que guarda os campos que serão atualizados
    let campos = [];

    // Só adiciona no UPDATE se o valor existir
    if (nome) campos.push(`nome = '${nome}'`);
    if (email) campos.push(`email = '${email}'`);
    if (senha) campos.push(`senha = '${senha}'`);

    // Se não tiver nada pra atualizar
    if (campos.length === 0) {
        return Promise.reject("Nenhum campo para atualizar");
    }

    // Monta o SQL final
    const instrucao = `
        UPDATE usuario 
        SET ${campos.join(", ")}
        WHERE idUsuario = ${idUsuario};
    `;

    // Executa no banco
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar
};