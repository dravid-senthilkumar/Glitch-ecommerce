const express = require('express');
const cors = require("cors");
const connectDB = require('./lib/db');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');
const ordersRouter = require('./routes/order.routes')
const connectCloudinary = require('./lib/cloudinary');


const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());

connectDB();
connectCloudinary();


app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/category", categoryRouter)
app.use("/api/orders", ordersRouter)

app.get("/", (req,res) => {
    res.status(200).json("Get request is successful")
});

app.listen(PORT,() => {
    console.log(`Server is successfully Connected on PORT: ${PORT}`)
});

