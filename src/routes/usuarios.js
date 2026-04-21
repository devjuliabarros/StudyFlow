// Importa o framework Express
var express = require("express");

// Cria um objeto de rotas
var router = express.Router();

// Importa o controller de usuário
var usuarioController = require("../controllers/usuarioController");

// Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

// Rota responsável por autenticar (login) do usuário
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// Rota para atualizar dados do usuário
router.put("/atualizar", function (req, res) {
    usuarioController.atualizar(req, res);
});

// Exporta o router
module.exports = router;