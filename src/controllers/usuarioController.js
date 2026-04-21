// Importa os models (acesso ao banco)
var usuarioModel = require("../models/usuarioModel");
// var tarefaModel = require("../models/tarefaModel");

// Autenticar o login do usuario
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validação dos valores inseridos pelo usuário
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {

                if (resultadoAutenticar.length == 1) {

                    res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });

                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
// Cadastrar o usuario
function cadastrar(req, res) {
    // Variável que recupera os valores inseridos pelo usuário no cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(nome, email, senha)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
    }
}

// Atualizar os dados do usuario
function atualizar(req, res) {

    // Pega os dados enviados no body
    const { idUsuario, nome, email, senha } = req.body;

    // Valida se o ID veio (sem ele não dá pra atualizar)
    if (!idUsuario) {
        return res.status(400).send("ID do usuário é obrigatório");
    }

    // Chama a model passando os dados
    usuarioModel.atualizar(idUsuario, nome, email, senha)
        .then(() => {
            // Se deu certo
            res.status(200).send("Atualizado com sucesso");
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
}

// Exporta as funções
module.exports = {
    autenticar,
    cadastrar,
    atualizar
};