const mongoose=require('mongoose')
const employeeSchema=mongoose.Schema({ 
    eName:String,
    eDesignation:String,
    eSalary:Number,
    eLocation:String
})
const employeeModel=mongoose.model('employee',employeeSchema) 
module.exports=employeeModel
