const { body } = require('express-validator');
const path = require('path');

const validation = [
  body('full_name').notEmpty().withMessage('É necessário inserir o seu nome'),
  body('email').notEmpty().withMessage('É necessário inserir o seu email').bail().isEmail(),
  body('password').notEmpty().withMessage('É necessário inserir a sua senha').bail()
  .isLength({ min: 6 }).withMessage('A senha precisa conter pelo menos 6 caracteres'),
  body('re_password').notEmpty().withMessage('É necessário confirmar sua senha').bail().custom((value, {req})=>{
    if (value !== req.body.password) {
      throw new Error('As senhas não coincidem');
    }
    return true;
  }),
  body('country').notEmpty().withMessage('É necessário selecionar o seu país'),
  body('avatar').custom((value, {req}) => {
    if (!req.file) {
      throw new Error('Selecione uma imagem para seu perfil');
    }
    let AcceptExt = [".jpg", ".gif", ".png", ".jpeg"]; 
    let fileExt = path.extname(req.file.originalname);
    if (!AcceptExt.includes(fileExt)){
      throw new Error('O arquivo selecionado não é válido.');
    }
    return true;
  }),
];

module.exports = validation;
