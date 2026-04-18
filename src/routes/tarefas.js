var express = require("express");
var router = express.Router();

var tarefaController = require("../controllers/tarefaController");

router.post("/cadastrar", function (req, res) {
    tarefaController.cadastrar(req, res)
})

router.post("/listar", function (req, res) {
    tarefaController.listar(req, res)
})

module.exports = router;

