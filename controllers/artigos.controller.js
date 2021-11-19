// Regras de negócio do sistema de artigos
const database = require("../models");
const tbArtigos = database.artigos;

//Cria um novo artigo
exports.create = (req, res) =>{
    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado
    };

    // A promisse pode ser revolvida
    // ou ela pode ser rejeitada (ex: ocorreu um erro ao tentar salvar)
    tbArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch((error) => { 
        console.log(error);
        res.status(500).sen("Ocorreu um erro ao salvar o artigo");
        })
};


exports.findAll = (req, res) =>{
    let list = {}

    tbArtigos.findAll().then(function(data){
        res.send(data)
    }).catch((error) => { 
        console.log(error);
        res.status(500).sen("Ocorreu um erro ao salvar o artigo");
        });
}
    