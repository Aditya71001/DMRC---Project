// const { Router } = require('express')
const express = require('express')
const port=8000
const {urlencoded} = require('express')



const app = express()

app.set('view engine','ejs')

app.set('views','./views')

app.use(express.static(__dirname + '/assets'))

app.use(urlencoded({extended:false}))

const router = require('./routes/index')

app.use('/',require("./routes/index"))

app.listen(port,function(error){
    if(error){
        console.error(`Following error in running the server: ${error}`)
        return
    }
    console.log(`Our server is up and running on port: ${port}`)
})