//IMPORTS
const express = require('express')                  //express nodejs framework
const graphqlHTTP = require('express-graphql')      //make express understand graphql
const schema = require('./schema/schema.js')        //defines graph scehma for gql
const mongoose = require('mongoose')                //connecting to remote mongoDB
const cors = require('cors');                       //

//init the app
const app = express();

//allow cross-origin requres
app.use(cors());


//connect to the databse
mongoose.connect('mongodb+srv://admin:thisismypassword@cluster0-hiujx.mongodb.net/test');
mongoose.connection.once('open', () => {
    console.log('connected to the DB');
});

//set up middlewhwere
app.use('/graphql', graphqlHTTP({
    //on the route of /graphql, the funciton graphqlHTTP is called to handle the request
    schema,
    graphiql: true
}));



app.listen(4000, () => { console.log('listening for requests at port  4000') })
