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
            return context.prisma.link.findMany()
        },
        link: (parent, args) => {
            let link = links.filter(
                (link) => (link.id == args.id)
            )
            console.log(link)
            return link[0]
            // console.log(id)
            // console.log( links.filter((link) => link.id = id))
            // return links.filter((link) => link.id = id)[0]

        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url

            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            var updated = false
            updatedLink = {
                id: args.id,
                url: args.url,
                description: args.description
            }
            links.forEach((link) => {
                console.log(link)
                if (link.id == args.id) {
                    link.id = args.id,
                        link.url = args.url,
                    link.description = args.description
                    updated = true
                    return link
                }
                else{
                    return link
                }
            })
            return updated ? updatedLink : "Failed to update"
        },
        deleteLink: (parent, args) => {
           let links = links.filter((link) => !(link.id = id) )
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
