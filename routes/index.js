import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
    res.render("index")
})

router.get("/foundation", (req, res) => {
    res.render("eras/foundation")
})

router.get("/wireless", (req, res) => {
    res.render("eras/wireless")
})

router.get("/smart-nation", (req, res) => {
    res.render("eras/smart-nation")
})

export default router;
