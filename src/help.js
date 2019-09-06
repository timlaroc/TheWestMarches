const Discord = require('discord.js');
const fs = require('fs');

const COMMANDS = './src/Storage/CommandsWithDescriptions.json';
const EMBED_COLOR = 'DARK_GOLD';

module.exports = class Help {
    constructor () {}

    // TODO
    sendBadCommandFormat(message, commandName) {
        var commands = JSON.parse(fs.readFileSync(COMMANDS));
        var embed = new Discord.RichEmbed();

        if(commands[commandName] !== undefined && message.author !== 'The West Marches') {
            embed.setTitle(`Correct usage for your command:`)
                .setColor(EMBED_COLOR)
                .addField(`${commands[commandName].command}`, `${commands[commandName].description}`);

            message.reply(embed).then( () => {
                const now = new Date();
                console.log(`${now}: Sending bad command format message reply.`);
            }).catch(console.error);
        } else {
            message.channel.send('The command that you just used is currently undefined in my records.')
            .then(() => {
                const now = new Date();
                console.log(`${now}: ${commandName} is not currently saved in CommandsWithDescriptions.json.`);
            }).catch(console.error);
        }
    }

    helpMessage(arg) {

    }
}