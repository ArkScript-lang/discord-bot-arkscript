'use strict';

require('dotenv').config();

const tutos = [
    // tuto 0
    {
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
                text: 'tuto 1: Next tutorial is about the program structure, printing to the terminal, and conditions',
            },
        },
    },
    // tuto 1
    {
        embed: {
            color: 0x6666ff,
            title: 'Program structure, printing and conditions',
            description: `An ArkScript program is a collection of blocks.
A block is \`(function arguments...)\`, thus, those are valid programs:
\`\`\`clojure
(print "a")
\`\`\`

\`\`\`clojure
(let a 12)
(let foo (fun (a b)
(+ a b)))
(print (foo a a))
\`\`\``,
            fields: [
                {
                    name: 'Printing',
                    value: `User interactions are a must have in a programming language.
To achieve such interaction in a *shell* (the big black windows where our code is running),
we have what we call *IO* or *input/output*, through \`print\` and \`input\`. One can
write text to the shell, the other can prompt the user and retrieve what they wrote.

Example:
\`(print "hello" " world")\`, will print \`hello world\`
The \`print\` function won't put spaces between each element printed, thus we have
to do it ourselves.

\`(let a (input "what is your name?") (print a)\` will print what the user wrote,
after having validated by pressing *Enter*. The prompt is optionnal,
\`(input)\` will also work on its own.`,
                },
                {
                    name: 'Conditions',
                    value: `TODO`,
                },
            ],
            footer: {
                text: 'tuto 2: Next tutorial is about ...',
            }
        }
    },
];

exports.run = (client, msg, args) => {
    if (args[0] && args[0] >= '0' && args[0] <= `${tutos.length}`)
        msg.channel.send(tutos[+args[0]]);
    else
        msg.channel.send(':x: The argument is missing or invalid');
};

exports.help = {
    description: 'Tutorial about ArkScript',
    usage: 'tuto <index>',
};