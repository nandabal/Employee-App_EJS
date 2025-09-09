const express=require('express')
const app=new express();
require('dotenv').config() 
require('./db/connection')
const nav=[
    {"name":"Home",link:'/api/'},
    {"name":"Add employee",link:'/api/form'}
]
app.use(express.static('public'));
const basicRoutes= require('./routes/basicRoutes')(nav)

const ejs=require('ejs');
app.set('view engine', 'ejs')  
app.set('views',__dirname+'/views')
app.use('/api',basicRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})