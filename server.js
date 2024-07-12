const express=require("express");

const app=express();
const dbconfig = require('./db')
const roomsRoute=require('./routes/roomsRoute')
const usersRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')
const houseownerRoute=require('./routes/houseownerRoute')


app.use(express.json())


app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)
app.use('/api/bookings',bookingsRoute)
app.use('/api/houseowners',houseownerRoute)

const port=process.env.PORT||5000;

app.listen(port,()=>console.log('Node server statrted using nodemon'));
