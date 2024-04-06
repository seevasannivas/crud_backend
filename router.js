const api_controller = require('./api.controller');
const auth_controller = require('./auth.controller')
const { verifyToken } = require('./utils')

module.exports = (app)=>{
    app.use('/api',api_controller),
    app.use('/auth',auth_controller)
}