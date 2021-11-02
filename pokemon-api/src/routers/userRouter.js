const router = require('express').Router()
const path = require('path');
const fs = require('fs')

router.post('/info',  (req, res)=> {  //sign up
  const userName = req.headers.username;
try {
    const usersPath = path.resolve(path.join('./users', userName))
  if(!fs.existsSync(usersPath)){
          fs.mkdirSync(usersPath,{ recursive: true })//create new directory by the username
        res.send('you signed up, now you can login')
        }
        else{
        res.send('This username is already taken try another one....')
        }
} catch (error) {
  res.send(error)
}



  });

router.get('/info/login',  (req, res)=> { //sign in
    const userName = req.headers.username;
    const usersPath = path.resolve(path.join('./users', userName))
    if(fs.existsSync(usersPath))
    res.send(true)
    else
    res.send(false)
})
  

module.exports = router