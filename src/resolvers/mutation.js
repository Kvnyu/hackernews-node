const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function post(parent, args, context, info) {
    const {userId} = context

    const newLink = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId}},
        }

    })
    context.pubsub.publish("NEW_LINK", newLink)
    //What happens here is that when post gets called, the subscription with key "new_link" gets sent a payload,
    //the newLink object. This object then gets sent out to all clients that have subscribed to the "NEW_LINK" subscription
    context.pubsub.publish("NEW_VOTE", newLink)
    return newLink
}

async function updateLink(parent, args, context) {
        const link = await prisma.link.update({
            where: {id: parseInt(args.id)},
            data:{
                description: args.description,
                url: args.url,
            }
        })
        return link

}

async function deleteLink(parent, args, context) {
    const link = await prisma.link.delete({
            where: {id:parseInt(args.id)}
    })
    return link
        // let links = links.filter((link) => !(link.id = id) )
}

async function signup(parent, args, context,info){
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.user.create({data: {...args,password}})

    const token = jwt.sign({userId:user.id}, APP_SECRET)

    return {
        token,
        user
    }



}

async function login(parent, args, context,info) {
    const user = await context.prisma.user.findUnique({where : {email:args.email}})
    if (!user){
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')

    }

    const token = jwt.sign({userId:user.id}, APP_SECRET)
    //Send the client a token encrypted with their userID and the app_secret string
    return {
        token,
        user
    }

}


async function vote(parent, args, context, info) {
    //First we want to check that the vote doesn't exist:
    const userId = getUserId(context)
    const vote = await context.prisma.vote.findUnique({
        where:{
            //linkId_userId is how you filter with multiple attributes
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    })

    if(Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }


    const newVote = await context.prisma.vote.create({
        data: {
            user: { connect:{id: userId}},
            link: { connect:{id: Number(args.linkId)}}

        }
    })
    //Use connect when you are adding an entry that is a foreign key and refers to an entry in another table
    console.log(newVote)
    context.pubsub.publish("NEW_VOTE", newVote)
    return newVote


}


module.exports = {
    updateLink,
    deleteLink,
    post,
    signup,
    login,
    vote
}
