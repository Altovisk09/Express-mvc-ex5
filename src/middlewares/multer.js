const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let caminho = path.resolve(__dirname, '..', 'public', 'images');
    cb(null, caminho);
  },
  filename: (req, file, cb) => {
    let imageName = "imageprofile" + Date.now() + path.extname(file.originalname);
    
    cb(null, imageName);
  }

});

const upload = multer({storage: storage})

module.exports = upload ;