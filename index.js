const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { Mongoose } = require('mongoose');
const config = require('./config.json');
const prefix = config.BotPrefix;
client.commands = new Discord.Collection();

const mongo = require('./mongo')

//Gets commands.
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Log bot is ready and set status.
client.on('ready', async () => {
    client.user.setActivity('nonfunctional lmao', { type: 'PLAYING'});
    console.log('Bot online.');

    //Check mongodb connection
    await mongo().then(mongoose => {
        try {
            console.log('Mongo connected.')
        }  finally {
            mongoose.connection.close()
        }
    });
});

//Command handler. I think? lmao
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().trim().toLowerCase();

    try{
    const handler = client.commands.get(command)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (!command) return;
    if(handler) handler.execute(message, args, Discord, client, prefix);
    }
    catch(error){
        console.error(error);
        message.channel.send('An error occured. Dont @ me.')
    }
});

client.login(config.BotToken);