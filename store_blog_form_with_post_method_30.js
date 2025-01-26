// store_blog_form_with_post_method_30
// store blog data in the back-end(mongodb), then showing them in the home page
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true })) // this will pass the data from the blog create form

const express_layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
let mongoUrl = "mongodb+srv://Steve:14112002@cluster0.ccmfqqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to mongo database');
    app.listen(3000,() => {
        console.log('App is running on port 3000')
    });
}).catch(err => {
    console.log(err)
});

app.set('views', './docs');
app.set('view engine', 'ejs');
app.use(express_layouts);

app.set('layout', 'layouts/default');

app.get('/add-blog', async(req, res) => {
    let blog = new Blog({
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        review: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.'
    });
    await blog.save();
    res.send('blog saved');
})

app.get('/single-blog', async(req, res) => {
    let blog = await Blog.findById('66711e90d4dabd97428db2ce')
    res.json(blog);
})

let logging_method = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} --`);
    next();
}
app.use(logging_method);

app.use(express.static('public'))

app.get('/', async(req, res) => {
    let fantasy_movies = await Blog.find().sort({sortedAt: -1});
    console.log(fantasy_movies);

    res.render('home', {
        name: 'Myat',
        age: 21,
        fantasy_movies,
        title: 'Home'
    });
})

// making a new route '/blogs'
app.post('/blogs', async(req, res) => { // when user press 'create' button, will enter '/blog' with method
    console.log(req.body);
    let {title, author, review} = req.body; // destructuring the data into sub-titles
    let blog = new Blog({ // to store the data in back-end
        title: title,
        author: author,
        review: review // abbreviation of upper ones
    });
    await blog.save();
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Conact"
    });
});
app.get('about-us', (req, res) => {
    res.redirect('/about', {
        title: 'About'
    });
})

//creating a route
app.get('/blogs/create', (req,res) => {
    res.render('blogs/create', {
        title: 'Blog create'
    });
})

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Error'
    });
})