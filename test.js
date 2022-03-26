const express = require('express')
const { createServer } = require('http');
const app = express()



app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})


app.use('/user/:id', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
})

app.get('/user/:id', (req, res, next) => {
    res.send('USER')
})

const server = createServer(app);
server.listen(8080, function () {
    console.log(`Listening on http://localhost:8080`);
});
