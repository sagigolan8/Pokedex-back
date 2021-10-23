const router = require('express').Router()
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const fs = require('fs')
const path = require('path');
const usersPath = `C:/dev/cyber4s/Pokedex-back/pokemon-api/users`

router.get('/',(req,res)=>{ //send in te header the username
        const userName = req.headers.username;
        const pokemonsArray = fs.readdirSync(`${usersPath}/${userName}`)
        res.send(pokemonsArray);

})

router.get('/get/:id', async(req,res)=>{
    try {
        
        res.send((await getPokemon(req.params.id)));
    } catch  {
        res.status(404).send('')
    }
})
router.get('/query', async(req,res)=>{
    try {
        
        res.send((await getPokemon(req.query.name)));
    } catch  {
        res.status(404).send('')
    }
})


router.put("/catch/:id", async (req, res)=> {//send with username in headers
    try {
        const id = req.params.id;
        const userName = req.headers.username;
        const pokemonObj = JSON.stringify(await getPokemon(id))
            if(fs.existsSync(`${usersPath}/${userName}/${id}.json`))
            res.status(403).send("Pokemon already caught")
        else{
            fs.writeFileSync(`${usersPath}/${userName}/${id}.json`,pokemonObj)
        }
    } catch (error) {
        res.status(404).send("An error occurred, check if this pokemon exist....")
    }

})





router.delete("/release/:id", (req, res)=> {//send with username in headers
    const id = req.params.id;
    const userName = req.headers.username;
    const userFilesArray = fs.readdirSync(`${usersPath}/${userName}`);  
    if(userFilesArray.includes(`${id}.json`))
    fs.unlinkSync(`${usersPath}/${userName}/${id}.json`)
    else{
        res.status(403).send("Pokemon didn't caught yet")
    }
})





async function getPokemon(id){
    const pokeObj = await P.getPokemonByName(id)
    return {
        name: pokeObj.name,
        height: pokeObj.height,
        weight: pokeObj.weight,
        types: pokeObj.types,
        front_pic: pokeObj.sprites.front_default,
        back_pic: pokeObj.sprites.back_default,
        abilities: pokeObj.moves
    }

} 

module.exports = router


