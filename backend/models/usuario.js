'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Método para comparar contraseñas
    validarContrasena(contrasena) {
      return bcrypt.compareSync(contrasena, this.contrasena);
    }

  }

  Usuario.init({
    nombre: DataTypes.STRING,
    correo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Hashear la contraseña antes de guardarla
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('contrasena', hash);
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};
