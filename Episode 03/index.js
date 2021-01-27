const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command) 
}

const { prefix, token } = require('./config.json')
const welcome = require('./commands/welcome'); // Add This


client.once('ready', () => {
    console.log('Ready.')
    welcome(client) // Add This
})

client.on('message', message => {
    if(!message.content.startsWith(prefix)||message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args)
    } else if(command === 'yt'){
        client.commands.get('yt').execute(message, args)
    } else if(command === 'purge'){
        client.commands.get('purge').execute(message, args)
    }
})

client.login(token)