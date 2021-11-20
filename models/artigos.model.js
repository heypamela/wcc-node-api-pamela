// Model da tabela de artigos

module.exports = (sequelizeDataBase, Sequelize) => {
    const Artigo = sequelizeDataBase.define("artigos", {
        titulo: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.STRING,
            defaultValue: "Em desenvolvimento..."
        },
        publicado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Artigo;
}