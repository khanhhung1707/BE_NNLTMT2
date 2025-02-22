import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class posts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'authors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "authorId",
        using: "BTREE",
        fields: [
          { name: "authorId" },
        ]
      },
    ]
  });
  }
}
