const express = require('express')
const mongoose = require('mongoose');
const birdRouter = require('./routers/bird')
const userRouter = require('./routers/user')


mongoose.connect('mongodb://localhost:27017/bird-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(birdRouter)

app.listen(port, ()=> {
    console.log('Server is running on port ' + port)
})