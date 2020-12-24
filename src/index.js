const {ApolloServer} = require('apollo-server');
const fs = require('fs');
const path = require('path');
const {PrismaClient} = require('@prisma/client')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
    Query: {
        info: () => "This is a Hackernews clone",
        feed: () => async (parent, args, context) => {
            feed = await context.prisma.link.findMany()
            return feed
        },
        link: async (parent, args, context) => {
            link = await context.prisma.link.findFirst({
                    where: {id: parseInt(args.id)},
                }
            )
            return link

        }
    },
    Mutation: {
        post: async (parent, args, context) => {
            const link = await prisma.link.create({
                data: {
                    description: args.description,
                    url: args.url
                }
            })
            return link
        },
        updateLink: async (parent, args, context) => {
            const link = await prisma.link.update({
                where: {id: parseInt(args.id)},
                data:{
                    description: args.description,
                    url: args.url,
                }
            })
            return link

        },
        deleteLink: async (parent, args, context) => {
            const link = await prisma.link.delete({
                where: {id:parseInt(args.id)}
            })
            return link
           // let links = links.filter((link) => !(link.id = id) )
        }
    }

}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({url}) => console.log(`Server is running on ${url}`));
