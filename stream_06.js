// read files in buffer(chunks)
// const fs = require('fs');
// const read_stream = fs.createReadStream('./docs/lorem.txt');
// read_stream.on('data', function(data) { // listen on data using 'on' method
//     console.log(data); // buffers
//     console.log(data.toString()); // buffers to string
//     console.log('---chunks---');
// })

// copy buffered datas into another file
const fs = require('fs');
const read_stream = fs.createReadStream('./docs/lorem.txt');
const write_stream = fs.createWriteStream('./docs/lorem_copy.txt');
// long form of pipe method
// read_stream.on('data', function(data) {
//     write_stream.write(data.toString());
//     write_stream.write('--chunk---');
// })
read_stream.pipe(write_stream);