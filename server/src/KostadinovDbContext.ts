/*

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 import { Database } from 'sqlite3';

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


*/


import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export interface Vacation {
    id?: number;
    title: string;
    bodyText: string;
    pictureURL: string;
    maxUsers: number;
    userCount?: number;
}

export interface User {
    id?: number;
    userName: string;
    telephone: string;
}

export interface Reservation {
    id?: number;
    userId: number;
    vacationId: number;
    active: boolean;
    requestCancellation: boolean;
}

class KostadinovDbContext {
    private dbPath: string;
    private db: Database<sqlite3.Database, sqlite3.Statement>;
    private ready = false;
    private firstTimeRunning = false;

    constructor(dbPath: string) {
        //Stop the stupid ass DB NOT INICILIZED ERROR from TS.
        this.db = {} as Database<sqlite3.Database, sqlite3.Statement>;
        this.dbPath = dbPath;
        this.ready = false;
    }

    public isReady(): boolean {
        return this.ready;
    }

    public async inicialize(): Promise<boolean> {
        this.db = await open({
            filename: this.dbPath,
            driver: sqlite3.cached.Database
        });
        await this.initializePrivate();
        if (this.firstTimeRunning) {
            await this.db.run(
`INSERT INTO Reservations(userId, vacationId, active, requestCancellation)
VALUES
(1, 2, 1, 0),
(2, 2, 1, 0),
(3, 2, 1, 0),
(4, 2, 1, 0),
(5, 2, 1, 0),
(1, 2, 1, 0),
(2, 2, 1, 1),
(3, 2, 1, 0);`);
            await this.db.run(
`INSERT INTO Users (userName, telephone)
VALUES
('John Doe', '123-456-7890'),
('Jane Smith', '987-654-3210'),
('Alice Johnson', '555-555-5555'),
('Bob Brown', '222-222-2222'),
('Charlie Davis', '333-333-3333'),
('David Wilson', '444-444-4444');`);
            await this.db.run(
`INSERT INTO Vacations (title, bodyText, pictureURL, maxUsers, userCount)
VALUES
('Vacation 1', 'An amazing moment for a vacations.', 'http://localhost:5000/images/vacations/vacation1.jpg', 10, 0),
('Vacation 2', 'Another amazing vacation experience.', 'http://localhost:5000/images/vacations/vacation1.jpg', 10, 8),
('Vacation 3', 'A truly special vacation.', 'http://localhost:5000/images/vacations/vacation1.jpg', 1, 0);`);
    
        }

        this.ready = true;
        return this.ready;
    }

