// routing through files using switch method
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    let filename;
    switch (req.url) {
        case '/':
            filename = 'home.html';
            break;
        case '/contact':
            filename = 'contact.html';
            break;
        case '/about':
            filename = 'about.html';
            break;
        default:
            filename = '404.html';
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