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
                
                if (PlayerData[author.username].StatScore.Rerolls++ === 3) {
                    author.send(`You have now rerolled your stats 3 times, the below set will now ` +
                        `automatically be confirmed for ${PlayerData[author.username].CharacterName}`)
                        .then(() => {
                            console.log(`${now}: Confirming stats for ${PlayerData[author.username].CharacterName}`);
                            this.confirmStats(author);
                        }).catch(console.error);
                }

                fs.writeFileSync(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
                    if (err) console.error(err);
                });
            } else {
                author.send(`Stats have already been confirmed`);
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
}