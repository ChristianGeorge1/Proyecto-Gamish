const express = require('express'); 
const app = express(); 

const port = 4000; 

//? Esta madre hace que funcione el ejs
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{ 
    res.render('index')
})

app.listen(port, () => { 
    console.log('Corriendo en el puerto : ' + port)
})