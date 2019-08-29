const Discord = require('discord.js');
//const CharacterRace = require('./characterRace.js');
const fs = require('fs');

const CHAR_DATA = './src/Storage/CharacterData/CharacterData.json';
const CHAR_TEMPLATE = './src/Storage/CharacterData/CharacterDataTemplate.json';
const EMBED_COLOR = 'DARK_GOLD';

module.exports = class Character {
    constructor(author) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        var Template = JSON.parse(fs.readFileSync(CHAR_TEMPLATE));
        const now = new Date();

        if(!PlayerData[author.username] && author.username !== 'The West Marches'){ 
            PlayerData[author.username] = Template;
            console.log(`${now}: New character created for ${author.username}`);
            fs.writeFileSync(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
                if (err) console.error(err);
            });
        }
    }

    // TODO: I need to figure out what I'm actually doing with this or if I'm keeping it
    displayCharacter(author) { 
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        const embed = new Discord.RichEmbed();

        embed.setTitle(PlayerData[author.username].CharacterName)
            .setColor(EMBED_COLOR)
            .addField('Dexterity', PlayerData[author.username].StatScore.Dexterity)
        author.send(embed).then(() => {
            const now = new Date();
            console.log(`${now}: Attempting to send Character to ${author.username}`);
        }).catch(console.error);
    }

    rollStats(author) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        const now = new Date();

        if(!PlayerData[author.username] && author.username !== 'The West Marches') {

        }
    }
}