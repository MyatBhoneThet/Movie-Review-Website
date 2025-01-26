// redirect page (eg. contact_us keyword redirects contact page)
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    let filename;
    switch (req.url) {
        case '/':
            filename = 'home.html';
            res.statusCode = 200;
            break;
        case '/contact':
            filename = 'contact.html';
            res.statusCode = 200;
            break;
        case '/contact-us':
            res.setHeader('Location', '/contact'); // rediects to conatct page
            res.statusCode = 301;
            break;
        case '/about':
            filename = 'about.html';
            res.statusCode = 200;
            break;
        default:
            filename = '404.html';
            res.statusCode = 404;
            break;
    }

    res.setHeader('Content-type', 'text/html');
    fs.readFile('./docs/' + filename, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    }); // content type;

})

server.listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000.');
})