const Discord = require('discord.js');
//const CharacterRace = require('./characterRace.js');
const fs = require('fs');
// const Math = require('math');

const CHAR_DATA = './src/Storage/CharacterData/CharacterData.json';
const CHAR_TEMPLATE = './src/Storage/CharacterData/CharacterDataTemplate.json';
const EMBED_COLOR = 'DARK_GOLD';

module.exports = class Character {
    constructor(author, initial) {
        if (initial) {
            var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
            var Template = JSON.parse(fs.readFileSync(CHAR_TEMPLATE));
            const now = new Date();

            if(!this.doesPlayerHaveCharacter(author.username)){ 
                PlayerData[author.username] = Template;
                console.log(`${now}: New character created for ${author.username}`);
                fs.writeFileSync(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
                    if (err) console.error(err);
                });
            }
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

    setName(author) {
        if(this.doesPlayerHaveCharacter(author.username)) {

        }
    }

    rollStats(author) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        const now = new Date();

        if(this.doesPlayerHaveCharacter(author.username)) {
            if(PlayerData[author.username].StatScore.Rerolls < 3) {
                console.log(`${now}: Rolling stats for ${author.username}`)
                PlayerData[author.username].StatScore.Strength = this.rollAndDropLowest(4, 'd6');
                PlayerData[author.username].StatScore.Dexterity = this.rollAndDropLowest(4, 'd6');
                PlayerData[author.username].StatScore.Constitution = this.rollAndDropLowest(4, 'd6');
                PlayerData[author.username].StatScore.Wisdom = this.rollAndDropLowest(4, 'd6');
                PlayerData[author.username].StatScore.Intelligence = this.rollAndDropLowest(4, 'd6');
                PlayerData[author.username].StatScore.Charisma = this.rollAndDropLowest(4, 'd6');
                
                PlayerData[author.username].StatScore.Rerolls++;

                if (PlayerData[author.username].StatScore.Rerolls === 3) this.sendStatsNowConfirmed(author);

                fs.writeFileSync(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
                    if (err) console.error(err);
                });
            } else {
                this.sendStatsAlreadyConfirmed(author);
            }
        } else {
            console.log(`${now}: Rolling Stats failed because ${author.username} does not have a character.`);
        }
    }

    confirmStats(author) {
        if(this.doesPlayerHaveCharacter(author.username)) {
            var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
            const now = new Date();

            PlayerData[author.username].StatScore.Set = true;
            fs.writeFileSync(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
                if (err) console.error(err);
            });
            console.log(`${now}: Stats have been confirmed for ${PlayerData[author.username].CharacterName}`);
        }
    }

    roll(dieType) {
        switch (dieType) {
        case 'd4':
            return Math.floor(Math.random() * 4) + 1;
        case 'd6':
            return Math.floor(Math.random() * 6) + 1;
        case 'd8':
            return Math.floor(Math.random() * 8) + 1;
        case 'd10':
            return Math.floor(Math.random() * 10) + 1;
        case 'd20':
            return Math.floor(Math.random() * 20) + 1;
        }
    }

    rollAndDropLowest(numberOfDice, dieType) {
        var output = [];
        for ( var i = 0; i < numberOfDice; i++) {
            output.push(this.roll(dieType));
        }
        output.sort().reverse().pop();

        if (dieType !== 'd20') {
            var total = 0;
            output.forEach((number) => {
                total += number;
            });
            return total;
        } else {
            return output;
        }
    }

    doesPlayerHaveCharacter(username) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        if (!PlayerData[username] && username !== 'The West Marches') {
            return false;
        } else { 
            return true;
        }
    }

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

    sendStatsAndConfirmation(message) {
        this.sendStats(message);
        this.sendConfirmStats(message);
    }

    sendStatsNowConfirmed(author) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));

        const now = new Date();
        author.send(`You have now rerolled your stats 3 times, the below set will now ` +
        `automatically be confirmed for ${PlayerData[author.username].CharacterName}`)
        .then(() => {
            console.log(`${now}: Confirming stats for ${PlayerData[author.username].CharacterName}`);
            this.confirmStats(author);
        }).catch(console.error);

        this.sendStats(author);
    }

    sendStatsAlreadyConfirmed(author) {
        const now = new Date();
        author.send(`Stats have already been confirmed`).then(() => {
            console.log(`${now}: Informing ${author.username} that stats have already been confirmed`);
        }).catch(console.error);
    }
    
    sendStats(author) {
        const now = new Date();
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
            var embed = new Discord.RichEmbed();
            let username = author.username;

            embed.setTitle(`New Stats for ${PlayerData[username].CharacterName}`)
                .setColor(EMBED_COLOR)
                .addField('Strength', PlayerData[username].StatScore.Strength)
                .addField('Dexterity', PlayerData[username].StatScore.Dexterity)
                .addField('Constitution', PlayerData[username].StatScore.Constitution)
                .addField('Intelligence', PlayerData[username].StatScore.Intelligence)
                .addField('Wisdom', PlayerData[username].StatScore.Wisdom)
                .addField('Charisma', PlayerData[username].StatScore.Charisma);
            
            author.send(embed).then(() => {
                console.log(`${now}: Sending stats to ${username}`);
            }).catch(console.error);
    }

    sendConfirmStats(message) {
        if (this.checkIfCharacterExistsAndSendMessage(message)) {
            const now = new Date();
            var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
            let username = message.author.username;

            const rerollsRemaining = 3 - PlayerData[username].StatScore.Rerolls
            if (rerollsRemaining < 3) {
                message.author.send('If you like the below stats, please reply with !confirmStats. ' +
                    `Otherwise, please !rollStats again. You have ${rerollsRemaining} uses remaining.`)
                    .then(() => {
                        console.log(`${now}: Sending reroll prompt to ${message.author.username}`);
                    }).catch(console.error);
            }
        }
    }

    checkIfCharacterExistsAndSendMessage(message) {
        if(!this.doesPlayerHaveCharacter(message.author.username)) {
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
}