// 1) Build Schema
//A schema can have an arbitrary number of fields — each one represents a 
// field in the documents stored in MongoDB. An example schema showing many 
// of the common field types and how they are declared is shown below.
var schema = new Schema(
    {
        name: String,
        binary: Buffer,
        living: Boolean,
        updated: { type: Date, default: Date.now() },
        age: { type: Number, min: 18, max: 65, required: true },
        mixed: Schema.Types.Mixed,
        _someId: Schema.Types.ObjectId,
        array: [],
        ofString: [String], // You can also have an array of each of the other types too.
        nested: { stuff: { type: String, lowercase: true, trim: true } }
    })

OR


var breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water',]
    }
});




//2)Creating and modifying documents
var awesome_instance = new SomeModel({ name: 'awesome' });
awesome_instance.save(function (err) {
    if (err) return handleError(err);
    // saved!
});

OR

SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
    if (err) return handleError(err);
    // saved!
});





//3) Searching for records
var Athlete = mongoose.model('Athlete', yourSchema);

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ 'sport': 'Tennis' }, function (err, athletes) {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
})


OR


// find all athletes that play tennis
var query = Athlete.find({ 'sport': 'Tennis' });

// selecting the 'name' and 'age' fields
query.select('name age');

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec(function (err, athletes) {
    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
})

OR


Athlete.
    find().
    where('sport').equals('Tennis').
    where('age').gt(17).lt(50).  //Additional where query
    limit(5).
    sort({ age: -1 }).
    select('name age').
    exec(callback); // where callback is the name of our callback function.




//4) Working with related documents — population
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var authorSchema = Schema({
    name: String,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String
});

var Story = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);


//We can save our references to the related document by assigning the _id value. 
//Below we create an author, then a story, and assign the author id to our story's author field.

var bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
    if (err) return handleError(err);

    //Bob now exists, so lets create a story
    var story = new Story({
        title: "Bob goes sledding",
        author: bob._id    // assign the _id from the our author Bob. This ID is created by default!
    });

    story.save(function (err) {
        if (err) return handleError(err);
        // Bob now has his story
    });
});


//Our story document now has an author referenced by the author document's ID. 
//In order to get the author information in the story results we use populate(), as shown below.
Story
    .findOne({ title: 'Bob goes sledding' })
    .populate('author') //This populates the author id with actual author information!
    .exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The author is %s', story.author.name);
        // prints "The author is Bob Smith"
    });

//A better way is to get the _id of our author, then use find() to search for this in the 
// author field across all stories
Story
    .find({ author: bob._id })
    .exec(function (err, stories) {
        if (err) return handleError(err);
        // returns all stories that have Bob's id as their author.
    });



//5)One schema/model per file
// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string          : String,
  a_date            : Date,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema );

//other file
//You can then require and use the model immediately in other files. 
//Below we show how you might use it to get all instances of the model.

//Create a SomeModel model just by requiring the module
var SomeModel = require('../models/somemodel')

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function);