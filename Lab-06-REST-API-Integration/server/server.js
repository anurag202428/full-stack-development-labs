require("dotenv").config();const express=require("express");const cors=require("cors");const app=express();
const PORT=process.env.PORT||5000;const API_KEY=process.env.API_KEY||"local-demo-key";
app.use(cors());app.use(express.json());
app.use((req,res,next)=>{console.log(new Date().toISOString(),req.method,req.url);next()});
let tasks=[{id:1,title:"Verify REST API",completed:false}];let id=2;
function authCheck(req,res,next){if(req.get("x-api-key")!==API_KEY)return res.status(401).json({error:"Missing or invalid x-api-key"});next()}
app.get("/api/health",(req,res)=>res.json({status:"ok"}));
app.get("/api/tasks",(req,res)=>res.json(tasks));
app.get("/api/tasks/:id",(req,res)=>{const task=tasks.find(t=>t.id===Number(req.params.id));if(!task)return res.status(404).json({error:"Task not found"});res.json(task)});
app.post("/api/tasks",authCheck,(req,res)=>{const title=String(req.body.title||"").trim();if(!title)return res.status(400).json({error:"title is required"});const task={id:id++,title,completed:false};tasks.push(task);res.status(201).json(task)});
app.patch("/api/tasks/:id",authCheck,(req,res)=>{const task=tasks.find(t=>t.id===Number(req.params.id));if(!task)return res.status(404).json({error:"Task not found"});if(typeof req.body.title==="string")task.title=req.body.title.trim();if(typeof req.body.completed==="boolean")task.completed=req.body.completed;res.json(task)});
app.delete("/api/tasks/:id",authCheck,(req,res)=>{const index=tasks.findIndex(t=>t.id===Number(req.params.id));if(index<0)return res.status(404).json({error:"Task not found"});tasks.splice(index,1);res.status(204).end()});
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:"Internal server error"})});
app.listen(PORT,()=>console.log(`Task API: http://localhost:${PORT}/api/tasks`));
