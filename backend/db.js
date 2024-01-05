const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://admin:admin@cluster0.kqfvub7.mongodb.net/todos');

const todoSchema =  new Schema({
    title: String,
    description: String,
    isCompleted: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}