import 'dotenv/config';
import express from "express";
import db from "./config/database.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/",(req, res) => {
    res.send("index.html");
});

app.post("/add", (req, res) => {
    let {text, group, label} = req.body;
    text = btoa(text);
    db.execute(
        `INSERT INTO svg(label, group_id, svg) VALUES (?, ?, ?)`,
        [label, group, text],
        (err, results) => {
            console.log(results, err)
        }
    )
    res.status(200).end();
})

app.get("/list", (req, res) => {
    db.query(
        'SELECT svg.id, svg.label, svg_group.name, svg.svg from svg, svg_group WHERE svg.group_id=svg_group.id;',
        (err, results) => {
            res.json(results); // results contains rows returned by server
        }
    );
})

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);