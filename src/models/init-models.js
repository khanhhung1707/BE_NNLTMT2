import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _authors from  "./authors.js";
import _posts from  "./posts.js";

export default function initModels(sequelize) {
  const authors = _authors.init(sequelize, DataTypes);
  const posts = _posts.init(sequelize, DataTypes);

  posts.belongsTo(authors, { as: "author", foreignKey: "authorId"});
  authors.hasMany(posts, { as: "posts", foreignKey: "authorId"});

  return {
    authors,
    posts,
  };
}
