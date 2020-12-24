async function post(parent, args, context, info) {
    const userId = getUserId(context)

    const newLink = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId}},
        }

    })
    context.pubsub.publish("NEW_LINK", newLink)

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

module.exports = {
    updateLink,
    deleteLink,
    post
}
