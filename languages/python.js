/*  ------------------------------------------------------------------------ */

/*  NOTE: there's a great tool for exploring the AST output generated
          by various JS parsers, including ESpree (that we use now):

          https://astexplorer.net/

/*  ------------------------------------------------------------------------ */

const fromCamelCase = s => s.replace (/[a-z][A-Z]/g, x => x[0] + '_' + x[1].toLowerCase ()) // fromCamelCase → from_camel_case

/*  ------------------------------------------------------------------------ */

const blockTree = (n, parents = []) => (match[n.type] || match.other) (n, n => blockTree (n, [n, ...parents]), parents)

/*  ------------------------------------------------------------------------ */

const match = {

    Program: ({ type, body }, $) =>

        body.map ($),

    ClassDeclaration: ({ id, superClass, body: { body } }, $) =>

        [
            'class ' + $(id) + ' extends ' + $(superClass),
            '',
            ...body.map ($)
        ],

    MethodDefinition: ({ kind, key: { name }, value: { params = [], body: { body } } }, $) => 

        [
            'def '
                + (kind === 'constructor' ? '__init__' : fromCamelCase (name))
                + '('
                + [{ type: 'Identifier', name: 'self' }, ...params].map ($).join (', ')
                + '):',

            body.map ($)
        ],

    Identifier: ({ name }) =>

        name,

    Super: ({}, $, parents) =>

        'super (' + $(parents.find (n => n.type === 'ClassDeclaration').id) + ', self).__init__',

    AssignmentPattern: ({ left, right }, $) =>

        $(left) + '=' + $(right),

    ExpressionStatement: ({ expression }, $) =>

        $(expression),

    CallExpression: ({ callee, arguments: args /* arguments is reserved keyword in strict mode, cannot use as a var name */ }, $) =>

        [$(callee) + '(', ...args.map ($), ')'],

    ObjectExpression: ({ properties }, $) =>

        ['{', ...properties.map ($), '}'],

    Property: ({ key, value }, $) =>

        $(key) + ': ' + $(value) + ',',

    Literal: ({ value }, $) =>

        "'" + value + "'",

    other: ({ type, start, end, ...rest }) =>

        `<@! ${type}: ${Object.keys (rest).join (', ')} !@>` // to make sure it won't parse
}

/*  ------------------------------------------------------------------------ */

const indentAndJoin = depth => x => Array.isArray (x)
                                                ? x.map (indentAndJoin (depth + 1)).join ('\n')
                                                : '    '.repeat (depth) + x

/*  ------------------------------------------------------------------------ */

module.exports = {

    generateFrom: ast => indentAndJoin (-2) (blockTree (ast))
}

/*  ------------------------------------------------------------------------ */
