const { validationResult } = require('express-validator');

const usersController = {
    register:(req,res)=>{
        res.render('usersRegisterForm')
    },

    registerProcess: (req, res)=>{
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          return res.render('usersRegisterForm', {
            errors: resultValidation.mapped(),
            oldData: req.body
          });
        }
        // Lógica para processar o registro quando a validação for bem-sucedida
        // ...
    
        res.send('Deu bom');
      },

    login:(req,res)=>{
        res.render('usersLoginForm')
    },

    profile:(req,res)=>{
        res.render('userProfile')
    },
};

module.exports=usersController