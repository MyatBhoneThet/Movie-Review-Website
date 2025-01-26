const fs = require('fs');

// read file
// fs.readFile('./docs/user.txt', (error, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// })

// write
// fs.writeFile('./docss/user.txt', 'Hello World', (error) => {  //file path, data, call back function
//     if (error) {
//         console.log(error);
//     }
// })

// fs.writeFile('./docs/user.txt', 'Hello World', (error) => {  //file path, data, call back function
//     if (error) {
//         console.log(error);
//     }
//     console.log("line 2"); // and then this line
// })

// console.log("line 1"); // this line execute first

// checking if file exist or not
// if (!fs.existsSync('./docs/user.txt')) {
//     fs.writeFile('./docs/user.txt', 'Hello World', (error) => {  //file path, data, call back function
//         if (error) {
//             console.log(error);
//         }
//         console.log("hello"); // and then this line
//     })
// } else {
//     console.log("file exists");
// }

// delete file
// fs.unlink('./docs/user1.txt', (error) => {
//     if (error) {
//         console.log(error);
//     }
//     console.log("file deleted")
// })

// folder creation
// fs.mkdir("./new_doc", (error) => {
//     if (error) {    
//         console.log(error);
//     } else {
//     console.log("folder created");
//     }
// })

// // folder delete
// fs.rmdir("./new_doc", (error) => {
//     if (error) {    
//         console.log(error);
//     } else {
//     console.log("folder deleted");
//     }
// })