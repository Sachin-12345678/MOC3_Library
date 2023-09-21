const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    },
});

module.exports=mongoose.model("Book", bookSchema);