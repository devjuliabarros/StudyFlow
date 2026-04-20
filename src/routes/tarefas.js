// Importa o framework Express
var express = require("express");

// Cria um objeto de rotas
var router = express.Router();

// Importa o controller de tarefas (onde está a lógica)
var tarefaController = require("../controllers/tarefaController");

// Rota para cadastrar uma nova tarefa
// Método: POST (envia dados no body)
router.post("/cadastrar", tarefaController.cadastrar);

// Rota para listar tarefas de um usuário específico
// Método: GET (dados vêm pela URL)
router.get("/listar/:fkUsuario", tarefaController.listar);

// Rota para atualizar o status de uma tarefa
// Método: PUT (atualização)
router.put("/status", tarefaController.atualizarStatus);

// Rota para deletar uma tarefa
// Método: DELETE (deletar)
router.delete("/:idTarefa", tarefaController.deletar);

// Rota para contar tarefas por status (dashboard/cards)
router.get("/contagem/:fkUsuario", tarefaController.contarTarefas);

// Rota para dados do gráfico semanal
// Método: GET (dados vêm pela URL)
router.get("/semana/:fkUsuario", tarefaController.semana);

// Rota para dados do gráfico mensal
// Método: GET (dados vêm pela URL)
router.get("/mes/:fkUsuario", tarefaController.mes);

// Exporta o router para ser usado no app principal
module.exports = router;