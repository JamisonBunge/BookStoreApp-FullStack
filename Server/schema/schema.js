const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString}= graphql;
//es6 disructucting
    //grabs graphql function from package
    //now its stored and can be used.

const BookType = new GraphQLObjectType({
    //function that takes in an object
    name: 'Book',
    fields: () => ({ //feilds is a FUNCTION 
        //this is because when we have multible types,
        //wrapping them in a funciton makes it able for one type to know what another type is
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {GraphQLString}
    })
})