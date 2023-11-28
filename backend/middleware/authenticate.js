const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    console.log('====================================')
    console.log('req.url ----->', req.url)
    console.log('====================================')
    const token = req.header('x-auth-token')
    if (!token) return res.status(403).send('Access denied.')
    const currentTime = Math.floor(Date.now() / 1000)
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
    if (decoded.exp > currentTime) {
      req.user = decoded
      next()
    } else {
      res.status(401).send({ tokenInvalid: true, message: 'Token expired.' })
    }
  } catch (error) {
    console.log('====================================')
    console.log('error ---->', error)
    console.log('====================================')
    res.status(401).send({ tokenInvalid: true, message: 'Invalid token' })
  }
}