    // Initialize the database connection
    private async initializePrivate() {

        // Ensure the Vacations table exists
        await this.db.run(`
            CREATE TABLE IF NOT EXISTS Vacations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(128) NOT NULL,
                bodyText VARCHAR(512) NOT NULL,
                pictureURL VARCHAR(256) NOT NULL,
                maxUsers INTEGER NOT NULL,
                userCount INTEGER NOT NULL DEFAULT 0
            );
        `);

        // Ensure the Users table exists
        await this.db.run(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userName VARCHAR(64) NOT NULL,
                telephone VARCHAR(64) NOT NULL
            );
        `);

        // Ensure the Reservations table exists
        await this.db.run(`
            CREATE TABLE IF NOT EXISTS Reservations (
                id INTEGER PRIMARY KEY NOT NULL,
                userId INTEGER NOT NULL,
                vacationId INTEGER NOT NULL,
                active BOOLEAN NOT NULL,
                requestCancellation BOOLEAN NOT NULL,
                FOREIGN KEY (vacationId) REFERENCES Vacations(id),
                FOREIGN KEY (userId) REFERENCES Users(id)
            );
        `);
    }

    // ---- Vacations Methods ----

    async createVacation(vacation: Vacation): Promise<number | undefined> {
        const result = await this.db.run(
            `INSERT INTO Vacations (title, bodyText, pictureURL, maxUsers, userCount) 
             VALUES (?, ?, ?, ?, ?)`,
            [vacation.title, vacation.bodyText, vacation.pictureURL, vacation.maxUsers, vacation.userCount || 0]
        );
        return result.lastID;
    }

    async getVacationById(id: number): Promise<Vacation | null> {
        const vacation = await this.db.get(
            `SELECT * FROM Vacations WHERE id = ?`,
            [id]
        );
        return vacation;
    }

    async getAllVacations(): Promise<Vacation[]> {
        const asd = await this.db.all(`SELECT * FROM Vacations`);
        return asd;
    }

    async updateVacation(id: number, vacation: Vacation): Promise<void> {
        await this.db.run(
            `UPDATE Vacations 
             SET title = ?, bodyText = ?, pictureURL = ?, maxUsers = ?, userCount = ?
             WHERE id = ?`,
            [vacation.title, vacation.bodyText, vacation.pictureURL, vacation.maxUsers, vacation.userCount || 0, id]
        );
    }

    async deleteVacation(id: number): Promise<void> {
        await this.db.run(`DELETE FROM Vacations WHERE id = ?`, [id]);
    }

    // ---- User Methods ----

    async createUser(user: User): Promise<number | undefined> {
        const result = await this.db.run(
            `INSERT INTO Users (userName, telephone) 
             VALUES (?, ?)`,
            [user.userName, user.telephone]
        );
        return result.lastID;
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.db.get(
            `SELECT * FROM Users WHERE id = ?`,
            [id]
        );
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.db.all(`SELECT * FROM Users`);
    }

    async updateUser(id: number, user: User): Promise<void> {
        await this.db.run(
            `UPDATE Users 
             SET userName = ?, telephone = ? 
             WHERE id = ?`,
            [user.userName, user.telephone, id]
        );
    }

    async deleteUser(id: number): Promise<void> {
        await this.db.run(`DELETE FROM Users WHERE id = ?`, [id]);
    }

    // ---- Reservation Methods ----

    async createReservation(reservation: Reservation): Promise<number | undefined> {
        const result = await this.db.run(
            `INSERT INTO Reservations (id, userId, vacationId, active, requestCancellation)
             VALUES (?, ?, ?, ?, ?)`,
            [reservation.id, reservation.userId, reservation.vacationId, reservation.active, reservation.requestCancellation]
        );
        return result.lastID;
    }

    async getReservationById(id: number): Promise<Reservation | undefined> {
        const reservation = await this.db.get(
            `SELECT * FROM Reservations WHERE id = ?`,
            [id]
        );
        return reservation;
    }

    async getAllReservations(): Promise<Reservation[]> {
        return await this.db.all(`SELECT * FROM Reservations`);
    }

    async updateReservation(id: number, reservation: Reservation): Promise<void> {
        await this.db.run(
            `UPDATE Reservations 
             SET userId = ?, vacationId = ?, active = ?, requestCancellation = ?
             WHERE id = ?`,
            [reservation.userId, reservation.vacationId, reservation.active, reservation.requestCancellation, id]
        );
    }

    async deleteReservation(id: number): Promise<void> {
        await this.db.run(`DELETE FROM Reservations WHERE id = ?`, [id]);
    }

    // Example query: get vacations with maxUsers less than a value
    // const query = "SELECT * FROM Vacations WHERE maxUsers < ?";
    // const params = [10];

    // const vacations = await dbContext.executeParameterizedQuery(query, params);
    // console.log(vacations);

    // await dbContext.close();

    async executeParameterizedQueryAll(query: string, params: any[]): Promise<any[]> {
        try {
            const result = await this.db.all(query, params);
            return result;
        } catch (error) {
            console.error("Error executing query: ", error);
            throw error;
        }
    }

    async executeParameterizedQueryGet(query: string, params: any[]): Promise<any[]> {
        try {
            const result = await this.db.get(query, params);
            return result;
        } catch (error) {
            console.error("Error executing query: ", error);
            throw error;
        }
    }

    async executeParameterizedQueryRun(query: string, params: any[]) {
        try {
            await this.db.run(query, params);
        } catch (error) {
            console.error("Error executing query: ", error);
            throw error;
        }
    }

    // Close the database connection
    async close(): Promise<void> {
        await this.db.close();
    }
}

//// Example usage
// (async () => {
//     const dbContext = new KostadinovDbContext('./vacations.db');

//     await dbContext.inicialize();
//     // Add a new vacation
//     const newVacationId = await dbContext.createVacation({
//         title: "Summer Beach Trip",
//         bodyText: "Enjoy a week at the sunny beaches of Malibu!",
//         pictureURL: "http://example.com/malibu.jpg",
//         maxUsers: 5
//     });
//     console.log(`New vacation ID: ${newVacationId}`);

//     // Get all vacations
//     const vacations = await dbContext.getAllVacations();
//     console.log(vacations);

//     // Close the DB connection
//     await dbContext.close();
// })();

export default KostadinovDbContext;