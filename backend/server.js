const express=require('express');
const { chats } = require('./data/data.js');
const dotenv=require('dotenv')
const connectDb=require('./config/db.js')
const colors=require('colors');


connectDb()

const app=express()
dotenv.config()

const port=process.env.PORT||5000

app.get('/',(req,res)=>{
    res.send('Api is Running')

});



app.get('/api/chat',(req,res)=>{
    res.send(chats)
})

app.get('/api/chats/:id',(req,res)=>{
    // console.log(req.params.id)
    const singleChat=chats.find((c)=>c._id===req.params.id)
    res.send(singleChat)
})


app.use('/api/user',userRoutes)


app.listen(5000,console.log('server on port 5000'.yellow.bold))