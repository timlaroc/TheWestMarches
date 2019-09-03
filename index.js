// import Encounters from './encounters.js';
const Character = require('./src/Characters/character');
const Discord = require('discord.js');
const Help = require('./src/help');

// bot setup
const bot = new Discord.Client();
const token = 'NjE1OTc2NDgyMjc5MjYwMTYw.XWV22Q.Jcat0-PBAyScxia2_SnR1HzgQ_s';
const PREFIX = '!';

bot.on('ready', () => {
    const now = new Date();
    console.log(`${now}: Bot is on and ready.`);
});

bot.on('guildCreate', () => {
    // setup text channel for "bulletin board"
    // setup other text channels
});

bot.on('message', (message) => {
    const args = message.content.substring(PREFIX.length).split(' ');
    const character = new Character(message.author, false);
    const help = new Help();

    switch (args[0]) {
        // character creation commands
        case 'createCharacter':
            const newCharacter = new Character(message.author, true);
            newCharacter.sendGreeting(message);
            break;
        case 'setName':
            if (args[1]) {
                args.shift();
                character.setName(message.author, args);
            } else {
                help.sendBadCommandFormat(message, 'setName');
            }
            break;
        case 'rollStats':
            character.rollStats(message.author);
            character.sendStatsAndConfirmation(message);
            break;
        case 'confirmStats':
            character.confirmStats(message.author);
            break;
        case 'selectClass':
            if (args[1]) {
                character.selectClass(message.author, args[1]);
            } else {
                help.sendBadCommandFormat(message, 'selectClass');
            }
            break;
        case 'classList':
            character.sendClassList();
            break;
        case 'chooseRace':
        case 'chooseBackground':

        // stat commands
        case 'dexterity':
        case 'strength':
        case 'constitution':
        case 'wisdom':
        case 'charisma':
        case 'intelligence':

        // roll skill
        case 'roll':

        // accepting a quest

        // help command
        case 'help':
            if (args[1]) {
                help.helpMessage(args[1]);
            } else {
                help.sendBadCommandFormat(message, 'help');
            }
    }
});

bot.login(token);