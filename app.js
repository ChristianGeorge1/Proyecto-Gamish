const express = require('express'); 
const app = express(); 

const port = 4000; 


app.get('/',(req, res)=>{ 
    res.send('Todo correcto y yo que me alegro')
})

app.listen(port, () => { 
    console.log('Corriendo en el puerto : ' + port)
})