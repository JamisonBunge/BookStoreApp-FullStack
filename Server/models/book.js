const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    //pass through an object that desrcribes how the data will be stored
    name: String,
    genre: String,
    authorId: String,
    //we dont need to declare ID and author ID because mongoDB will crease these
    //by itself
    //this is about telling the DB what info is being sored


});

module.exports = mongoose.model('Book',bookSchema)

//making the model (collection) called 'Book' that has objects
//inside of it that look like bookSchema
//we export this.
