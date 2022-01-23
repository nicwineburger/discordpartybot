// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./auth.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

// Get general channel by ID
const generalID = '365275098229506049';
const coolZoneID = '715920210892161046';
const mordorRoleID = '822523543581229086';
const partyBotID = '711729568519684159'



client.on("voiceStateUpdate", (oldState, newState) => {
    const genChannel = client.channels.cache.get(generalID);
    const coolZone = client.channels.cache.get(coolZoneID); 
    console.log("voice state changed");
    
  
    if (oldState.channelId !== coolZoneID && newState.channelId === coolZoneID) {
        let memberCount = coolZone.members.size;
        if (memberCount > 4) {
            genChannel.send("<@&" + partyBotID + ">" + ": there are " + memberCount + " people in The Cool Zone!");
        }

    }
})