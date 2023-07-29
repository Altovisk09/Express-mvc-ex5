// CRUD
const { json } = require('express');
const fs = require('fs')
// 1- Salvar o usuario na base de dados 
// 2- Buscar o usuario na base de dados a partir do seu email durante o processo de login
// 4- Descobriremos 

const Users = {
    filename: './src/database/users.json',
    
    create: function(req, userData){
        let allUsers = this.getData();
        let newUser = {
            id: this.generateId(),
            ...userData,
            avatar: req.file.filename
        };
        
        delete newUser.re_password;
        allUsers.push(newUser)
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, " "));
        return newUser
    },

    generateId: function(){
        let allUsers = this.getData();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1
        }else{
            return 1 
        }
    },
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, "utf-8"))
    },
    findUserById: function(id) {
        let allUsers = this.getData();
        let userFound = allUsers.find(user => user.id === id);
        return userFound;
},
    findUserByField: function(field, value){
        let allUsers = this.getData();
        let userFound = allUsers.find(user => user[field] === value)
        return userFound
    },
}

module.exports = Users;