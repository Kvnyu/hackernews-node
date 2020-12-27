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

async function feed (parent, args, context, info){
    const where = args.filter ? {
        OR: [
            {description: { contains: args.filter }},
            {url : {contains: args.filter}},
        ]

    }: {}
    //The above creates the filter for the prisma query
    const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    })

    const count = await context.prisma.link.count({where})

    return {
        links,
        count,
    }
}

module.exports = {
    feed,
    link
}
