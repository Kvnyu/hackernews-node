
function links(parent, args, context) {
    return context.prisma.user.findUnique({ wher: {id: parent.id}}).links()
}

module.exports = {
    links,
}
