const express = require('express');
const cors = require('cors')
const app = express();
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const port = 8080;

// app.use(express.json())
// app.use(cors())


// route our app
app.get('/',async function(req, res) {
  res.send('hello world!') ;
});
app.get('/type/:name',async function(req, res) {
  res.send(await (P.getTypeByName(req.params.name)))
});

  
const userRouter = require('./src/routers/userRouter')
const pokemonRouter = require('./src/routers/pokemonRouter')
app.use('/pokemon', pokemonRouter)
app.use('/user', userRouter)
// start the server
app.listen(port, function() {
  console.log(`app started listening on port ${port} visit us! http://localhost:8080`);
});

