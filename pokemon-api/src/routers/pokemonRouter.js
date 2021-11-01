const router = require('express').Router()
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const fs = require('fs')
const path = require('path')
const usersPath = `C:/dev/cyber4s/Pokedex-back/pokemon-api/users`
const { errorfunc } = require('../middleware/errorHandler')
const {handleUserName} = require('../middleware/userHandler')


function openPokemonFile(usersPath) {//gets file path return the name of the pokemon
    const pokemonObj = JSON.parse(fs.readFileSync(usersPath));
    return pokemonObj.name
  }


router.get('/', handleUserName, function (req, res) {
    let pokemonArray = []
    const userName = req.username
    const userPath = `${usersPath}/${userName}`
    if (fs.existsSync(userPath)) {
        const userFiles = fs.readdirSync(userPath)
        userFiles.forEach((a) => {
            pokemonArray.push(openPokemonFile(`${userPath}/${a}`))
        })
        return res.json(pokemonArray)
    }
})


router.get('/get/:id', async(req,res)=>{
    try {
        
        res.send((await getPokemon(req.params.id)));
    } catch  {
        errorfunc.pokemonNotFound(null,req,res)
    }
})
router.get('/query', async(req,res)=>{
    try {
        
        res.send((await getPokemon(req.query.name)));
    } catch  {
        errorfunc.pokemonNotFound(null,req,res)

    }
})


router.put("/catch/:id", async (req, res)=> {//function check if pokemon already caught or not
    try {
        const id = req.params.id;
        const userName = req.username
        const pokemonObj = JSON.stringify(await getPokemon(id))
            if(fs.existsSync(`${usersPath}/${userName}/${id}.json`))//check if path exist
            errorfunc.forbiddenAction(null,req,res)
        else{
            fs.writeFileSync(`${usersPath}/${userName}/${id}.json`,pokemonObj)//create file with id name
            res.send("You've got yourself a pokemon ✔")
        }
    } catch (error) {
        errorfunc.forbiddenAction(null,req,res)
    }

})

router.delete("/release/:id", (req, res)=> {
    const id = req.params.id;
    const userName = req.username
    const userFilesArray = fs.readdirSync(`${usersPath}/${userName}`);  
    if(userFilesArray.includes(`${id}.json`)){
    fs.unlinkSync(`${usersPath}/${userName}/${id}.json`)
    res.send('pokemon released😥')
}
    else{
        errorfunc.forbiddenAction(null,req,res)
    }
})


async function getPokemon(pokemonId){
    const pokemonObj = await P.getPokemonByName(pokemonId)
    return {
        name: pokemonObj.name,
        height: pokemonObj.height,
        weight: pokemonObj.weight,
        types: pokemonObj.types,
        front_pic: pokemonObj.sprites.front_default,
        back_pic: pokemonObj.sprites.back_default,
        id: pokemonObj.id,
        abilities: pokemonObj.moves
    }

} 

module.exports = router


