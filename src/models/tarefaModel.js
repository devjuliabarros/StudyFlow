// Importa a configuração do banco de dados
var database = require("../database/config");

// Cadastra uma nova tarefa
function cadastrar(nome, disciplina, data, status, fkUsuario) {
    
    // Monta a instrução SQL para inserir uma nova tarefa
    var instrucaoSql = `
        INSERT INTO tarefa (nome, disciplina, data, status, fkUsuario)
        VALUES ('${nome}', '${disciplina}', '${data}', '${status}', ${fkUsuario});
    `;

    // Executa a query no banco
    return database.executar(instrucaoSql);
}

// Lista as tarefas por usuário
function listarPorUsuario(fkUsuario) {

    // Seleciona todas as tarefas do usuário
    // - Apenas ativas
    // - Que ainda não foram concluídas
    // - Ordenadas por data
    var instrucaoSql = `
        SELECT * FROM tarefa
        WHERE fkUsuario = ${fkUsuario}
        AND ativo = 'sim'
        AND status <> 'concluido'
        ORDER BY data;
    `;

    // Executa a query no banco
    return database.executar(instrucaoSql);
}

// Atualiza o status da tarefa
function atualizarStatus(idTarefa, status) {

    // Atualiza o status da tarefa com base no ID
    var instrucaoSql = `
        UPDATE tarefa SET status = '${status}'
        WHERE idTarefa = ${idTarefa};
    `;

    // Executa a query no banco
    return database.executar(instrucaoSql);
}

// Deleta a tarefa
function deletar(idTarefa) {

    // Remove a tarefa do banco
    var sql = `
        DELETE FROM tarefa
        WHERE idTarefa = ${idTarefa};
    `;

    // Executa a query no banco
    return database.executar(sql);
}

// Faz a contagem de tarefas conforme o seu status "Pendente", "Em andamento" e "Concluido"
function contarPorStatus(fkUsuario) {

    // Agrupa as tarefas por status e conta quantas existem em cada
    var sql = `
        SELECT status, COUNT(*) AS total
        FROM tarefa
        WHERE fkUsuario = ${fkUsuario}
        GROUP BY status;
    `;

    // Executa a query no banco
    return database.executar(sql);
}

// Seleciona as tarefas no banco de dados conforme o dia da semana
function tarefasPorSemana(fkUsuario) {

    // Agrupa tarefas concluídas por dia da semana
    // DAYOFWEEK retorna números de 1 (Domingo) a 7 (Sábado)
    // O CASE converte para nomes (Dom, Seg, etc.)
    var sql = `
        SELECT 
            CASE 
                WHEN DAYOFWEEK(data) = 1 THEN 'Dom'
                WHEN DAYOFWEEK(data) = 2 THEN 'Seg'
                WHEN DAYOFWEEK(data) = 3 THEN 'Ter'
                WHEN DAYOFWEEK(data) = 4 THEN 'Qua'
                WHEN DAYOFWEEK(data) = 5 THEN 'Qui'
                WHEN DAYOFWEEK(data) = 6 THEN 'Sex'
                WHEN DAYOFWEEK(data) = 7 THEN 'Sáb'
            END AS diaSemana,
            COUNT(*) AS total
        FROM tarefa
        WHERE fkUsuario = ${fkUsuario}
        AND status = 'concluido'
        AND data IS NOT NULL
        GROUP BY DAYOFWEEK(data), diaSemana
        ORDER BY DAYOFWEEK(data);
    `;

    // Executa a query no banco
    return database.executar(sql);
}

// Seleciona as tarefas no banco de dados conforme o mês
function tarefasPorMes(fkUsuario) {

    // Agrupa tarefas concluídas por mês
    // MONTH(data) retorna o número do mês (1 a 12)
    // CASE converte para nome do mês
    var sql = `
        SELECT 
            CASE 
                WHEN MONTH(data) = 1 THEN 'Janeiro'
                WHEN MONTH(data) = 2 THEN 'Fevereiro'
                WHEN MONTH(data) = 3 THEN 'Março'
                WHEN MONTH(data) = 4 THEN 'Abril'
                WHEN MONTH(data) = 5 THEN 'Maio'
                WHEN MONTH(data) = 6 THEN 'Junho'
                WHEN MONTH(data) = 7 THEN 'Julho'
                WHEN MONTH(data) = 8 THEN 'Agosto'
                WHEN MONTH(data) = 9 THEN 'Setembro'
                WHEN MONTH(data) = 10 THEN 'Outubro'
                WHEN MONTH(data) = 11 THEN 'Novembro'
                WHEN MONTH(data) = 12 THEN 'Dezembro'
            END AS mes,
            COUNT(*) AS total
        FROM tarefa
        WHERE fkUsuario = ${fkUsuario}
        AND status = 'concluido'
        GROUP BY MONTH(data), mes
        ORDER BY MONTH(data);
    `;

    // Executa a query no banco
    return database.executar(sql);
}

// Exporta todas as funções para uso no controller
module.exports = {
    cadastrar,
    listarPorUsuario,
    atualizarStatus,
    deletar,
    contarPorStatus,
    tarefasPorSemana,
    tarefasPorMes
};