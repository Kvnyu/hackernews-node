
function links(parent, args, context) {
    return context.prisma.user.findUnique({ where: {id: parent.id}})
}

module.exports = {
    links,
}
