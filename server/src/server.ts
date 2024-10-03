import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import cors from 'cors';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
​import { Database } from 'sqlite3';

// Open a SQLite database, stored in the file db.sqlite
const db = new Database('./database/db.sqlite');

// Fetch a random integer between -99 and +99
// db.get(
//   'SELECT RANDOM() % 100 as result',
//   (_, res) => console.log(res)
// );

db.exec(fs.readFileSync(path.join(__dirname, '../database/queries/createdb.sql')).toString());

//https://www.skema.cloud/en/blog/sagot-dev-2/get-started-with-sqlite-database-in-a-typescript-project-7#:~:text=You%20can%20install%20SQLite%20with%20npm%20and%20then%20integrate%20it


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000;
const app: Express = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET']
}));

// app.get("/api", (_: Request, res: Response) => {
//     res.json({ vacations: ["test1", "test2", "test3"] });
// });

app.get("/api/vacations", (_: Request, res: Response) => {
    fs.readFile(path.join(__dirname, `../../shared/json/vacations.json`), (err, data) => {
        if (err) {
            res.status(500).send(`Error reading file: ` + path.join(__dirname, `../../shared/json/vacations.json`));
            return;
        }
        res.json(JSON.parse(data.toString()));
    });
});


app.get("/images/vacations/*", (_: Request, res: Response) => {
    fs.readFile(path.join(__dirname, `../../shared/images/vacation1.jpg`), (err, data) => {
        if (err) {
            res.status(500).send(`Error reading file: ` + path.join(__dirname, `../../shared/images/vacation1.jpg`) + `: ${err.message}`);
            return;
        }
        
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(data);
    });
});



app.get("/", (_: Request, res: Response) => {
    res.send("Express + TypeScript Backend Server");
}); 

app.listen(port, () => { console.log(`Backend started at port ${port}`) });