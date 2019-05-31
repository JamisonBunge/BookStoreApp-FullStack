const express = require('express')
const graphqlHTTP = require('express-graphql')
const  schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb+srv://admin:thisismypassword@cluster0-hiujx.mongodb.net/test'); 
mongoose.connection.once('open',() => {
    console.log('connected to the DB');
}); 

//set up middlewhwere

app.use('/graphql',graphqlHTTP({
    //empty object, to pass perams
    schema,
    graphiql: true
}));
//on the route of /graphql, the funciton graphqlHTTP is called to handle the request


app.listen(4000, () => {console.log('listening for requests at port  4000')})
