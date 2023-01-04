const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();
const fs = require("fs");

client.commands = []

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`.bgGreen.black);


    let directories = await fs.readdirSync('./src/commands/')
    if (directories.length <= 0) return console.log("Repertory is empty".red)

    for (let i = 0; i < directories.length; i++) {
        let files = await fs.readdirSync(`./src/commands/${directories[i]}/`)
        if (files.length <= 0) continue

        for (let j = 0; j < files.length; j++) {
            let command = require(`./src/commands/${directories[i]}/${files[j]}`)
            client.commands.push(command)
        }
    }

    for (let i = 0; i < client.commands.length; i++) {
        console.log(`  - Testing ${client.commands[i].name}`.yellow)
        await client.commands[i].run(client)
    }

    console.log("✅ Done".bgGreen.black)
})


client.login(process.env.TOKEN);