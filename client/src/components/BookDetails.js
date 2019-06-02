import React, { Component } from 'react';
import { graphql } from 'react-apollo'
//import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
import { getBookQuery } from '../queries/queries'


class BookDetails extends Component {

    displayBookDetails() {
        const {book} = this.props.data;
        if(book) {
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className = "other-books">
                        {
                            book.author.books.map(item => {
                                return <li className= "not-it" key={item.id}>{item.name}</li>
                            })
                        }

                    </ul>
                </div>
            )
        } else {
            return (
                <div>No book selected</div>
            )

        }
    }

    render() {
        console.log(this.props)
        return(
            <div id="book-details">
                {this.displayBookDetails()  }
            </div>
        );
    }

}

export default graphql(getBookQuery, {
    options: (props) => {
        //console.log("+++++++++" +props.bookId)
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
//binding this to a component means that whenever this compondent renders this query qill be made