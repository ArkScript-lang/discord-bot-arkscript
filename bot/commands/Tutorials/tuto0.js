'use strict';

require('dotenv').config();

exports.run = (client, msg, args) => {
    msg.channel.send({
        embed: {
            color: 0x6666ff,
            title: 'Getting started',
            description: `First thing you will need is to run code.
For this, download the latest release from GitHub, extract it where you want,
and open a shell in the directory where it was extracted.
We'll now be writing \`./Ark main.ark --lib ./lib\` to run code in the file
\`main.ark\`. The \`--lib ./lib\` part is needed **only** if you don't have
an environnement variable to tell ArkScript where to look for its std lib,
and for convenience if you want/need to keep multiple versions of the std lib.`,
            fields: [
                {
                    name: 'Understanding the syntax',
                    value: `In ArkScript, everything following a "(" is a function.
Thus, \`(print "hello" 1 -4)\`, is a function call. The function is print, the
arguments are "hello", 1 and -4.
The only exception to this law is when declaring functions, the argument list isn't a
function call: \`(fun (arg1 arg2) (print arg1 arg2))\`.

Since everything is a function, there are no operators, thus an addition is written:
\`(+ 1 2 3 etc)\`. Same for comparisons: \`(< 1 44)\`.`,
                },
                {
                    name: 'Variables and constants',
                    value: `In ArkScript, everything is immutable, and is a constant, declared using \`let\` keyword:
\`(let a 12)\`.
Mutability was added to be able to change values when needed, using \`mut\`,
variables can be modified using \`set\`:
\`(mut b 14) (set b 12)\`.
Using \`set\` on a constant declared by \`let\` will result in an error.

Finally, note that you can delete variables yourself using \`del\`:
\`(del a) (del b)\`.
Otherwise, variables and constants are deleted following the RRID: when a scope
ends, everything inside is removed.`,
                }
            ],
            footer: {
                text: 'tuto1: Next tutorial is about the program structure, printing to the terminal, and conditions',
            },
        },
    });
};

exports.help = {
    description: 'Tutorial about setting up ArkScript to run code, the syntax, and variables/constants',
    usage: 'tuto0',
};