// var fs = require("fs")
// var myObj = {}


// function doA() {
//     return new Promise(function (resolve, reject) {
//         fs.readFile("package.json", (err, data) => {
//             if (!err) {
//                 resolve(myObj['data2'] = data.toString())
//             }
//         })

//     })

// }


// function doB() {
//     return new Promise(function (resolve, reject) {
//         fs.readFile("package.json", (err, data2) => {
//             if (!err) {
//                 resolve(myObj['data2'] = data2.toString())
//             }
//         })

//     })
// }


// doA().then(function (data) {
//     myObj['data1'] = data
//     doB().then(function (data2) {
//         myObj['data2'] = data2
//         console.log(myObj);
//     })
// })

