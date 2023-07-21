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

        if (outFile) {
            writeOut(data)
        }
    })
}

async function webCat(url) {
    try {
        res = await axios.get(url)
        console.log(res.data)
    } catch (err) {
        console.log("ERROR: ", err, " with URL: ", url)
        process.exit(1)
    }

    if (outFile) {
        writeOut(res.data)
    }

}

function writeOut(data) {
    if (outFile) {
        fs.writeFile(outFile, data, 'utf8', (err) => {
            if (err) {
                console.log("ERROR: ", err, " with PATH: ", outFile)
                process.exit(1)
            }


        })

    } else {
        console.log("No file path given. TEXT: ", text)
    }
}


let outFile;
let path;


if (process.argv[2] === "--out") {
    outFile = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

try {
    const url = new URL(path)
    webCat(url)
} catch {
    cat(path)
}
