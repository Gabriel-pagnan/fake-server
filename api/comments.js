import { redis } from "../lib/redis";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const list = await redis.lrange("comments", 0, -1);
        const comments = list.map(JSON.parse);
        return res.status(200).json(comments);
    }

    if (req.method === "POST") {
        const { value } = req.body;

        if (!value || value.trim() === "") {
            return res.status(400).json({ error: "Value is required" });
        }

        const comment = {
            id: Date.now(),
            value
        };

        await redis.rpush("comments", JSON.stringify(comment));

        return res.status(201).json(comment);
    }

    return res.status(405).json({ error: "Method not allowed" });
}