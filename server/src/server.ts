import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';


const port = process.env.PORT || 5000;

const app: Express = express();

app.get("/api", (_: Request, res: Response) => {
    res.json({ vacations: ["test1", "test2", "test3"] });
});

app.get("/api/vacations", (_: Request, res: Response) => {
    
    fs.readFile(path.join(__dirname, `../../shared/json/vacations.json`), (err, data) => {
        if (err) {
            res.status(500).send(`Error reading file: ` + path.join(__dirname, `../../shared/json/vacations.json`));
            return;
        }
        res.json(JSON.parse(data.toString()));
    });

    

    //res.json({ vacations: ["vac1", "vac2", "vac3"] });
});

app.get("/", (_: Request, res: Response) => {
    res.send("Express + TypeScript Backend Server");
});

app.listen(port, () => { console.log(`Backend started at port ${port}`) });