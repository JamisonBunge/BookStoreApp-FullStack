import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


class AddBook extends Component {

    constructor(props) {
        super(props);
        //this is the inital state of the form as nothing is 'by default' entered in this form
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    displayAuthors() {
        var data = this.props.getAuthorsQuery;

        //  console.log(this.props)
        if (data.loading) {
            return <option disabled>Loading authors...</option>
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id} >{author.name}</option>)
            })
        }
    }

    submitForm(e) {
        //prevent the default 'refresh' behavior from happening
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            //after adding this we want to tell apollo to reefatch queries
            refetchQueries: [{ query: getBooksQuery }]
        })
        // console.log(this.state)
    }

    render() {  //you bing this so that the target of the funciton is itself
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })} >
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);