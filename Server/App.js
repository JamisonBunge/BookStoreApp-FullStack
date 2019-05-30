const express = require('express')
const graphqlHTTP = require('express-graphql')
const  schema = require('./schema/schema.js')
const app = express();

//set up middlewhwere

app.use('/graphql',graphqlHTTP({
    //empty object, to pass perams
    schema,
    graphiql: true
}));
//on the route of /graphql, the funciton graphqlHTTP is called to handle the request


app.listen(4000, () => {console.log('listening for requests at port  4000')})
