const mongoose = require('mongoose');

const User = require('./user');
const Category = require('./category');
const Post = require('./post');
const Comment = require('./comment');
const Reply = require('./reply');

const connectDb = () => {
    return mongoose.connect("mongodb+srv://neutron:neutron45@demo-blsjw.mongodb.net/test?retryWrites=true&w=majority");
}

const models = { User, Category, Post, Comment, Reply}

module.exports = { connectDb, models };
