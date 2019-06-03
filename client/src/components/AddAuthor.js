import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery, addAuthorMutation } from '../queries/queries';


class AddAuthor extends Component {
    //keep track of state with a constructor
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        }
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: this.state.age
            },
            refetchQueries: [{ query: getAuthorsQuery }]

        })


    }

    //TODO: error checking on the num input of age

    render() {
        return (
            <form id='add-author' onSubmit={this.submitForm.bind(this)} >
                <div className='field'>
                    <label>Author Name:</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Age:</label>
                    <input type="text" onChange={(e) => this.setState({ age: e.target.value })} />

                </div>
                <button>+</button>

            </form>






        );
    }
}

export default compose(
    graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);