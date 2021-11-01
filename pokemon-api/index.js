const express = require('express');
const userRouter = require('./src/routers/userRouter')
const pokemonRouter = require('./src/routers/pokemonRouter')
const cors = require('cors')
const app = express();
require('dotenv').config()
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const {handleUserName} = require('C:/dev/cyber4s/Pokedex-back/pokemon-api/src/middleware/userHandler.js')
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())

app.get('/type/:name',async function(req, res) {
  res.send(await (P.getTypeByName(req.params.name)))
});

app.use('/pokemon',  handleUserName,pokemonRouter)
app.use('/users', userRouter)//register request

// start the server
app.listen(port, function() {
  console.log(`app started listening on port ${port} visit us! http://localhost:8080`);
});

