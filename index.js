// import Encounters from './encounters.js';
const Character = require('./src/Characters/character');
const NewCharacterPrompts = require('./src/Messages/newCharacterPrompts');
const Discord = require('discord.js');

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
    const characterPrompts = new NewCharacterPrompts;
    const character = new Character(message.author);

    switch (args[0]) {
        // character creation commands
        case 'createCharacter':
            characterPrompts.sendGreeting(message);
            break;
        case 'rollStats':
            character.rollStats(message.author.id);
            characterPrompts.sendConfirm(message.author);
            break;
        case 'confirmStats':
            character.confirmStats(message.author);
            break;
        case 'selectClass':
        case 'classList':
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
    }
});

bot.login(token);