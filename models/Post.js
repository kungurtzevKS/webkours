const Sequelize = require("sequelize");
const sequelize = require("../ORM");

const PostModel = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    img: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: '/views/assets/avatar.png'
    }
};

const Post = sequelize.define("post", PostModel);
sequelize.sync();

module.exports = Post;