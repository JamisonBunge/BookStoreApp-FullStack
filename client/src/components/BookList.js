import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import { getBooksQuery } from '../queries/queries';


//components
import BookDetails from './BookDetails'

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null //this keeps track of the ID of an individual item
        }
    }

    displayBooks() {
        var data = this.props.data;
        if(data.loading) {
            return<div>Loading books...</div>
        } else {
            //data is ready, map to html and return it
            return data.books.map(book => {
                //map cycles through the array, 
                //each time it hits it trigger this funciton
                //it takes that book, grabs the name and places it inside an li tag
                return(
                    <li key={book.id} onClick={e => this.setState({selected: book.id})}> {book.name} </li>
                )
            })
            
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                    <BookDetails  bookId={this.state.selected}/>
                </ul>
            </div>
        );
    }
}


//bind booklist to getbooksquery 
//the query result is stored in props
export default graphql(getBooksQuery)(BookList);


//how to make a query

//construct one, ( the getbooksQuery const)

//bind it to the component

//remeber graphQL is NOT js

