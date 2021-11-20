// Regras de negócio do sistema de artigos
const database = require("../models");
const tbArtigos = database.artigos;

//Cria um novo artigo
exports.create = (req, res) =>{
    const {titulo, descricao, publicado} = req.body;
    
    const artigo = { titulo, descricao, publicado };


    if(!artigo.titulo){
        return res
        res.status(400).send("O artigo precisa conter ao menos o título definido")
    }

    // A promisse pode ser revolvida
    // ou ela pode ser rejeitada (ex: ocorreu um erro ao tentar salvar)
    tbArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch((error) => { 
        res
        console.log(error);
        res.status(500).send("Ocorreu um erro ao salvar o artigo");
        })
};


exports.findAll = (req, res) =>{
    tbArtigos.findAll().then(function(data){
        res.send(data)
    }).catch((error) => { 
        res
        console.log(error);
        res.status(500).send("Ocorreu um erro ao salvar o artigo");
        });
}

exports.findByPk = (req, res) =>{
    const {id:idArtigo} = req.params;

    if(!idArtigo){
        res.status(400).send("Não foi possível buscar artigo pois ID não foi enviado")
    }

    tbArtigos.findByPk(idArtigo).then(function (id){
        if(id){
            res.send(id);
        } else{
            res.status(404).send({message: `Não foi possível encontrar artigo com o id= ${idArtigo}`});
        }
    }).catch(function(){
        res.status(500).send({
            message: `Erro obtendo artigo id=${idArtigo}`
        });
    });
}


exports.findOne = (req, res) =>{
    const {titulo:tituloArtigo} = req.query;

    if(!tituloArtigo){
        res.status(400).send("Não foi possível buscar um artigo pois o titulo não foi enviado")
    }

    tbArtigos.findOne({where:{titulo: tituloArtigo }}).then(function (data) {
        if (data) {
         res.send(data);
      } else {
         res.status(404).send({
            message: `Não foi possível encontrar um artigo ${tituloArtigo}.`
           });
      }
    }).catch(function () {
            res.status(500).send({
                message: "Erro obtendo artigo"
            });
    });
}

