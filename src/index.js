const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//const passport = require('passport');

const {database} = require('./keys');
const { use } = require('passport');

//initializations
const app = express();
//require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));

app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'sessionmysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(passport.initialize());
//app.use(passport.session());

//global variables
app.use((req, res, next) => {
    app.locals.realizado = req.flash('realizado');
    app.locals.incorrecto = req.flash('incorrecto');
    //app.locals.usuario = req.prueba;
    next();
});

//routes
app.use(require('./routes/index'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//starting de server
app.listen(app.get('port'), ()=> {
    console.log('server en puerto 4000');
});

/*const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const exphbs = require('express-handlebars');
const MySQLStore = require('express-mysql-session');
const path = require('path');

const { mysqlConnection } = require('./database');

//inicilización
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.use(require('./routes/index'));

// iniciando el servidor
app.listen(3000, () =>{
    console.log(`Servidor en puerto ${"port"}`);
});*/