const pokemonNotFound = function (err, req, res, next) {
    res.status(404).send('')
}
const forbiddenAction = function (err, req, res, next) {
    res.status(403).send('')

}
const serverError = function (err, req, res, next) {
    res.status(500).send('')

}
const noAuth = function (err, req, res, next) {
    res.status(401).send('')
}

const errorfunc = { pokemonNotFound, forbiddenAction, serverError, noAuth }
module.exports ={ errorfunc}
