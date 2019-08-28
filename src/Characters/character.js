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
                    Proficient: false,
                    Expertise: false
                },
                AnimalHandling: {
                    Stat: 'Wisdom',
                    Proficient: false,
                    Expertise: false
                },
                Arcana: {
                    Stat: 'Intelligence',
                    Proficient: false,
                    Expertise: false
                }, 
                Athletics: {
                    Stat: 'Strength',
                    Proficient: false,
                    Expertise: false
                },
                Deception: {
                    Stat: 'Charisma',
                    Proficient: false,
                    Expertise: false
                },
                History: {
                    Stat: 'Intelligence',
                    Proficient: false,
                    Expertise: false
                },
                Insight: {
                    Stat: 'Wisdom',
                    Proficient: false,
                    Expertise: false
                },
                Intimidation: {
                    Stat: 'Charisma',
                    Proficient: false,
                    Expertise: false
                },
                Investigation: {
                    Stat: 'Intelligence',
                    Proficient: false,
                    Expertise: false
                },
                Medicine: {
                    Stat: 'Wisdom',
                    Proficient: false,
                    Expertise: false
                },
                Nature: {
                    Stat: 'Intelligence',
                    Proficient: false,
                    Expertise: false
                },
                Perception: {
                    Stat: 'Wisdom',
                    Proficient: false,
                    Expertise: false
                },
                Performance: {
                    Stat: 'Charisma',
                    Proficient: false,
                    Expertise: false
                },
                Persuasion: {
                    Stat: 'Charisma',
                    Proficient: false,
                    Expertise: false
                },
                Religion: {
                    Stat: 'Intelligence',
                    Proficient: false,
                    Expertise: false
                },
                SleightOfHand: {
                    Stat: 'Dexterity',
                    Proficient: false,
                    Expertise: false
                },
                Stealth: {
                    Stat: 'Dexterity',
                    Proficient: false,
                    Expertise: false
                },
                Survival: {
                    Stat: 'Wisdom',
                    Proficient: false,
                    Expertise: false
                }
            },
            SavingThrow: {
                Strength: {
                    Stat: 'Strength',
                    Proficient: false
                },
                Dexterity: {
                    Stat: 'Dexterity',
                    Proficient: false
                },
                Constitution: {
                    Stat: 'Constitution',
                    Proficient: false
                },
                Wisdom: {
                    Stat: 'Wisdom',
                    Proficient: false
                },
                Intelligence: {
                    Stat: 'Intelligence',
                    Proficient: false
                },
                Charisma: {
                    Stat: 'Charisma',
                    Proficient: false
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