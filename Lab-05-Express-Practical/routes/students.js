const express=require("express");const router=express.Router();
const students=[{id:1,name:"Anurag Parmar",course:"CSE"},{id:2,name:"Sample Student",course:"CSE"}];
router.get("/",(req,res)=>res.json(students));
router.get("/:id",(req,res)=>{const student=students.find(s=>s.id===Number(req.params.id));if(!student)return res.status(404).json({error:"Student not found"});res.json(student)});
module.exports=router;
