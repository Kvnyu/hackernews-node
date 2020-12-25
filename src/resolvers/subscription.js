function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    },
}


module.exports = {
    newLink,
}

// https://www.youtube.com/watch?v=_r2ooFgBdoc&ab_channel=BenAwad
