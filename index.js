//import Encounters from './encounters.js';
// const Character = require('./Characters/character.js');
import NewCharacterPrompts from './Messages/newCharacterPrompts.js';
const Discord = require('discord.js');

// bot setup
const bot = new Discord.Client();
const token = 'NjE1OTc2NDgyMjc5MjYwMTYw.XWV22Q.Jcat0-PBAyScxia2_SnR1HzgQ_s';
const PREFIX = '!';

bot.on('ready', () => {
    console.log('Ready to march on the west');
});

bot.on('guildCreate', () => {
    // setup text channel for "bulletin board"
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    let prompts = NewCharacterPrompts();

    switch (args[0]) {
        // character creation commands
        case 'createCharacter':
            // character = new Character(message.member.displayName);
            prompts(sendGreeting);
            break;
        case 'rollStats':
        case 'chooseClass':
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