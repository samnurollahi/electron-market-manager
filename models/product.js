const { DataTypes } = require("sequelize");
const db = require("../config/db");

module.exports = db.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [0, 250], msg: "تعداد کاراکتر های نام محصول زیاد است" },
        notEmpty: { msg: "نام محصول نباید خالی باشد" },
      },
    },
    price: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    count: {
      type: DataTypes.STRING,
    },
    exp: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "product",
  }
);
