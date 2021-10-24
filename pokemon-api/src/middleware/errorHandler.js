const pokemonNotFound = function (err, req, res, next) {
    res.status(404).send("Pokemon not found")
    // res.status(404).json({ message: 'Pokemon not found'})
}
const forbiddenAction = function (err, req, res, next) {
    res.status(403).send("Forbidden action")
    // res.status(403).json({ message: 'Forbidden action'})

}
const serverError = function (err, req, res, next) {
    res.status(500).send("server error")
    // res.status(500).json({ message: 'server error'})

}
const noAuth = function (err, req, res, next) {
    res.status(401).send("you did not fill in the user")
    // res.status(401).json({ message: 'you did not fill in the user'})
}

const errorfunc = { pokemonNotFound, forbiddenAction, serverError, noAuth }
module.exports = errorfunc
