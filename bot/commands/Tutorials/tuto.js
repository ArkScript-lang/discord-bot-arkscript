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
            title: 'Program structure',
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
\`\`\`

Multiple blocks can be put into one by using the **begin construction**:
\`\`\`clojure
(begin
    (let a 12)
    (print a)
    (let b (* a 2))
    (print b))

# and can be accessed from outside, begin doesn't create a scope
(print a " " b)
\`\`\`

\`(begin)\` and \`{}\` are the same thing.`,
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
                    value: `In any programming language, it's useful to control the program
flow, to be able to give the user multiple choices (attacking an ennemy, befriending
it, spying on it...) and those things are achieved through conditions.
Constructing a condition is done like so:
\`(if condition then else)\`
The \`else\` bloc is optionnal.

Examples:
\`\`\`clojure
(if (= a 12)
    # then
    (print "a is 12")
    # else
    (print "a is not 12")
)

(if (and (< a 12) (> b 14))
    (print "a is < 12 AND b is > 14"))
\`\`\`

The \`then\` and the \`else\` parts can be composed of multiple functions by
using the \`begin\` construction.`,
                },
            ],
            footer: {
                text: 'tuto 2: Next tutorial is about loops and functions',
            },
        },
    },
    // tuto 2
    {
        embed: {
            color: 0x6666ff,
            title: 'Loops',
            description: `Giving the user a choice is a thing, but repeating an action is
another that is very useful in a program as well. For example, if we need to
compute the sum of values in a list, we would need to loop over the values
of the list. In video games, we would need loops to generate waves of ennemies.

Loops in ArkScript are created by using the keyword \`while\`.

Example:
\`\`\`clojure
# continue must be a mutable for us the be able to modify it
(mut continue true)
(while continue {
    (print "hello")

    # 10% chance of stopping the loop
    (if (< (random) 0.1)
        (set continue false))
})

# another example using conditions
(mut i 0)
(while (< i 10)
    (puts i " ")  # won't put a \n at the end of the content
    (set i (+ 1 i)))
\`\`\``,
            fields: [
                {
                    name: 'Functions',
                    value: `Functions are a tool to factorize code, to follow the DRY
(don't repeat yourself) principle. Who would want to write 10 times the same
100 lines when they can use a function and call it 10 times inside a loop?

Note: ArkScript was particularly optimized to deal with function using few arguments,
thus encouraging code reuse and code split into functions.

A function is composed of 2 parts: the argument lists and the body:
\`(fun (a b c) (print a b c))\`
\`(a b c)\` is the argument list, the print bloc is the body.

The value returned by a function is the last evaluated value in the body,
if none, \`nil\` is returned.

Example:
\`\`\`clojure
(let foo (fun (a b) (begin
    (print "function got: " a " " b)
    # return value:
    (+ a b))))

(print (foo 12 14))  # 26
\`\`\``,
                },
            ],
            footer: {
                text: 'tuto 3: Next tutorial is about closures, quoting and importation',
            },
        },
    },
    // tuto 3
    {
        embed: {
            color: 0x6666ff,
            title: 'Closures',
            description: ``,
            fields: [
                {
                    name: 'Quoting',
                    value: ``,
                },
                {
                    name: 'Importation',
                    value: ``,
                },
            ],
        },
    },
];

exports.run = (client, msg, args) => {
    if (args[0] && args[0].length === 1 && args[0] >= '0' && args[0] <= `${tutos.length - 1}`)
        msg.channel.send(tutos[+args[0]]);
    else
        msg.channel.send(':x: The argument is missing or invalid');
};

exports.help = {
    description: 'Tutorial about ArkScript',
    usage: 'tuto <index>',
};