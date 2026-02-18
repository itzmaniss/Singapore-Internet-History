import express from "express";
import {readFile} from "fs/promises";
import { validateGlobalInternetUsage, validateSingaporeInternetUsage } from "../utils/index.js";

const apiRouter = express.Router();

apiRouter.get("/internet-usage/singapore", async (req, res) => {
    let data;
    try {
        const fileData = await readFile("./data/internet_usage_in_sg.json", "utf-8");
        data = JSON.parse(fileData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Failed to read data"});
    }
    const validData = validateSingaporeInternetUsage(data);
    if (validData) {
        res.json(data)
    } else{
        console.error(validateSingaporeInternetUsage.errors);
        res.status(500).json({error: "Invalid Data"})
    }
})

apiRouter.get("/internet-usage/global", async (req, res) => {
    res.send("Hello World")
})

export default apiRouter;