// steps to define express server

// 1. load .env file content into process.env
require('dotenv').config()
// 2. import express
const express= require('express')
// 3. import cors
const cors = require('cors')

// 10. import router
const router = require('./routes/router')

// 11. import database file
require('./database/dbConnection')

// 4.create server
const pfServer = express()
// 5. use cors
pfServer.use(cors())

// 6. use data and parse it
pfServer.use(express.json())

// 11. use router
pfServer.use(router)

// 12.make uploads file static
pfServer.use('/uploads',express.static('./uploads')) 



// 7. set port and we need to keep it secure during deployment time
const PORT = 3000 || process.env.PORT

// 8. to run the server
pfServer.listen(PORT,()=>{
    console.log(`My pfServer is running in port: ${PORT} and waiting for client request!!!`);
    
})

// 9.to get data in browser

// i)get
pfServer.get('/',(req,res)=>{
    res.status(200).send('<h1>My pfServer is running in port and waiting for client req!!! </h1>')
})

// post

pfServer.post('/',(req,res)=>{
    
})