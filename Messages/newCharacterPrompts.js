export default class NewCharacterPrompts {
    constructor () {
        console.log('Do a thing.');
    }

    method (sendGreeting) {
        message.author.send('Welcome to the West Marches, a D&D 5e game! I will be helping you through your character creation process.')
        .then( () => {
            let now = new Date();
            console.log(`${now}: Greeting message sent to ${message.author.username}`);
        })
        .catch(console.error);
    }
}