const express=require('express')
const router=express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const employeeModel=require('../model/employeeData')

// const data= [
//     { id:1,"eName":"Nanda", "eDesignation":"Software Engineer", "eSalary":50000, "eLocation":"TVM"},
//     { id:2,"eName":"Riya", "eDesignation":"QA Lead", "eSalary":42000, "eLocation":"Kollam"},
//     {id:3,"eName":"John", "eDesignation":"UI developer", "eSalary":30000, "eLocation":"TVM"},
//     { id:4,"eName":"Cera", "eDesignation":"Technical Lead", "eSalary":44000, "eLocation":"EKM"},
//     { id:5,"eName":"Manu", "eDesignation":"QA engineer", "eSalary":28000, "eLocation":"Calicut"},
//     {id:6,"eName":"Deepak", "eDesignation":"Software Engineer", "eSalary":37000, "eLocation":"Kollam"},
//     { id:4,"eName":"Jinu", "eDesignation":"Project Manager", "eSalary":64000, "eLocation":"EKM"},
//     { id:5,"eName":"Anna", "eDesignation":"UI developer", "eSalary":28000, "eLocation":"TVM"},
//     {id:6,"eName":"Sunu", "eDesignation":"Developer Intern", "eSalary":18000, "eLocation":"Kollam"}
// ]

function basicRoutes(nav) {
  // Home - list employees
  router.get("/", async (req, res) => {
    try {
      const data = await employeeModel.find();
      res.render("Home", { data, nav });
    } catch (err) {
      res.send("Error fetching employees");
    }
  });

  // Show Add Employee form
  router.get("/form", (req, res) => {
    res.render("EmployeeForm", { nav });
  });

  // Add Employee
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

  // Show Update Form
  router.get("/update-form/:id", async (req, res) => {
    try {
      const employee = await employeeModel.findById(req.params.id);
      res.render("UpdateForm", { nav, employee });
    } catch (err) {
      res.send("Error loading update form");
    }
  });

  // Update Employee
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

  // Delete Employee
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
