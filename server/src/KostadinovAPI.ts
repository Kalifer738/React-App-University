import express, { Request, Response } from 'express';
import KostadinovDbContext from './KostadinovDbContext';  // Import the context class
import bodyParser from 'body-parser';

class KostadinovAPI {
    private app: express.Application;
    private dbContext: KostadinovDbContext;

    constructor(express: express.Application, dbContext: KostadinovDbContext) {
        this.app = express;
        this.dbContext = dbContext;

        this.config();
        this.routes();
    }

    // Set up the server configuration (e.g., middlewares)
    private config() {
        this.app.use(bodyParser.json());  // For parsing application/json
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    // Set up the API routes
    private routes() {
        this.app.get('/api/vacations', this.getAllVacations);
        this.app.get('/api/vacations/:id', this.getVacationById);
        this.app.post('/api/vacations', this.createVacation);
        this.app.put('/api/vacations/:id', this.updateVacation);
        this.app.delete('/api/vacations/:id', this.deleteVacation);

        this.app.get('/api/users', this.getAllUsers);
        this.app.get('/api/users/:id', this.getUserById);
        this.app.post('/api/users', this.createUser);
        this.app.put('/api/users/:id', this.updateUser);
        this.app.delete('/api/users/:id', this.deleteUser);

        this.app.get('/api/reservations', this.getAllReservations);
        this.app.get('/api/reservations/:id', this.getReservationById);
        this.app.post('/api/reservations', this.createReservation);
        this.app.put('/api/reservations/:id', this.updateReservation);
        this.app.delete('/api/reservations/:id', this.deleteReservation);
    }

    // Vacation handlers
    private getAllVacations = async (req: Request, res: Response) => {
        try {
            const vacations = await this.dbContext.getAllVacations();
            res.json(vacations);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private getVacationById = async (req: Request, res: Response) => {
        try {
            const vacation = await this.dbContext.getVacationById(+req.params.id);
            if (!vacation) {
                res.status(404).send("Vacation not found");
                return;
            }
            res.json(vacation);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private createVacation = async (req: Request, res: Response) => {
        try {
            const newVacationId = await this.dbContext.createVacation(req.body);
            res.status(201).json({ id: newVacationId });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private updateVacation = async (req: Request, res: Response) => {
        try {
            await this.dbContext.updateVacation(+req.params.id, req.body);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private deleteVacation = async (req: Request, res: Response) => {
        try {
            await this.dbContext.deleteVacation(+req.params.id);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    // User handlers
    private getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.dbContext.getAllUsers();
            res.json(users);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private getUserById = async (req: Request, res: Response) => {
        try {
            const user = await this.dbContext.getUserById(+req.params.id);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            res.json(user);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private createUser = async (req: Request, res: Response) => {
        try {
            const newUserId = await this.dbContext.createUser(req.body);
            res.status(201).json({ id: newUserId });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private updateUser = async (req: Request, res: Response) => {
        try {
            await this.dbContext.updateUser(+req.params.id, req.body);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private deleteUser = async (req: Request, res: Response) => {
        try {
            await this.dbContext.deleteUser(+req.params.id);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    // Reservation handlers
    private getAllReservations = async (req: Request, res: Response) => {
        try {
            const reservations = await this.dbContext.getAllReservations();
            res.json(reservations);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private getReservationById = async (req: Request, res: Response) => {
        try {
            const reservation = await this.dbContext.getReservationById(+req.params.id);
            if (!reservation) {
                res.status(404).send("Reservation not found");
                return;
            }
            res.json(reservation);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private createReservation = async (req: Request, res: Response) => {
        try {
            const newReservationId = await this.dbContext.createReservation(req.body);
            res.status(201).json({ id: newReservationId });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private updateReservation = async (req: Request, res: Response) => {
        try {
            await this.dbContext.updateReservation(+req.params.id, req.body);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    private deleteReservation = async (req: Request, res: Response) => {
        try {
            await this.dbContext.deleteReservation(+req.params.id);
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send();
            }
        }
    };

    // // Start the server
    // public start(port: number) {
    //     this.app.listen(port, () => {
    //         console.log(`Server is running on port ${port}`);
    //     });
    // }
}

export default KostadinovAPI;