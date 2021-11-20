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
    tbArtigos.findAll().then(function(data){
        res.send(data)
    }).catch((error) => { 
        console.log(error);
        res.status(500).send("Ocorreu um erro ao salvar o artigo");
        });
}

exports.findByPk = (req, res) =>{
    tbArtigos.findByPk(req.params.id).then(function (id){
        if(id){
            res.send(id);
        } else{
            res.status(404).send({message: `Não foi possível encontrar artigo com o id= ${id}`});
        }
    }).catch(function(){
        res.status(500).send({
            message: `Erro obtendo artigo id=${id}`
        });
    });
}


exports.findOne = (req, res) =>{
    const tituloArtigo = req.query.titulo
    tbArtigos.findOne({where:{titulo: tituloArtigo }}).then(function (data) {
        if (data) {
         res.send(data);
      } else {
         res.status(404).send({
            message: `Não foi possível encontrar um artigo.`
           });
      }
    }).catch(function () {
            res.status(500).send({
                message: "Erro obtendo artigo"
            });
    });
}

