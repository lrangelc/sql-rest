/*
const mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost"
    ,user:"root"
    ,password:"XXX"
    ,database:"platzi"
});

let usuarioModel = {};

usuarioModel.getUsuarios = (callback) => {
    if (connection)
    {
        var sql_query = "SELECT * FROM usuario ORDER BY usuario_id";
        connection.query(sql_query,(err,rows) => {
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,rows);
            }
        })
    }
}
*/


const config = {
    user: 'sa'
    ,password: 'adminval'
    ,server: 'localhost' // You can use 'localhost\\instance' to connect to named instance
    ,database: 'POS'
    ,options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

const sql = require('mssql');
var connection = false;

sql.connect(config, err => {
    // ... error checks
    if (err)
    {
        throw err;
    }
    else
    {
        connection = true;
    } 
})
 
sql.on('error', err => {
    // ... error handler
})

let usuarioModel = {};

usuarioModel.getUsuarios = (callback) => {
    if (connection)
    {
        var sql_query = `SELECT * 
            FROM usuario 
            ORDER BY usuario_id;`;
        new sql.Request().query(sql_query, (err, result) => {
            // ... error checks
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,result.recordset);
                //callback(null,result);
            }
            //console.dir(result)
        })    
    }
}

usuarioModel.createUsuario = (usuarioData, callback) => {
    if (connection)
    {
        var sql_query = `DECLARE @Usuario INT;
            SET @Usuario = NEXT VALUE FOR dbo.seq_Usuario;
            INSERT INTO usuario(usuario_id,nombre,email)
            VALUES(@Usuario,'${usuarioData.nombre}','${usuarioData.email}');`;
        new sql.Request().query(sql_query, (err, result) => {
            // ... error checks
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,result);
            }
            //console.dir(result)
        })    
    }
}

usuarioModel.readUsuario = (usuarioData, callback) => {
    if (connection)
    {
        var sql_query = `SELECT * 
            FROM usuario 
            WHERE usuario_id = ${usuarioData.usuario_id};`;
        new sql.Request().query(sql_query, (err, result) => {
            // ... error checks
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,result.recordset);
            }
            //console.dir(result)
        })    
    }
}

usuarioModel.updateUsuario = (usuarioData, callback) => {
    if (connection)
    {
        var sql_query = `UPDATE usuario
            SET nombre = '${usuarioData.nombre}'
                ,email = '${usuarioData.email}'
            WHERE usuario_id = ${usuarioData.usuario_id};`;
        //console.log(sql_query);
        new sql.Request().query(sql_query, (err, result) => {
            // ... error checks
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,result);
            }
            //console.dir(result)
        })    
    }
}

usuarioModel.deleteUsuario = (usuarioData, callback) => {
    if (connection)
    {
        var sql_query = `DELETE FROM usuario
            WHERE usuario_id = ${usuarioData.usuario_id};`;
        //console.log(sql_query);
        new sql.Request().query(sql_query, (err, result) => {
            // ... error checks
            if (err)
            {
                throw err;
            }
            else
            {
                callback(null,result);
            }
            //console.dir(result)
        })    
    }
}

module.exports = usuarioModel;