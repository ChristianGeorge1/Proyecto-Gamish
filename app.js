const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const port = 4000; 


mongoose.connect('mongodb+srv://admi:admi@gamish-ssidz.mongodb.net/<dbname>?retryWrites=true&w=majority')
var Schema = mongoose.Schema; 

//*Schema de juegos
var juegoSchema = new Schema ({
    nombre: String, 
    costo: Number, 
    compañia: String, 
    plataformas: String, 
    categoria: String, 
    descripcion: String
})




//? Esta madre hace que funcione el ejs
app.set('view engine', 'ejs');

//?Ruta raíz (Lanzara el login)
app.get('/',(req, res)=>{ 
    res.render('index')
})

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
            res.redirect('/juegos')
        }
    })
})

//?Ruta de juegos (Lanzara los juegos)
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