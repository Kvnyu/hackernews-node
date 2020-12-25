
async function postedBy(parent,args,context){
    let user = await context.prisma.link.findUnique({where:{id:parent.id}}).postedBy()

    return user
}

module.exports = {
    postedBy,
}

//the postedBy is a function that links to the related table and retrieves the related user object to that instance
//it is a function as it is not the immediate result that you are seeking when executing this graphql query
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
//Just as usually the attributes of a table have their access functioned defined automatically,
//When we have an attribute that references another table, the prisma doesn't know how to generate this
//Access function, so we have to do it ourselves.
//e.g link would have defined:
// //Link:{
// id:(parent) => parent.id,
// descriptionL (parent) => parent.description,
// url: (parent) => parent.url,
// }
// }
// THis is the same, but instead for the postedBy attribute
