// import express cors dotenv
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')

// loads .env file contents to process.env
require('dotenv').config()

// create server
const bookStoreServer = express()

// able cors protocol in server
bookStoreServer.use(cors())

// parsing
bookStoreServer.use(express.json())

// routing
bookStoreServer.use(router)
bookStoreServer.use('/uploads',express.static('./uploads'))

// create PORT
const PORT = 5500


// resolving http request
bookStoreServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Book store Server here...</h1>')
})



// run server port
bookStoreServer.listen(PORT,()=>{
    console.log(`Book store server started at ${PORT}`) 
})