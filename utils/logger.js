const info = (...params) => {
    if(process.envNODE_ENV !== 'test'){
        console.log(...params)
    }
}

const error = (...params) => {
    console.error(...params)
}

module.exports = { info, error}