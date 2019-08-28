const Discord = require('discord.js');
const CharacterRace = require('./characterRace.js');

class Character {
    Character(playerName) {
        var PlayerName = playerName;
        var CharacterName = new String();
        var Race = new CharacterRace();
        var Class = new CharacterClass();
        var Alignment = new String();
        var Background = new CharacterBackground();
    }
}

module.exports = Character;