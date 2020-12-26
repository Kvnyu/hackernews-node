async function link(parent, args, context) {
//    Since this is called by the parent vote, we get the id from parent
    return context.prisma.vote.findUnique({where: {id: parent.id}}).link()
}

async function user(parent, args, context){
    return context.prisma.vote.findUnique({where: {id: parent.id}}).user()
}

module.exports = {
    link,
    user
}
