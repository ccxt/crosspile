/*  ------------------------------------------------------------------------ */

/*  NOTE: there's a great tool for exploring the AST output generated
          by various JS parsers, including ESpree (that we use now):

          https://astexplorer.net/

/*  ------------------------------------------------------------------------ */

const fromCamelCase = s => s.replace (/[a-z][A-Z]/g, x => x[0] + '_' + x[1].toLowerCase ()) // fromCamelCase → from_camel_case

/*  ------------------------------------------------------------------------ */

const gen = n => (gen[n.type] || gen.other) (n)

/*  ------------------------------------------------------------------------ */

Object.assign (gen, {

    Program: ({ type, body }) =>

        body.map (gen),

    ClassDeclaration: ({ id, superClass, body: { body } }) =>

        [
            'class '    + gen (id) +
            ' extends ' + gen (superClass),
            '',
            ...body.map (gen)
        ],

    MethodDefinition: ({ kind, key: { name }, value: { params = [], body: { body } } }) => 

        [
            'def '
                + (kind === 'constructor' ? '__init__' : fromCamelCase (name))
                + '('
                + [{ type: 'Identifier', name: 'self' }, ...params].map (gen).join (', ')
                + '):',

            body.map (gen)
        ],

    Identifier: ({ name }) =>

        name,

    Super: () =>

        'super',

    AssignmentPattern: ({ left, right }) =>

        gen (left) + '=' + gen (right),

    ExpressionStatement: ({ expression }) =>

        gen (expression),

    CallExpression: ({ callee, arguments: args /* arguments is reserved keyword in strict mode, cannot use as a var name */ }) =>

        gen (callee) + '(' + args.map (gen).join (', ') + ')',

    other: ({ type, start, end, ...rest }) =>

        `<@! ${type}: ${Object.keys (rest).join (', ')} !@>` // to make sure it won't parse
})

/*  ------------------------------------------------------------------------ */

const indentAndJoin = depth => x => Array.isArray (x)
                                                ? x.map (indentAndJoin (depth + 1)).join ('\n')
                                                : '    '.repeat (depth) + x

/*  ------------------------------------------------------------------------ */

module.exports = {

    generateFrom: ast => indentAndJoin (-2) (gen (ast))
}

/*  ------------------------------------------------------------------------ */
