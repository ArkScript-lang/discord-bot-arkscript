# ArkScript Discord bot

The sole purpose of this bot is to be able to safely execute ArkScript code through discord.

## Running the bot

You will need:
* nodejs >= v12.0
* docker
* a `.env` file (you can use the `.env.example` file to build your own)

The bot automatically pulls the latest docker image of ArkScript (nightly builds) before starting.

To start it:
```shell
npm i
node main.js
```

*Nota bene*: on WSL, I need to launch `dockerd` myself, in another process and using `sudo`, and the bot needs to be run using `sudo` as well, otherwise the `docker` commands will fail.

## Contributing

* First, [fork](https://github.com/ArkScript-lang/discord-bot-arkscript) the repository
* Then, clone your fork: `git clone git@github.com:username/discord-bot.git`
* Create a branch for your feature: `git checkout -b feat-my-awesome-idea`
* When you're done, push it to your fork and submit a pull request!

Don't know what to work on? Check the [issues](https://github.com/ArkScript-lang/discord-bot-arkscript/issues)!
