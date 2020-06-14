const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const sharp = require('sharp');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const port = 4000; 


mongoose.connect('mongodb+srv://admi:admi@gamish-ssidz.mongodb.net/gamish?retryWrites=true&w=majority')
var Schema = mongoose.Schema; 

//? Esta madre hace que funcione el ejs
app.set('view engine', 'ejs');

//? Ruta raíz (Lanzara el login)
app.get('/',(req, res)=>{ 
    res.render('index')
})

//* Schema de juegos
var juegoSchema = new Schema ({
    nombre: String, 
    costo: Number, 
    compañia: String, 
    plataformas: String, 
    categoria: String, 
    descripcion: String
});

//* Schema de usuario
var userSchema = new Schema ({
   
   Nombre: String,
   correo: String,
   contraseña: String,
   telefono: Number,
   genero: String,
   domicilio: {
       estado: String,
       municipio: String,
       cp: Number,
       colonia: String,
       calle: String,
       numero: Number
   },
   tarjeta: {
        titular: String,
        numeroTarjeta: Number,
        vencimientoMes: Number,
        vencimientoAno: Number,
        cvv: Number
   }

});




//? Inicio de sesion --> Inicio
app.post('/logIn', urlencodedParser, (req, res) => {
    var user = mongoose.model('user', userSchema)

    user.find({
        correo: req.body.correo,
        contraseña: req.body.contraseña
    },(err, user) => {
        if(err){
            res.send('No se encontro usuario con este correo')
        }else{
            res.redirect('/juegos'/*, {user}*/)
        }

    });

});

//? Inicio de sesion --> Fin

//* Registro usuario --> inicio

app.get('/registroUsuario', (req, res) => {
    res.render('registroUsuario')
});

//? Agregar usuario --> inicia
app.post('/registrarUsuario', urlencodedParser, (req,res) => {
    

    var user = mongoose.model('user', userSchema);
    


    user({

        Nombre: req.body.nombre,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        telefono: req.body.telefono,
        genero: req.body.genero,
        domicilio: {
            estado: req.body.estado,
            municipio: req.body.municipio,
            cp: req.body.cp,
            colonia: req.body.colonia,
            calle: req.body.calle,
            numero: req.body.numCasa
        },
        tarjeta: {
            titular: req.body.titular,
            numeroTarjeta: req.body.numTarjeta,
            vencimientoMes: req.body.venciMes,
            vencimientoAno: req.body.venciAno,
            cvv: req.body.cvv
        }
    
    }).save((err)=>{ 
        if(err){
            console.log('Hay un error');
        }else{ 
            res.redirect('juegos'); //Aqui habra un render al home
        }
    })
    
})

//* Registro usuario --> Fin



//? Insertar juegos --> Inicio
app.get('/insertarJuegos', urlencodedParser,(req, res) => { 
    res.render('insertarJuego')
})

app.post('/insertar',urlencodedParser ,(req, res)=> { 
    var juego = mongoose.model('juegos', juegoSchema); 
    
    console.log(req.body)

    var myJuego = juego({ 
        nombre: req.body.nombre, 
        costo: req.body.costo, 
        compañia: req.body.compañia, 
        plataformas: req.body.plataformas,
        categoria: req.body.categoria, 
        descripcion: req.body.descripcion
    })

    myJuego.save((err)=>{ 
        if(err){
            console.log('Hay un error');
        }else{ 
            res.send('Guardo correctamente');
        }
    })
})

//? Insertar juegos --> Inicio

//TODO Ruta de juegos (Lanzara los juegos)
app.get('/juegos', (req, res) => { 
    var juego = mongoose.model('juegos', juegoSchema)
    
    juego.find({}, function(err, juegos){
        res.render('juegos', {juegos})
        //console.log(juego.find({}));  
    })

})

app.listen(port, () => { 
    console.log('Corriendo en el puerto : ' + port)
})