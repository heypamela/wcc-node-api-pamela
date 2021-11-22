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

exports.findAllAtivos = (req, res) =>{
    tbArtigos.findAll({where:{publicado:true}}).then(data =>{
        res.send(data);
    }). catch(err=>{
        res.status(500).send({ message: "Ocorreu um erro ao encontrar os artigos ativos"})
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

exports.updateArtigo = (req, res) =>{
    const {id:idArtigo} = req.params;
    const updates = req.body;
    const query = { where: {id: idArtigo}, returning: true}

    tbArtigos.update(updates, query).then(function(data){
        const linhasAtualizadas = data[0];
        if(linhasAtualizadas===0){
            res.status(404).send({ message: `Não foi encontrado nenhum registro para ser atualizado a partir do id ${idArtigo}`});
            
        } else{
            const artigoAtualizados = data[1];
            res.send(artigoAtualizados);
        }
    }).catch(function(){
        res.status(500).send({ message: "Erro obtendo atualização do artigo"});
    });
}

exports.deleteAll = (req, res) =>{
    tbArtigos.destroy({where: {}, trucate:false}).then(function(itemsDeletados){
        res.send("Foram deletados "+ itemsDeletados + " artigos")
    }).catch(function(error){
        res.status(500).send("Ocorreu um erro ao deletar os artigos");
    });
}

exports.delete = (req, res) =>{
    const {id:idDeletado} = req.params;
    tbArtigos.destroy({where: {id: idDeletado}}).then(function(itemDeletado){
        res.send("Foi deletado "+ itemDeletado + " artigo")
    }).catch(function(error){
        res.status(500).send("Ocorreu um erro ao deletar artigo");
    });
}