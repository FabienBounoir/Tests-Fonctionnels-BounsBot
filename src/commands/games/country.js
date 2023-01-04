const wait = require('util').promisify(setTimeout);
const colors = require('colors');

module.exports = {
    name: 'country',

    run: async (client) => {
        return new Promise(async (resolve, reject) => {
            let channel = await client.channels.cache.get(process.env.CHANNEL)

            for (let i = 0; i < 10; i++) {
                try {
                    await channel.sendSlash(process.env.BOTID, "country")

                    await wait(1000)
                    const message = await channel.messages.fetch({ limit: 1 }).then(messages => messages.first());
                    const menu = message?.components[0]?.components[0];

                    await wait(2000)
                    let random = Math.floor(Math.random() * menu.options.length);
                    await message.selectMenu(menu, [menu.options[random].value]);

                    await wait(2000)
                    random = Math.floor(Math.random() * menu.options.length);
                    await message.selectMenu(menu, [menu.options[random].value]);

                    await wait(2000)
                    random = Math.floor(Math.random() * menu.options.length);
                    await message.selectMenu(menu, [menu.options[random].value]);

                } catch (error) {
                    console.log("Country command error:".bgRed.white, error)
                }
            }
            resolve()
        })
    }
}
