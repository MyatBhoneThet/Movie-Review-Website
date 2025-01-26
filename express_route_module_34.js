// putting all the routes in a folder namely routes, and a file blogRoutes.js
// create blogRoutes file and put all the routes of '/blogs'
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const blogRoutes = require('./routes/blogRoutes');

const Blog = require('./models/Blog');

const app = express();

app.use(express.urlencoded({extended:true}));

//db url
let mongoUrl = "mongodb+srv://Steve:14112002@cluster0.ccmfqqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to db')
    app.listen(3000,() => {
        console.log('app is running on port 3000');
    })
}).catch(e => {
    console.log(e)
})

app.set('views', './docs')
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');

app.use(express.static('public'))

app.get('/add-blog',async (req,res) => {
    let blog = new Blog({
        title : "Interstellar",
        author : "Christopher Nolan",
        review : "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
    });
    await blog.save();
    res.send('blog saved');
})

app.get('/',async (req,res) => {
   res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    res.render('about', {
        title : "About"
    });
});

app.get('/contact',(req,res) => {
    res.render('contact', {
        title : 'Contact'
    });
});

app.use('/blogs',blogRoutes);

app.use((req,res)=> {
    res.status(404).render('404', {
        title : "404 Not Found"
    });
});