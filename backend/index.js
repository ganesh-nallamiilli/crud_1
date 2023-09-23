const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const { json } = require('body-parser');
app.use(express.json())
app.use(cors())
mongoose.set('strictQuery',false)
mongoose.connect("mongodb+srv://Ganesh:crud@cluster0.f42nbst.mongodb.net/?retryWrites=true&w=majority");

require("./models")
mongoose.connect('mongodb+srv://Ganesh:crud@cluster0.f42nbst.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

mongoose.connection.on("connected",()=>{
    console.log("Database Connected");
})

mongoose.connection.on("error",()=>{
    console.log("An error occured");
})

const todo =mongoose.model("List");

 
app.get('/getdata',(req,res)=>{

    todo.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
    })

})

app.post('/postdata',async(req,res)=>{

        const work =req.body.work;

          try{
            const data =new todo({work})
            let result = await data.save();
            res.send(result);
          }catch(err){
            console.log("error");
          }

})


app.put('/updatedata', async(req,res)=>{

    const {work,id} =req.body;

      
        todo.findByIdAndUpdate(id,{work:work},{useFindAndModify:false})
        .then((data)=>{
            res.send(data)
        })
      .catch(err=>{
        console.log("error");
      })
      console.log(work,id)
})

app.delete('/deletedata',(req,res)=>{
    const id = req.body.id;
    todo.deleteOne({_id:id.replace(/['"]+/g, '')},(err,result)=>{
        if(!err){
            res.send("Deleted")
        }
        else{
            res.send(err)
        }
    })
    console.log(id)
})

app.listen(5000,()=>{
    console.log("Connected to 5000")
})