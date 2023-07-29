const { validationResult } = require('express-validator');
const Users = require('../models/Users');

const usersController = {
    register:(req,res)=>{
        res.render('usersRegisterForm')
    },

    registerProcess: (req, res)=>{
      let resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
          console.log(resultValidation.mapped())
        return res.render('usersRegisterForm', {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
        Users.create(req, req.body)
        res.redirect('/users/login')
      },

    login:(req,res)=>{
        res.render('usersLoginForm')
    },
    
    loginProcess:(req,res)=>{
      let resultValidation = validationResult(req);
      if(resultValidation.errors.length > 0){
        console.log(resultValidation.mapped())
        return res.render('usersLoginForm',{
          errors: resultValidation.mapped(),
          oldData: req.body
        })
      }
     let userValidad = Users.findUserByField('email', req.body.email)
      if(userValidad){
        delete userValidad.password;
        req.session.user = userValidad
      }
      console.log(req.session.user)
      res.redirect('/')
  },

    profile:(req,res)=>{
        res.render('userProfile')
    },
};

module.exports=usersController