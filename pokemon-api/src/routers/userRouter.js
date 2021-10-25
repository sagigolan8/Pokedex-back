const router = require('express').Router()
const fs = require('fs')
const usersPath = `C:/dev/cyber4s/Pokedex-back/pokemon-api/users`

router.post('/info',  (req, res)=> { //sign up
        const userName = req.headers.username;
        if(!fs.existsSync(`${usersPath}/${userName}`)){
        fs.mkdirSync(`${usersPath}/${userName}`)//create new directory by the username 
        res.send('you are just signed up, now you can login')
        }
        else{
        res.send('This username is already taken try another one....')
        }
  });

router.get('/info/login',  (req, res)=> { //sign in
    const userName = req.headers.username;
    if(fs.existsSync(`${usersPath}/${userName}`))
    res.send(true)
    else
    res.send(false)
})
  

module.exports = router