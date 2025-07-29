const express = require("express") 
const app = express()
const dotenv = require("dotenv").config() 
const methodOverride = require("method-override")
const conntectToDB = require('./config/db')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

conntectToDB()



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Listening on port " + port)
})
