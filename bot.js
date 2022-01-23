// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./auth.json');

// Get general channel by ID
const generalID = '365275098229506049';
const coolZoneID = '715920210892161046';
const mordorRoleID = '822523543581229086';
const nicID = '329356329359638530';

// Create a new client instance
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, 
              Intents.FLAGS.GUILD_VOICE_STATES, 
              Intents.FLAGS.GUILD_MEMBERS, 
              Intents.FLAGS.GUILD_PRESENCES],
    fetchAllMembers: true 
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    client.user.setPresence({
        activities: [{ 
          name: "For TheCoolZone parties",
          type: "WATCHING"
        }],
        status: "online"
    })
	console.log('PartyBot is online!');
});

// Login to Discord with your client's token
client.login(token);


client.on("voiceStateUpdate", (oldState, newState) => {
    const genChannel = client.channels.cache.get(generalID);
    const coolZone = client.channels.cache.get(coolZoneID); 
    console.log("voice state changed");
  
    let mordorRole = genChannel.guild.roles.cache.get(mordorRoleID);
    if (oldState.channelId !== coolZoneID && newState.channelId === coolZoneID) {
        let memberCount = coolZone.members.size;
        if (memberCount > 4) {
            genChannel.send(mordorRole.toString() + ": there are " + memberCount + " people in The Cool Zone!\nLet's party!");
        }

    }
})