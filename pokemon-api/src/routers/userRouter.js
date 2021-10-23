const router = require('express').Router()
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

router.get('/',(req,res)=>{
    console.log(req.query.name);
    res.send('User List');
})

router.get('/new',(req,res)=>{
    res.send('User New Form');
})

router.post('/',(req,res)=>{
    res.send('Create User');
})

router.route('/:id')
.get((req,res)=>{
    res.send(`User Get With ID ${req.params.id}`);
})
.put((req,res)=>{
    res.send(`Update User Get With ID ${req.params.id}`);
})
.delete((req,res)=>{
    res.send(`Delete User Get With ID ${req.params.id}`);
})

module.exports = router