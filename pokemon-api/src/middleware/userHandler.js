const { errorfunc } = require('C:/dev/cyber4s/Pokedex-back/pokemon-api/src/middleware/errorHandler.js')
const handleUserName = function (req, res, next) {
    const userName = req.headers.username
    if (userName === undefined)
        return errorfunc.noAuth(null, req, res)
    else {
        req.username = userName
        next()
    }
}
module.exports = {
    handleUserName
}