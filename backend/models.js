const mongoose =require('mongoose');

const Todo = new mongoose.Schema({
    work:{
        type:String,
        required:true
    },
    
})

mongoose.model('List',Todo)