const express=require('express')
const router=express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const employeeModel=require('../model/employeeData')

function basicRoutes(nav) {
  
  router.get("/", async (req, res) => {
    try {
      const data = await employeeModel.find();
      res.render("Home", { data, nav });
    } catch (err) {
      res.send("Error fetching employees");
    }
  });

 
  router.get("/form", (req, res) => {
    res.render("EmployeeForm", { nav });
  });

 
  router.post("/add", async (req, res) => {
    try {
      const newEmployee = new employeeModel({
        eName: req.body.eName,
        eDesignation: req.body.eDesignation,
        eSalary: req.body.eSalary,
        eLocation: req.body.eLocation,
      });
      await newEmployee.save();
      res.redirect("/api/");
    } catch (err) {
      res.send("Error adding employee");
    }
  });

  
  router.get("/update-form/:id", async (req, res) => {
    try {
      const employee = await employeeModel.findById(req.params.id);
      res.render("UpdateForm", { nav, employee });
    } catch (err) {
      res.send("Error loading update form");
    }
  });

  
  router.post("/update/:id", async (req, res) => {
    try {
      await employeeModel.findByIdAndUpdate(req.params.id, {
        eName: req.body.eName,
        eDesignation: req.body.eDesignation,
        eSalary: req.body.eSalary,
        eLocation: req.body.eLocation,
      });
      res.redirect("/api/");
    } catch (err) {
      res.send("Error updating employee");
    }
  });

  
  router.get("/delete/:id", async (req, res) => {
    try {
      await employeeModel.findByIdAndDelete(req.params.id);
      res.redirect("/api/");
    } catch (err) {
      res.send("Error deleting employee");
    }
  });

  return router;
}
module.exports=basicRoutes
