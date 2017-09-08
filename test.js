/*  ------------------------------------------------------------------------ */

const crosspile = require ('./crosspile')
    , assert    = require ('assert')
    , fs        = require ('fs')

/*  ------------------------------------------------------------------------ */

describe ('crosspile.js', () => {

    it ('works', () => {

        const js = fs.readFileSync ('./test_files/example.js', 'utf8')

        const py  = crosspile (js, { to: 'Python' })

        console.log (py)
        
        //const php = crosspile (js, { to: 'PHP' })

        //assert.equal (py,  fs.readFileSync ('./test_files/example.py',  'utf8'))
        //assert.equal (php, fs.readFileSync ('./test_files/example.php', 'utf8'))
    })
})