// const { Timestamp } = require('mongodb');
// const mongoose = require('mongoose'); // calling mongoose
// const BlogSchema = mongoose.Schema({ // building a schema
//     title: {
//         type: String,
//         require: true
//     },
//     author: {
//         type: String,
//         require: true
//     },
//     review: {
//         type: String,
//         require: false
//     },
//     rating: {
//         type: String,
//         require: false
//     }
// }, {timestamps: true})

// //using 'mongoose.Schema()' method, create a blog model
// const Blog = mongoose.model('Blog', BlogSchema) // convention = singular and Capitalize

// module.exports = Blog;

const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    review : {
        type : String,
        required : true
    },
},{timestamps:true})

const Blog = mongoose.model('Blog',BlogSchema);//blogs
module.exports = Blog;