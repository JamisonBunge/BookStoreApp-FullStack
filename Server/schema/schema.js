const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList }= graphql;
//es6 disructucting
    //grabs graphql function from package
    //now its stored and can be used.

    //dummy data

    var books = [
        {name: 'The Winds of Winter', genre: 'Fantasy', id: '1', authorId: '1'},
        {name: 'A Game of Thrones', genre: 'Fantasy', id: '2', authorId: '1'},
        {name: 'A Clash of Kings', genre: 'Fantasy', id: '3', authorId: '1'},
        {name: 'The Stranger', genre: '	Philosophical', id: '4', authorId: '3'},
        {name: 'Speaker for the Dead', genre: 'Sci-Fi', id: '5', authorId: '2'},
        {name: 'Enders Game', genre: 'Sci-Fi', id: '6', authorId: '2'}
    ]; 

    var authors= [
        {name: 'George R. R. Martin', age: 22, id: '1'},
        {name: 'Orson Scott Card', age: 24, id: '2'},
        {name: 'Albert Camus', age: 32, id: '3'}
    ];

const BookType = new GraphQLObjectType({
    //function that takes in an object
    name: 'Book',
    fields: () => ({ //feilds is a FUNCTION 
        //this is because when we have multible types,
        //wrapping them in a funciton makes it able for one type to know what another type is
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type:  GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args) {
                //need to grab assosicated author 
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }

        //again, when we have multiple types later on 
        //wrapping this in a function gets rid of reference errors
    })
}); 

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books : {
            //list of book types
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return _.filter(books, {authorId = parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                //code to get data from db / other source 
                
                //grab dummy data 
                return _.find(books, {id: args.id} );
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return _.find(authors, {id: args.id} );
            }
            
        }
    }
    //4 types: graph 1 book, grab all books, grab 1 auther, grab all authors
});
//need to export the schema so we can use it as a module in app.js
module.exports = new GraphQLSchema({
    query: RootQuery
    });