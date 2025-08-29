const express=require('express')
const app=new express();
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
app.listen(3000,()=>{
    console.log("running at port 3000")
})
