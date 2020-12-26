function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
    //The string acts as a key
    //Whenever we want the newLinkSubscribe event to be triggered we can call pubsub.publish
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    },
}

function newVoteSubscribe(parent, args, context, info){
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        console.log(payload)
        return payload
    }
}

module.exports = {
    newLink,
    newVote
}

// https://www.youtube.com/watch?v=_r2ooFgBdoc&ab_channel=BenAwad
// We first have to create a subscription that can be queried so that clients can subscribe
// The server does have to keep state
