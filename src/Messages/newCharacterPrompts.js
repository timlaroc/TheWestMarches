const Discord = require('discord.js');
const fs = require('fs');

const EMBED_COLOR = 'DARK_GOLD';
const COMMANDS = './src/Storage/CommandsWithDescriptions.json'

module.exports = class NewCharacterPrompts {
  sendGreeting(message) {
    var commands = JSON.parse(fs.readFileSync(COMMANDS));

    message.author.send('Welcome to the West Marches, a D&D 5e game! ' + 
      'I will be helping you through your character creation process. ' +
      '*Your character will start at level 1.* ' +
      'Please use the below commands to create your character.')
      .then(() => {
        const now = new Date();
        console.log(`${now}: Greeting message sent to ${message.author.username}`);
      }).catch(console.error);

    const embed = new Discord.RichEmbed();
    // add race list
    embed.setTitle('Creating your Character')
         .setColor(EMBED_COLOR)
         .addField(commands['rollStats'].command, commands['rollStats'].description)
         .addField(commands['classList'].command, commands['classList'].description)
         .addField(commands['selectClass'].command, commands['selectClass'].description);

    message.author.send(embed).then(() => {
      const now = new Date();
      console.log(`${now}: Character Creation Embed sent to ${message.author.username}`);
    }).catch(console.error);
  }
};