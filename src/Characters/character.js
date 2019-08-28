const Discord = require('discord.js');
//const CharacterRace = require('./characterRace.js');
const fs = require('fs');

const CHAR_DATA = './src/Storage/CharacterData.json';

module.exports = class Character {
    constructor(playerName) {
        var PlayerData = JSON.parse(fs.readFileSync(CHAR_DATA));
        if(!PlayerData[playerName]) PlayerData[playerName] = {
            CharacterName: '',
            Race: '',
            Class: '',
            Alignment: '',
            Background: {
                // fill in with ideals, bonds, etc.
            },
            StatScore: {
                Strength: 10,
                Dexterity: 10,
                Constitution: 10,
                Wisdom: 10,
                Intelligence: 10,
                Charisma: 10
            },
            Health: {
                MaximumHitPoints: 0,
                CurrentHitPoints: 0,
                MaximumHitDice: 1,
                CurrentHitDice: 1,
                DeathSaves: {
                    Failures: 0,
                    Successes: 0
                }
            },
            Skill: {
                Acrobatics: {
                    Stat: 'Dexterity',
                    Proficient: false
                },
                AnimalHandling: {
                    Stat: 'Wisdom',
                    Proficient: false
                },
                Arcana: {
                    Stat: 'Intelligence',
                    Proficient: false
                }, 
                Athletics: {
                    Stat: 'Strength',
                    Proficient: false
                },
                Deception: {
                    
                }
            }
        }

        fs.writeFile(CHAR_DATA, JSON.stringify(PlayerData), (err) => {
            if (err) console.error(err);
        });
    }

    // this is going to need to be an embed
    displayCharacter() { console.log('we got there :)'); }
}