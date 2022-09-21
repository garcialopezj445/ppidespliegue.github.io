const { Router } = require('express');
const router = Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    res.render('home/index');
});

router.post('/loginUser', async (req, res) => {
    const {
        nombreUsuario, 
        contrasena
    } = req.body;

    const usuario = await pool.query('SELECT * FROM bacr8q01tviggghwbvj9.usuario WHERE nombreusuario = ? and contrasena = ?', [nombreUsuario, contrasena]);

    if(usuario.length > 0){
        res.json({message: "usuario autenticado"});
    }else{
        res.redirect('/');
    }
});

router.get('/signup', (req, res) => {
    res.render('home/signup')
})

router.post('/createUser', async (req, res) => {
    const {
        nombreUsuario, 
        contrasena
    } = req.body;

    const newUser = {
        nombreUsuario, 
        contrasena
    }

    await pool.query('INSERT INTO bacr8q01tviggghwbvj9.usuario SET ?', [newUser], (err, rows, fields) => {
        if(!err) {
            res.redirect('/');
        } else {
            console.log(err);
        }
    });
});

module.exports = router;