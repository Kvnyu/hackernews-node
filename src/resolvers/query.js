function feed(parent, args, context){
    feed = context.prisma.link.findMany()
    return feed
}

async function link (parent, args, context) {
    link = await context.prisma.link.findFirst({
            where: {id: parseInt(args.id)},
        })
    return link
}

module.exports({
    info,
    feed,
    link
})
