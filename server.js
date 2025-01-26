// creating a server
// with specific we search on browser, it goes to the related project folder. server listens to the request with a specific language in which the project folder is written in. give respective responses based on requests
const http = require('http'); // inputting 'http' module
const server = http.createServer((req, res) => { // create server with call-back function(in, out)
    // console.log('request made from client');
    res.setHeader('Content-type', 'text/html'); // content type
    res.write('<h1> Hello World </h1>'); // text appeared on the page
    res.write('<p> Hi there </p>')
    res.end() // to terminate the response from the server

})

server.listen(3000, 'localhost', () => { // (..., domain/hostname) localhost address = 127.0.001
    console.log('Server listening on port 3000.');
})
// control + C to terminate the server