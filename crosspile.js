const espree = require ('espree')
const log = require ('ololog')

module.exports = function crosspile (js, { from = 'JavaScript', to } = {}) {

//  TODO: implement

    const ast = espree.parse (js, { ecmaVersion: 8, ecmaFeatures: { experimentalObjectRestSpread: true } })

    log (ast)

    return js
}