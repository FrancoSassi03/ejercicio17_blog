const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");
const Roles = require("./Roles");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);
Roles.initModel(sequelize);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */
User.hasMany(Article);
Article.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

Roles.hasMany(User);
User.belongsTo(Roles);

//ESTABLECER LAS RELACIONES acá, sanear article y author con las relaciones correctas one to many y belongs to
// article has many comments, pero un comment belongs to article

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
  Roles,
};
