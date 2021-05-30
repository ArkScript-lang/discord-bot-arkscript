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
\`\`\`

You can also use *quoting* to quickly create anonymous functions taking 0
arguments, useful to make callbacks on the run:

\`\`\`clojure
(let i_want_a_callback (fun (cb) {
    (print "I am a function")
    (cb)
    (print "I am still here")
}))

# would work, but a bit long to write
(i_want_a_callback (fun () (print "hello world")))

# using the quote shorthand '
(i_want_a_callback '(print "hello world"))
# or by using the keyword
(i_want_a_callback (quote (print "hello world")))
\`\`\`

Also, we have a set of builtins functions in the language, available without
importing anything ; for example \`print\` or \`input\`, which we used before.
Note that **builtins must be called**, you can't do things like \`(let my_print print)\`,
or \`(let my_tail tail)\`, otherwise it will result in an error because those
functions are special.`,
                },
            ],
            footer: {
                text: 'tuto 3: Next tutorial is about closures and importation',
            },
        },
    },
    // tuto 3
    {
        embed: {
            color: 0x6666ff,
            title: 'Closures',
            description: `Closure, or function closure, is a way to implementing lexically
scoped name binding. It stores a function along with an environment, explicitly
mapped with specified variables. This allows to reuse and modify captured variables
each time the closure is called.

\`\`\`clojure
(let make_closure (fun (name age) {
    (let coolness_factor 12)

    # here, we return a closure!
    (fun (&name &age &coolness_factor)
        # each time it will be called, it will display the captured variables
        (print name " " age " " coolness_factor))
}))

(let closure (make_closure "Pietro" 42))
(closure)  # prints Pietro 42 12
\`\`\`

Closures capture variables explicitly in their arguments' list, by prefixing them with \`&\`.
We can access the captured fields through the \`closure.field\` notation, in a read only way:

\`\`\`clojure
(print closure.age)  # 42
(print closure.coolness_factor)  # 12

(let make (fun (a)
    (fun (&a) ())))

(let foo (fun () (print "bar")))

(let closure_bis (make foo))
# we can also call captured functions
(closure_bis.a)  # prints bar
\`\`\`

Finally, you can modify the closure content when using it from the inside, through itself or its captured functions:

\`\`\`clojure
(let make (fun (name age) {
    (let set-age (fun (new)
        (set age new)))

    (fun (new-name &name &age &set-age)
        (if (not (nil? new-name))
            (set name new-name)))
}))

(let egg (make "egg" 1))
(print egg.age)  # 1
(egg.set-age 2)
(print egg.age " " egg.name)  # 2 egg
(egg "not an egg")
(print egg.name " " egg.age)  # not an egg 2
\`\`\``,
            fields: [
                {
                    name: 'Importing code',
                    value: `Putting code in multiple files is pretty to make it reusable and more maintainable.

In ArkScript, imported code is copied from the specified file into the current one, with a
guarantee: circular includes are detected and prevented, making execution always possible
even if you include a lot of files.

Files are imported by doing so: (import "myfile.ark"). The path to the target file is
relative to the source file, not to the main executed file.

The only exception about paths in imports is when you import an ArkScript module, ending
in .arkm. Those files are either in the standard library, thus you can just write their
name and ArkScript will find them, or they must be alongside the final executed file.

When importing files from the standard library, you don't need to write the path to the
library folder, just the path of the file in it. For example: \`(import "String.ark")\`
will work without problems.`,
                },
            ],
            footer: {
                text: 'tuto 4: Next tutorial is about macros',
            },
        },
    },
    // tuto 4
    {
        embed: {
            color: 0x6666ff,
            title: 'Macros',
            description: `*Available in ArkScript 3.1.0

A macro is a rule or pattern that specifies how a certain input should be mapped to a
replacement output. Applying a macro to an input is name macro expansion

In ArkScript, there are 3 different types of macros:

* conditions: \`!{if condition then else}\`
* constants: \`!{my_const value}\`
* functions: \`!{my_function (foo bar) body}\`

**Constant macros** are just associations \`identifier to value\`, the value being whatever
you want (even another bloc of code, for example \`(let b 12)\`). The code is scanned and when
such macro is found, it's applied wherever possible.

**Macros' scopes** are tied to the bloc in which they are defined. At the end of said bloc,
the macros defined in it are destroyed. Note that a macro defined a in bloc, which includes
other blocs, will be available in all the other sub-blocs.

**Named macros** can be undefined by using \`!{undef name}\`.`,
        },
        fields: [
            {
                name: 'Named macros',
                value: `\`\`\`clojure
!{a 12}

{
    (print a)  # will print 12, it works!

    !{a 1}  # we can shadow macros by defining other macros with the
            # same name in sub-blocs
    (print a)  # 1

    !{undef a}
    (print a)  # 12, because we undefined the nearest version of a
}

(print a)  # a is still 12 here
\`\`\``,
            },
            {
                name: 'Condition macros',
                value: `They can only work on compile time expressions, for example:

\`\`\`clojure
!{a 12}
!{if (= a 12)
    !{b 14}
    !{c 13}
}

(print b)  # prints 14
(print c)  # compilation error: unbound variable c
           # c is unavailable here because it was never defined
\`\`\`
`,
            },
            {
                name: 'Function macros',
                value: `They are evaluated recursively, thus they can call themselves or
other macros, and use condition macros. A particularity is that their
arguments can ArkScript code blocs, such as a \`(let a 12)\` or even
complexe code blocs like \`{ (mut i 0) (while continue { (print "hello") (set i (+ 1 i)) (if (> i 12) (set continue false)) }) }\`.

Those macros can use a magic pattern \`...args\` (args being the name of
the argument, you can use whatever you want) as the last argument to
tell the compiler that the macros can take any number of arguments.
This is called *varargs* or *variadic arguments*.

\`\`\`clojure
!{foo (a b) {
    (print a " " b)
    (let c (+ a b))
}}

(foo 1 2)
(print c)  # prints 3

!{bar (a ...args)
    (print a " " args)}

(bar 1)  # prints 1
(bar 1 2)  # prints 1 [2]
(bar 1 2 3)  # prints 1 [2 3]
\`\`\`
`,
            },
            {
                name: 'More complex example',
                value: `Here is a more complex example implementing the thread macro. The first
argument is the data, then each function is applied onto it, one after another.
It allows us to write more readable code, instead of the ugly
\`(read-string (slurp (io:file (io:resource filename))))\`.

\`\`\`clojure
!{-> (first ...args) {
    !{if (> (len args) 0)
        ((-> ...args) first)
        first
    }
}}

(let filename "hello.json")
(let io:resource (fun (file) {
    (print "io:resource")
    file
}))
(let io:file (fun (name) {
    (print "io:file")
    name
}))
(let slurp (fun (a) {
    (print "io:slurp")
    a
}))
(let read-string (fun (a) {
    (print "read-string")
    a
}))

(print (-> filename io:resource io:file slurp read-string))
# it will print:
#   read-string
#   io:slurp
#   io:file
#   io:resource
#   hello.json
\`\`\``,
            },
            {
                name: 'List of compile time functions available',
                value: `You can use those in macros.


* Comparison operators: \`=\`, \`!=\`, \`<\`, \`<=\`, \`>\`, \`>=\`
* Chaining conditions / inverting them: \`not\`, \`and\`, \`or\`
* Working on lists: \`len\`, \`@\`, \`head\`, \`tail\`

We also have a few predefined macros to work on ArkScript code and ease code generation.
For example, one can generate a new symbol using \`(symcat symbol value-or-expression)\`,
or count the number of arguments of a function with \`(argcount function-name)\`.

* \`symcat\`: generate a new symbol from a given symbol and a value or expression. \`(- a 1)\` with \`a\` a constant macro (or macro argument) is valid.
* \`argcount\`: retrieve at compile time the number of arguments taken by a given function. The function must have been defined *before* using \`argcount\`.

`,
            },
        ],
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
