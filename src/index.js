const {ApolloServer} = require('apollo-server');
const fs = require('fs');
const path = require('path');
const {PrismaClient} = require('@prisma/client')
const {PubSub} = require('apollo-server')

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const User = require('./resolvers/user')
const Link = require('./resolvers/link')
const {getUserId} = require('./utils')



const pubsub = new PubSub()

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
   Query,
   Mutation,
   User,
   Link

}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({req}) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId:
                req && req.headers.authorization ? getUserId(req) : null

        };
    }
})

server
    .listen()
    .then(({url}) => console.log(`Server is running on ${url}`));
