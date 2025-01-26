const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const Blog = require('./models/Blog');

const app = express();

app.use(express.urlencoded({extended:true}));

//db url
let mongoUrl = "mongodb+srv://Steve:14112002@cluster0.ccmfqqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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

let logging_method = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} --`);
    next();
}
app.use(logging_method);

app.get('/add-blog',async (req,res) => {
    let blog = new Blog({
        title : "Interstellar",
        author : "Christopher Nolan",
        review : "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
    });

    await blog.save();
    res.send('blog saved');
})
app.get('/single-blog',async (req,res) => {
    let blog = await Blog.findById('6677a1d170a54fc984198eb1');
    res.json(blog);
})

app.post('/blogs/:id/delete', async(req,res,next) => { // blog delete route
    try{
        let id = req.params.id;
        await Blog.findByIdAndDelete(id);
        res.redirect('/');
    } catch(e){
        console.log(e);
        next();
    }
})

app.post('/blogs/:id', async(req,res,next) => {
    try{
        let id = req.params.id;
        let blog = await Blog.findById(id);
        res.render('blogs/show', {
            blog,
            title: "Blog detail"
        })
    } catch(e){
        console.log(e);
        next();
    }
})

app.get('/',async (req,res) => {
    let blogs = await Blog.find().sort({createdAt : -1});
    res.render('home',{
        blogs,
        title : "Home"
    })
});

app.post('/blogs',async (req,res) => {
    let {title,author,review} = req.body;

    let blog = new Blog({
        title,
        author,
        review
    });

    await blog.save();

    res.redirect('/');
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

app.get('/blogs/create',(req,res) => {
    res.render('blogs/create-blog', {
        title : 'Blog Create'
    });
});

app.use((req,res)=> {
    res.status(404).render('404', {
        title : "404 Not Found"
    });
});