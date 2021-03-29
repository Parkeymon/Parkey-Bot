module.exports = {
    name: 'ping',
    description: 'basic ping command',
    execute(message, args){
        message.channel.send('pong!');
    }
}