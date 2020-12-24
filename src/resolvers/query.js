function info(){return "This is a Hackernews clone"}

async function feed(parent, args, context){
    feed = await context.prisma.link.findMany()
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
