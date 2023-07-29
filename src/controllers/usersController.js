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
        req.session.user = userValidad;
      }
      if(req.body.remember_user){
        let userValid = req.session.user;
        res.cookie('logMail',userValid.email, { maxAge: 1000 * 60 * 60 });
        
      } 
      res.redirect('/')
  },

    profile:(req,res)=>{
        res.render('userProfile')
    },

    logout:(req, res)=>{
      req.session.destroy();
      res.clearCookie('logMail');
      res.redirect('/')
    },
    delete: function (req, res) {
      const id = req.params.id;
      Users.deleteAccount(id);
      usersController.logout(req, res);
    },
};

module.exports=usersController