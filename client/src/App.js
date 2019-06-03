import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
import { ApolloProvider } from 'react-apollo';
//react-apollo binds apollo to react

//apollo client set up

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql' //endpoint were making request to queries to
});

class App extends Component {
  render() {
    return (
      //apollo provider wraps the application and injects whatever data we receive from the server into the applicaiton
      //this is done by warpping the div below in apolloprovider tags
      //client ={client} is a way to dynamically allicate the 'client' that apollo
      //will be getting data from

      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
          <AddAuthor />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
