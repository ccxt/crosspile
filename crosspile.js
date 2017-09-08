/*  ------------------------------------------------------------------------ */

const espree = require ('espree')
    , python = require ('./languages/python')

/*  ------------------------------------------------------------------------ */

module.exports = function crosspile (js, { from = 'JavaScript', to } = {}) {

    const ast = espree.parse (js, { ecmaVersion: 8, ecmaFeatures: { experimentalObjectRestSpread: true } })

    return python.generateFrom (ast)
}

/*  ------------------------------------------------------------------------ */
