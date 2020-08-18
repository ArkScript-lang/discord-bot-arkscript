# ArkScript Discord bot

The sole purpose of this bot is to be able to safely execute ArkScript code through discord.

## Running the bot

You will need:
* nodejs >= v12.0
* docker
* a config.js file with something like this:
```js
'use strict';

const token = 'a very nice and long discord token for your bot';
const prefix = '$';
const owner = 'the id of the owner, to run some commands to check if everything is working as intended';

exports.token = token;
exports.prefix = prefix;
exports.owner = owner;
```

The bot automatically pulls the latest docker image of ArkScript (nightly builds) before starting.

To start it:
```shell
node main.js
```

*Nota bene*: on WSL, I need to launch `dockerd` myself, in another process and using `sudo`, and the bot needs to be run using `sudo` as well, otherwise the `docker` commands will fail.

## Contributing

* First, [fork](https://github.com/ArkScript-lang/discord-bot-arkscript) the repository
* Then, clone your fork: `git clone git@github.com:username/discord-bot.git`
* Create a branch for your feature: `git checkout -b feat-my-awesome-idea`
* When you're done, push it to your fork and submit a pull request!

Don't know what to work on? Check the [issues](https://github.com/ArkScript-lang/discord-bot-arkscript/issues)!
