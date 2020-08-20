'use strict';

require('dotenv').config();

exports.run = (client, msg, args) => {
    msg.channel.send({
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
                text: 'tuto2: Next tutorial is about ...',
            }
        }
    });
};

exports.help = {
    description: 'Tutorial about the program structure, printing and conditions',
    usage: 'tuto1',
};