const express = require("express");
const { getRedis } = require("../lib/redis");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);

app.get("/comments", async (req, res) => {
    const redis = await getRedis(); 
    const list = await redis.lRange("comments", 0, -1);
    const comments = list.map(JSON.parse);
    res.json(comments);
});

app.post("/comments", async (req, res) => {
    const { value } = req.body;

    if (!value) {
        return res.status(400).json({ error: "Value required" });
    }

    const comment = { id: Date.now(), value };
    const redis = await getRedis(); 
    await redis.rPush("comments", JSON.stringify(comment));

    res.status(201).json(comment);
});

module.exports = { app };