const {format} = require('date-fns')
const fs = require('fs')
const path = require('path')
const fsPromise = fs.promises

const log = async (message, filename) => {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const log_message = `${date} - ${message}\n`
    try{
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', filename), log_message)
    }catch(err){
        console.log(err)
    }
}

module.exports = {log}