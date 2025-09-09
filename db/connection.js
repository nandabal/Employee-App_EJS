const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongodb_url) .then((res)=>{
    console.log(`connection established on port ${process.env.PORT}!!`)
})
.catch(()=>{
    console.log('Connection failed')
})
