/*  ------------------------------------------------------------------------ */

/*  NOTE: there's a great tool for exploring the AST output generated
          by various JS parsers, including ESpree (that we use now):

          https://astexplorer.net/

/*  ------------------------------------------------------------------------ */

const fromCamelCase = s => s.replace (/[a-z][A-Z]/g, x => x[0] + '_' + x[1].toLowerCase ()) // fromCamelCase → from_camel_case

/*  ------------------------------------------------------------------------ */

const translate = n => (translate[n.type] || translate.unknown) (n)

/*  ------------------------------------------------------------------------ */

Object.assign (translate, {

    Program: ({ type, body }) =>

        body.map (translate),

    ClassDeclaration: ({ id: { name }, superClass, body: { body } }) =>

        [`class ${name} extends ${superClass.name}`, '', body.map (translate)],

    MethodDefinition: ({ kind, key: { name }}) => 

        `def ${kind === 'constructor' ? '__init__' : fromCamelCase (name)}(self):`,

    unknown: ({ type }) =>

        { throw new Error ('unrecognized node type: ' + n.type) }
})

/*  ------------------------------------------------------------------------ */

const indentAndJoin = depth => x => Array.isArray (x)
                                                ? x.map (indentAndJoin (depth + 1)).join ('\n')
                                                : '    '.repeat (depth) + x

/*  ------------------------------------------------------------------------ */

module.exports = {

    generateFrom: ast => indentAndJoin (-2) (translate (ast))
}

/*  ------------------------------------------------------------------------ */
