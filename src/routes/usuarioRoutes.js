/*
const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.json([]);
});
module.exports = router;
*/

const Usuario = require('../models/usuario');

module.exports = function(app)
{
    app.get('/usuarios', (req,res) => {
        Usuario.getUsuarios((err,data) => {
            res.status(200).json(data);
        });
        //res.json([]);
    });
    
    app.post('/usuarios',(req,res) => {
        const usuarioData = {
            usuario_id : null
            ,nombre: req.body.nombre
            ,email: req.body.email
        };
        Usuario.createUsuario(usuarioData, (err, data) => {
            res.json({success:true,msg:'Usuario Insertado',data:data});
        });
        //console.log(req.body);
    });

    app.get('/usuarios/:id',(req,res) => {
        const usuarioData = {
            usuario_id: req.params.id
        };
        Usuario.readUsuario(usuarioData, (err, data) => {
            res.status(200).json(data);
        });
        //console.log(req.body);
    });    

    app.put('/usuarios/:id',(req,res) => {
        const usuarioData = {
            usuario_id: req.params.id
            ,nombre: req.body.nombre
            ,email: req.body.email
        };
        Usuario.updateUsuario(usuarioData, (err, data) => {
            res.json({success:true,msg:'Usuario Actualizado',data:data});
        });
        //console.log(req.body);
    });

    
    app.delete('/usuarios/:id',(req,res) => {
        const usuarioData = {
            usuario_id: req.params.id
        };
        Usuario.deleteUsuario(usuarioData, (err, data) => {
            res.json({success:true,msg:'Usuario Eliminado',data:data});
        });
    });    
}