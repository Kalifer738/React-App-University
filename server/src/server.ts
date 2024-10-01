import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = process.env.PORT || 5000;

app.get("/api", (_: Request, res: Response) => {
    res.json({ vacations: ["test1", "test2", "test3"] });
});

app.get("/api/vacations", (_: Request, res: Response) => {
    res.json({ vacations: ["vac1", "vac2", "vac3"] });
});

app.get("/", (_: Request, res: Response) => {
    res.send("Express + TypeScript Backend Server");
});

app.listen(port, () => { console.log(`Backend started at port ${port}`) });