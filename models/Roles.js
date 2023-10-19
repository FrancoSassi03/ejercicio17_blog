const { Model, DataTypes } = require("sequelize");

class Roles extends Model {
  static initModel(sequelize) {
    Roles.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        rol: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
      },
      {
        sequelize,
        modelName: "roles",
      },
    );
    return Roles;
  }
}

module.exports = Roles;
