module.exports = class NewCharacterPrompts {
  sendGreeting(message) {
    message.author.send('Welcome to the West Marches, a D&D 5e game! ' + 
      'I will be helping you through your character creation process. ' +
      'Please use the below commands to create your character.')
      .then(() => {
        const now = new Date();
        console.log(`${now}: Greeting message sent to ${message.author.username}`);
      }).catch(console.error);
  }
};