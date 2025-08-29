const express=require('express')
const router=express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true})) 

const data= [
    { id:1,"eName":"Nanda", "eDesignation":"Software Engineer", "eSalary":50000, "eLocation":"TVM"},
    { id:2,"eName":"Riya", "eDesignation":"QA Lead", "eSalary":42000, "eLocation":"Kollam"},
    {id:3,"eName":"John", "eDesignation":"UI developer", "eSalary":30000, "eLocation":"TVM"},
    { id:4,"eName":"Cera", "eDesignation":"Technical Lead", "eSalary":44000, "eLocation":"EKM"},
    { id:5,"eName":"Manu", "eDesignation":"QA engineer", "eSalary":28000, "eLocation":"Calicut"},
    {id:6,"eName":"Deepak", "eDesignation":"Software Engineer", "eSalary":37000, "eLocation":"Kollam"},
    { id:4,"eName":"Jinu", "eDesignation":"Project Manager", "eSalary":64000, "eLocation":"EKM"},
    { id:5,"eName":"Anna", "eDesignation":"UI developer", "eSalary":28000, "eLocation":"TVM"},
    {id:6,"eName":"Sunu", "eDesignation":"Developer Intern", "eSalary":18000, "eLocation":"Kollam"}
]

function basicRoutes(nav) {
  router.get("/", (req, res) => {
    res.render("Home", { data,nav });
  });
  router.get("/form", (req, res) => {
    res.render("EmployeeForm", { nav });
  });
  router.post("/add",(req,res)=>{
    // data.push(req.body);
    // res.redirect('/api/');
    // console.log(data)
     const newEmployee = {
       id: data.length ? data[data.length - 1].id + 1 : 1, 
       eName: req.body.eName,
       eDesignation: req.body.eDesignation,
       eSalary: req.body.eSalary,
       eLocation: req.body.eLocation,
     };

     data.push(newEmployee);
     console.log("Employee Added:", newEmployee);
     res.redirect("/api/");
  })
  router.get('/update-form/:id',(req,res)=>{
    res.render('UpdateForm',{nav, id:req.params.id,data});
  })
  router.post("/update/:id", (req, res) => {
  const employee = data.find(e => e.id == req.params.id);

  if (employee) {
    employee.eName = req.body.eName;
    employee.eDesignation = req.body.eDesignation;
    employee.eSalary = req.body.eSalary;
    employee.eLocation = req.body.eLocation;
  }

  console.log("Employee Updated:", employee);
  res.redirect("/api/");
});
  router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    data.splice(id, 1);
    res.redirect("/api/");
  });
  return router;
}
module.exports=basicRoutes
