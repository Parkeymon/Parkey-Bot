const mongo = require('../mongo')
const welcomeSchema = require('../schemas/welcome-schema')

module.exports = {
    name: 'setwelcome',
    description: 'Sets the welcome.',
    async execute(message, args){

        //Making sure these work
        console.log('Welcome command ran')
        console.log(message.channel.id)

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('You dont have permission to do that!')
            return
        }

        await mongo().then(async mongoose => {
            try {
                await new welcomeSchema({
                    _id: message.guild.id,
                    channelId: message.channel.id,
                    text: message.content,

                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
    }
}