const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    books:[{
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: true
    }],
    totalAmount:{
        type: Number,
        required: true
    },
});

module.exports=mongoose.model("Order", orderSchema);