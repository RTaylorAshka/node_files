const fs = require('fs');
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR: ", err, " with PATH: ", path)
            process.exit(1)
        }
        console.log(data)

    
    })
}

async function webCat(url) {
    try {
        res = await axios.get(url)
        console.log(res.data)
    } catch (err){
        console.log("ERROR: ", err, " with URL: ", url)
        process.exit(1)
    }

    
}




let path;


path = process.argv[2]

try {
    const url = new URL(path)
    webCat(url)
} catch {
    cat(path)
}
