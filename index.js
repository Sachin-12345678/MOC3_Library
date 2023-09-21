const express=require("express");
const { connection } = require("./db");
const authRoutes=require("./routes/auth")
const booksRoutes = require('./routes/books');
const ordersRoutes = require('./routes/orders');

const app=express();
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use('/api/books', booksRoutes);
app.use('/api/orders', ordersRoutes);

app.get("/",(req,res)=>{
    res.send("Home page.....")
})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log("server error");
    }
    console.log(`Server is running on port ${process.env.port}`);
})