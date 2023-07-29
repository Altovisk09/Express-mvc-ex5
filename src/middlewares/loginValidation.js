const { body } = require('express-validator');
const Users = require('../models/Users');


const validation = [
    body('email').notEmpty().withMessage('Insira seu email').bail().
    isEmail().withMessage('Insira um email em um formato valido').bail()
    .custom((value, {req})=>{
        let user = Users.findUserByField('email', value);
        if(!user){
            throw new Error('Email e(ou) senha discrepantes')
        }
        return true;
    }),
    body('password')
    .notEmpty().withMessage('Insira sua senha').bail()
    .custom((value, { req }) => {
      const user = req.body.email ? Users.findUserByField('email', req.body.email) : null;
      console.log(user)
      if (!user) {
        throw new Error('Erro interno de validação');
      }else if (value !== user.password) {
        throw new Error('Senha incorreta');
      }
      return true;
    }),
];


module.exports=validation