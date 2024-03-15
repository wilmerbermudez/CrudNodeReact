const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");


app.use(cors());
app.use(express.json());

const TOKEN_KEY = "x4TvmErxRETbvcqaL15dqMI115eNlp5y";

const verifyToken = (req, res, next) =>{
    const authHeader = (req.rawHeaders[1]);
    const token = authHeader;
    if(token == '')
        return res.status(401).send({error: "Token requerido"});
    jwt.verify(token, TOKEN_KEY, (err, user) =>{
        if(err) return res.status(403).send({ error: "Token Invalido" });
        req.user = user;
        next()
    });
}

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES  (?,?,?,?,?)', [nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.get("/empleados", (req, res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.put("/update", (req, res)=>{
    const id = req.body.id
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});


app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id

    db.query('DELETE FROM  empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});


app.post("/usuario/login", (req,res)=>{
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    if(usuario == 'wfbermudez' && clave =='12345'){
        const datos = {
            id: "123",
            nombre: "wilmer bermudez",
            email: "wilmerbermudez7@gmail.com",
            codigo: "ABDE456-LK"
        };
        const token = jwt.sign(
            {userId:datos.id, email:datos.email},
            TOKEN_KEY,
            {expiresIn:'20m'}
        );
        let nDatos = {...datos, token}
        res.status(200).json(nDatos)
    } else{
        res.status(400).send("Credenciales Incorrectas");
    }
});

/* app.get("/usuario/:id",verifyToken, (req,res)=>{
    const datos = [
        {id:1,cliente:"empresa a",total:2500, fecha:"2024-01-15"},
        {id:2,cliente:"empresa b",total:2500, fecha:"2024-01-15"},
        {id:3,cliente:"empresa c",total:2500, fecha:"2024-01-15"},
    ];
    res.json(datos);
}); */

app.listen(3001, ()=>{
    console.log("corriendo en el puerto 3001")
})