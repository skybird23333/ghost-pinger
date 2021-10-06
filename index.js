const discord = require('discord.js')
const intent = new discord.Intents(513);
const client = new discord.Client({intents: intent})
require('dotenv')

const {token, configMessage, guild, duration, owner} = require(process.env)

client.on('ready', ()=> {
    console.log('logged on')
})

var stats = {
    pings: 0,
    started: false
}

client.on('messageCreate', async message => {
    if(message.author.id === owner && message.content === "!jarvis, activate the sus") {
        message.react("🥵")
        const server = await client.guilds.fetch(guild)
        const channels = (await server.channels.fetch()).filter(c => c.type === "GUILD_TEXT")
        if(stats.started) return message.channel.send('bot already started kk')
        console.log('sus activated')
        const channel = Array.from(channels)[Math.floor(Math.random()*Array.from(channels).length)][1];
        stats.started = true
        console.log(channel)
        channel.send(configMessage)
        console.log(`Pinged: ${channel.name} - ${new Date()}`)
        stats.pings++
        setInterval(
            () => {
                const channel = Array.from(channels)[Math.floor(Math.random()*Array.from(channels).length)][1];
                channel.send(configMessage)
                console.log(`Pinged: ${channel.name} - ${new Date()}`)
                stats.pings++
            }
            , duration | 10000
        )
    } else if(message.author.id === owner && message.content === "!jarvis, how many funny did you do") {
        message.channel.send(`${stats.pings} pings`)
    }
})

client.login(token)
client.login('Njg4NzQyNTM1NDE3NTYxMTU3.Xm4veA.V-IBFjPCib1BMNKgbtcbSf8bNLw')
