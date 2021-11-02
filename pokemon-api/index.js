const express = require('express');
const userRouter = require('./src/routers/userRouter')
const pokemonRouter = require('./src/routers/pokemonRouter')
const cors = require('cors')
const path = require('path')
const app = express();
require('dotenv').config()
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const {handleUserName} = require('./src/middleware/userHandler')
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())


app.use('/', express.static(path.resolve('./dist')));
app.get('/', function(req, res) { 
  res.sendFile(path.resolve('./dist/index.html'))
});


app.get('/type/:name',async function(req, res) {
  res.send(await (P.getTypeByName(req.params.name)))
});

app.use('/pokemon',  handleUserName,pokemonRouter)
app.use('/users', userRouter)//register request

// start the server
app.listen(port, function() {
  console.log(`app started listening on port ${port} visit us! http://localhost:8080`);
});

//