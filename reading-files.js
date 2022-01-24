import {promises as fs} from "fs";


fs.readFile("foon","utf-8").then(content => {
    console.log(content)
})

fs.readFile("some.json","utf-8").then(content => {
    console.log(JSON.parse(content))
})