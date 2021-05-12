const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create database schema
const crudSchema = new Schema({
    name: String,
    email: String,
    country: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Crud', crudSchema);