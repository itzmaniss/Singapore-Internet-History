import express from "express";
import router from "./routes/index.js"

const env = process.env.NODE_ENV || 'development';
const app = express();

app.set("view engine", "pug");
app.set("views", "./views")

app.use(express.static("public"))
app.use("/", router)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
