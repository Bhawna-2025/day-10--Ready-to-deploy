const app=require("./src/app")
const connectToDb=require("./src/config/database")

app.listen(4000,()=>{
    console.log("server is running on the port 4000")
})
connectToDb();