const Discord = require('discord.js');
const fs = require('fs');
const Character = require('../Characters/character');

const EMBED_COLOR = 'DARK_GOLD';
const COMMANDS = './src/Storage/CommandsWithDescriptions.json';
const CHAR_DATA = './src/Storage/CharacterData/CharacterData.json';

module.exports = class NewCharacterPrompts {
    sendGreeting(message) {
        var commands = JSON.parse(fs.readFileSync(COMMANDS));

        message.author.send('Welcome to the West Marches, a D&D 5e game! ' + 
        'I will be helping you through your character creation process. ' +
        '*Your character will start at level 1.* ' +
        'Please use the below commands to create your character.').then(() => {
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
    
    sendConfirmStats(message) {
        if (this.checkIfCharacterExistsAndSendMessage(message)) {
            const now = new Date();
            var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
            var embed = new Discord.RichEmbed();
            let username = message.author.username;

            embed.setTitle(`New Stats for ${PlayerData[username].CharacterName}`)
                .setColor(EMBED_COLOR)
                .addField('Strength', PlayerData[username].StatScore.Strength)
                .addField('Dexterity', PlayerData[username].StatScore.Dexterity)
                .addField('Constitution', PlayerData[username].StatScore.Constitution)
                .addField('Intelligence', PlayerData[username].StatScore.Intelligence)
                .addField('Wisdom', PlayerData[username].StatScore.Wisdom)
                .addField('Charisma', PlayerData[username].StatScore.Charisma);
            
            message.author.send(embed).then(() => {
                console.log(`${now}: Sending stats to ${username}`);
            }).catch(console.error);

            message.author.send('If you like the above stats, please reply with !confirmStats. ' +
                `Otherwise, please !rollStats again. You have ${PlayerData[username].StatScore.Rerolls} uses remaining.`)
                .then(() => {
                    console.log(`${now}: Sending reroll prompt to ${message.author.username}`);
                }).catch(console.error);
        }
    }

    checkIfCharacterExistsAndSendMessage(message) {
        const character = new Character();
        if(!character.doesPlayerHaveCharacter(message.author.username)) {
            this.tellPlayerToMakeCharacter(message.author);
            return false;
        } else {
            return true;
        }
    }

    tellPlayerToMakeCharacter(author) {
        author.send('You do not have a character already made. Please use !createCharacter '+ 
        'to create a character first.').then(() => {
            const now = new Date();
            console.log(`${now}: Informing player to create a Character first.`);
        }).catch(console.error);
    }
};