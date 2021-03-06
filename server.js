const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
//Connect Database
connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Backend Api Running"));

//-------------------Vehicle---------------------
app.use("/api/Vehicle", require("./routes/Vehicle.route"));

//-------------------Catagory---------------------
app.use("/api/Catagory", require("./routes/Catagory.route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));