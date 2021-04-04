var counter = 0;

module.exports = {
    name: 'count',
    execute(message, args){
        counter += 1;

        message.channel.send(`The counter is at ${counter}`)
    }
}