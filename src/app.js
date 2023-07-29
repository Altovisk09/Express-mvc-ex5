const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const path = require('path');
const sessionLog = require('./middlewares/sessionLog')

const app = express();
  
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '../public')));  // Necessário para arquivos estáticos na pasta /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(sessionLog)

app.set('view engine', 'ejs');
app.set('views', './src/views'); // Configuração da localização da pasta "views"


const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
app.use('/', mainRoutes);
app.use('/users', usersRoutes);


app.use((req, res, next) => next(createError(404)));


app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
