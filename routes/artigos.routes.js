// Rotas do sistemas de artigos

/*
    GET
    -Obter todos os artigos
    -Obeter um artigo especifico
    -Obter todos os artigos publicados


    POS
    -Criar um novo artigo

    PUT
    -Publicar meu artigo

    DELETE
    -Deletar um artigo
*/

module.exports = (app) =>{
    const artigosController = require("../controllers/artigos.controller");
    let router = require('express').Router();

    router.post("/", artigosController.create);

    app.use("/artigos", router);
}

