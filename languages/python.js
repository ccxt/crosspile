

const generate = depth => (n, opts = {}) => {

    const indent = '    '.repeat (depth)

    switch (n.type) {

        case 'Program':

            return n.body.map (generate (depth)).join ('\n')

        case 'ClassDeclaration':

            return indent + `class ${n.id.name} extends ${n.superClass.name}:\n\n` + n.body.body.map (generate (depth + 1)).join ('\n')

        case 'MethodDefinition':

            const name = n.kind === 'constructor' ? '__init__' : n.key.name

            return indent + `def ${name}(self):\n`

        default:

            console.error (n)
            throw new Error ('unrecognized node type: ' + n.type)
    }
}

module.exports = {

    generateFrom: generate (0)
}