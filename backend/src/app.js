const express=require("express")
const NoteModel = require("./models/notemodel")
const path =require("path")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post("/notes",async(req,res)=>{
    const{title,description}=req.body
    const notes = await NoteModel.create({
        title,description
    })
    res.status(200).json({
        message:"notes created successfully",
        notes
    })
})

app.get("/notes",async(req,res)=>{
    const notes=await NoteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const id=req.params.id

    await NoteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully"
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const id=req.params.id
    const {description}=req.body

   const notes= await NoteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"notes updated succesfully",
        notes
    })

})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports=app